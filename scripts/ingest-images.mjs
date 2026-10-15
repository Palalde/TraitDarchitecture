import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..");
const CONTENT_ROOT = path.join(REPO_ROOT, "src", "content");
const SHEET_ROOT = path.join(REPO_ROOT, "docs", "content", "_planches");
const MAX_IMAGE_EDGE = 2560;
const THUMBNAIL_SIZE = 320;
const TILE_WIDTH = 340;
const TILE_HEIGHT = 360;
const SHEET_COLUMNS = 4;
const SUPPORTED_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);
const UNSUPPORTED_EXTENSIONS = new Set([".heic", ".heif", ".pdf"]);
const collator = new Intl.Collator("fr", {
  numeric: true,
  sensitivity: "base",
});

function usage() {
  return [
    "Usage:",
    '  npm run ingest -- --sheet "<source directory>"',
    "  npm run ingest -- --manifest <manifest.json> [--dry-run] [--force]",
    "",
    "The manifest sourceDir is resolved from the repository root.",
  ].join("\n");
}

function parseArguments(args) {
  if (args[0] === "--sheet") {
    if (args.length !== 2 || !args[1]) {
      throw new Error(`--sheet requires one source directory.\n${usage()}`);
    }
    return { mode: "sheet", sourceDirectory: args[1] };
  }

  if (args[0] === "--manifest") {
    if (args.length < 2 || !args[1]) {
      throw new Error(`--manifest requires a JSON file.\n${usage()}`);
    }

    const flags = args.slice(2);
    if (flags.some((flag) => !["--dry-run", "--force"].includes(flag))) {
      throw new Error(`Unknown manifest option.\n${usage()}`);
    }
    if (new Set(flags).size !== flags.length) {
      throw new Error("Manifest options cannot be repeated.");
    }

    return {
      mode: "manifest",
      manifestPath: args[1],
      dryRun: flags.includes("--dry-run"),
      force: flags.includes("--force"),
    };
  }

  throw new Error(usage());
}

function pathIsInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return (
    relative !== "" &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

function assertInside(parent, candidate, label) {
  if (!pathIsInside(parent, candidate)) {
    throw new Error(`${label} must stay inside ${parent}.`);
  }
}

async function assertNoSymlinkParents(root, destination) {
  assertInside(root, destination, "Output path");
  const relativeParent = path.relative(root, path.dirname(destination));
  const segments = relativeParent ? relativeParent.split(path.sep) : [];
  let current = root;

  for (const segment of segments) {
    current = path.join(current, segment);
    try {
      const stat = await fs.lstat(current);
      if (stat.isSymbolicLink()) {
        throw new Error(
          `Refusing to write through a symbolic link: ${current}`,
        );
      }
      if (!stat.isDirectory()) {
        throw new Error(`Output parent is not a directory: ${current}`);
      }
    } catch (error) {
      if (error.code === "ENOENT") break;
      throw error;
    }
  }
}

async function checkOutputCollision(filePath, force) {
  try {
    const stat = await fs.lstat(filePath);
    if (stat.isSymbolicLink() || !stat.isFile()) {
      throw new Error(`Refusing to replace a non-regular output: ${filePath}`);
    }
    if (!force) {
      throw new Error(
        `Output already exists (use --force to replace it): ${filePath}`,
      );
    }
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function findExistingCover(outputDirectory) {
  let entries;
  try {
    entries = await fs.readdir(outputDirectory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }

  const candidates = entries.filter((entry) => /^cover\.[^.]+$/i.test(entry.name));
  if (candidates.length > 1) {
    throw new Error(
      `Multiple existing cover files found in ${outputDirectory}; specify cover in the manifest.`,
    );
  }
  if (candidates.length === 0) return null;

  const coverEntry = candidates[0];
  const coverPath = path.join(outputDirectory, coverEntry.name);
  if (!SUPPORTED_EXTENSIONS.has(path.extname(coverEntry.name).toLowerCase())) {
    throw new Error(`Existing cover uses an unsupported image format: ${coverPath}`);
  }

  const stat = await fs.lstat(coverPath);
  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new Error(`Existing cover is not a regular file: ${coverPath}`);
  }
  return coverPath;
}

async function walkFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkFiles(fullPath);
      if (entry.isFile()) return [fullPath];
      return [];
    }),
  );
  return nested.flat();
}

function sortByRelativePath(files, root) {
  return files.sort((first, second) => {
    const firstRelative = path.relative(root, first);
    const secondRelative = path.relative(root, second);
    return (
      collator.compare(firstRelative, secondRelative) ||
      firstRelative.localeCompare(secondRelative)
    );
  });
}

function sourcePathKey(sourceRoot, filePath) {
  const relativePath = path
    .relative(sourceRoot, filePath)
    .split(path.sep)
    .join("/");
  return process.platform === "win32"
    ? relativePath.toLowerCase()
    : relativePath;
}

function resolveSourceFilePath(sourceRoot, file) {
  if (typeof file !== "string" || file.length === 0 || path.isAbsolute(file)) {
    throw new Error(
      "Image file paths must be non-empty and relative to sourceDir.",
    );
  }

  const filePath = path.resolve(sourceRoot, file);
  assertInside(sourceRoot, filePath, "Manifest source file");
  return filePath;
}

async function validateSourceCompleteness(sourceRoot, references) {
  const files = sortByRelativePath(await walkFiles(sourceRoot), sourceRoot);
  const sourceImages = [];
  const sourcePdfs = [];
  const unsupportedFiles = [];

  for (const filePath of files) {
    const extension = path.extname(filePath).toLowerCase();
    if (SUPPORTED_EXTENSIONS.has(extension)) {
      sourceImages.push(filePath);
    } else if (extension === ".pdf") {
      sourcePdfs.push(filePath);
    } else {
      unsupportedFiles.push(filePath);
    }
  }

  const problems = [];
  if (unsupportedFiles.length > 0) {
    problems.push(
      `Unsupported source files (convert HEIC/HEIF to JPG and remove other non-images):\n${unsupportedFiles
        .map((filePath) => `  - ${path.relative(sourceRoot, filePath)}`)
        .join("\n")}`,
    );
  }

  const pdfPageProblems = [];
  for (const pdfPath of sourcePdfs) {
    const pdfDirectory = path.join(sourceRoot, "_pdf");
    const pdfDirectoryKey = sourcePathKey(sourceRoot, pdfDirectory);
    const filePrefix = `${path.basename(pdfPath, path.extname(pdfPath))}-`;
    const normalizedPrefix =
      process.platform === "win32" ? filePrefix.toLowerCase() : filePrefix;
    const pageNumbers = [];

    for (const imagePath of sourceImages) {
      if (
        sourcePathKey(sourceRoot, path.dirname(imagePath)) !== pdfDirectoryKey
      ) {
        continue;
      }

      const fileName =
        process.platform === "win32"
          ? path.basename(imagePath).toLowerCase()
          : path.basename(imagePath);
      if (!fileName.startsWith(normalizedPrefix)) continue;

      const pageMatch = fileName
        .slice(normalizedPrefix.length)
        .match(/^(\d+)\.png$/i);
      if (!pageMatch) continue;

      const pageNumber = Number(pageMatch[1]);
      if (Number.isSafeInteger(pageNumber) && pageNumber > 0) {
        pageNumbers.push(pageNumber);
      }
    }

    if (pageNumbers.length === 0) {
      pdfPageProblems.push(
        `  - ${path.relative(sourceRoot, pdfPath)} (no converted pages in ${path.relative(sourceRoot, pdfDirectory)})`,
      );
      continue;
    }

    const uniquePageNumbers = new Set(pageNumbers);
    const maxPageNumber = Math.max(...pageNumbers);
    const missingPages = [];
    for (let page = 1; page <= maxPageNumber; page += 1) {
      if (!uniquePageNumbers.has(page)) missingPages.push(page);
    }
    if (missingPages.length > 0) {
      pdfPageProblems.push(
        `  - ${path.relative(sourceRoot, pdfPath)} (missing converted page(s): ${missingPages.join(", ")})`,
      );
    }
  }
  if (pdfPageProblems.length > 0) {
    problems.push(`PDFs without complete converted pages:\n${pdfPageProblems.join("\n")}`);
  }

  const imageByKey = new Map(
    sourceImages.map((filePath) => [
      sourcePathKey(sourceRoot, filePath),
      filePath,
    ]),
  );
  const referenceCounts = new Map();
  const unknownReferences = [];

  for (const reference of references) {
    const filePath = resolveSourceFilePath(sourceRoot, reference.file);
    const key = sourcePathKey(sourceRoot, filePath);
    if (!imageByKey.has(key)) {
      unknownReferences.push(`  - ${reference.label}: ${reference.file}`);
      continue;
    }
    referenceCounts.set(key, (referenceCounts.get(key) ?? 0) + 1);
  }

  if (unknownReferences.length > 0) {
    problems.push(`Unknown image references:\n${unknownReferences.join("\n")}`);
  }

  const duplicateReferences = [...referenceCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(
      ([key, count]) =>
        `  - ${path.relative(sourceRoot, imageByKey.get(key))} (${count} references)`,
    );
  if (duplicateReferences.length > 0) {
    problems.push(
      `Images referenced more than once:\n${duplicateReferences.join("\n")}`,
    );
  }

  const unreferencedImages = sourceImages
    .filter(
      (filePath) =>
        !referenceCounts.has(sourcePathKey(sourceRoot, filePath)),
    )
    .map((filePath) => `  - ${path.relative(sourceRoot, filePath)}`);
  if (unreferencedImages.length > 0) {
    problems.push(`Unreferenced images:\n${unreferencedImages.join("\n")}`);
  }

  if (problems.length > 0) {
    throw new Error(
      `Source completeness check failed:\n${problems.join("\n")}`,
    );
  }
}

function getDisplayDimensions(metadata) {
  const swapAxes = [5, 6, 7, 8].includes(metadata.orientation);
  return {
    width: swapAxes ? metadata.height : metadata.width,
    height: swapAxes ? metadata.width : metadata.height,
  };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function makeSheetLabel(number) {
  const label = String(number).padStart(3, "0");
  return Buffer.from(
    `<svg width="${TILE_WIDTH}" height="28" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fff"/><text x="10" y="20" font-family="sans-serif" font-size="15" fill="#222">${label}</text></svg>`,
  );
}

function makeSheetStem(directoryName) {
  return directoryName
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function createContactSheet(sourceDirectory) {
  const sourceRoot = path.resolve(process.cwd(), sourceDirectory);
  const sourceStat = await fs.stat(sourceRoot);
  if (!sourceStat.isDirectory()) {
    throw new Error(`Source directory does not exist: ${sourceRoot}`);
  }

  const files = sortByRelativePath(await walkFiles(sourceRoot), sourceRoot);
  const imageFiles = files.filter((filePath) =>
    SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
  );
  const skippedCount = files.length - imageFiles.length;
  if (imageFiles.length === 0) {
    throw new Error(`No supported raster images found in ${sourceRoot}`);
  }

  const images = [];
  for (const filePath of imageFiles) {
    const metadata = await sharp(filePath).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error(`Could not read image dimensions: ${filePath}`);
    }
    const stat = await fs.stat(filePath);
    images.push({
      filePath,
      relativePath: path
        .relative(sourceRoot, filePath)
        .split(path.sep)
        .join("/"),
      metadata,
      stat,
      ...getDisplayDimensions(metadata),
    });
  }

  const stem = makeSheetStem(path.basename(sourceRoot));
  if (!stem)
    throw new Error(
      "Could not derive an output name from the source directory.",
    );
  const outputDirectory = SHEET_ROOT;
  const sheetPath = path.join(outputDirectory, `${stem}.jpg`);
  const indexPath = path.join(outputDirectory, `${stem}.txt`);
  await assertNoSymlinkParents(
    path.join(REPO_ROOT, "docs", "content"),
    sheetPath,
  );
  await assertNoSymlinkParents(
    path.join(REPO_ROOT, "docs", "content"),
    indexPath,
  );
  await checkOutputCollision(sheetPath, true);
  await checkOutputCollision(indexPath, true);

  const columns = Math.min(SHEET_COLUMNS, images.length);
  const rows = Math.ceil(images.length / columns);
  const layers = [];
  const indexRows = ["No. | Relative path | Dimensions | File size"];

  for (const [index, image] of images.entries()) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const left = column * TILE_WIDTH + 10;
    const top = row * TILE_HEIGHT;
    const thumbnail = await sharp(image.filePath)
      .rotate()
      .resize({
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE,
        fit: "contain",
        background: "#fff",
        withoutEnlargement: true,
      })
      .flatten({ background: "#fff" })
      .jpeg({ quality: 78 })
      .toBuffer();

    layers.push({
      input: makeSheetLabel(index + 1),
      left: column * TILE_WIDTH,
      top,
    });
    layers.push({ input: thumbnail, left, top: top + 30 });
    indexRows.push(
      `${String(index + 1).padStart(3, "0")} | ${image.relativePath.replaceAll("|", "\\|")} | ${image.width}x${image.height} | ${formatBytes(image.stat.size)}`,
    );
  }

  if (skippedCount > 0) {
    indexRows.push(
      "",
      `Skipped ${skippedCount} non-raster or unsupported file(s).`,
    );
  }

  await fs.mkdir(outputDirectory, { recursive: true });
  await sharp({
    create: {
      width: columns * TILE_WIDTH,
      height: rows * TILE_HEIGHT,
      channels: 3,
      background: { r: 242, g: 242, b: 242 },
    },
  })
    .composite(layers)
    .jpeg({ quality: 86 })
    .toFile(sheetPath);
  await fs.writeFile(indexPath, `${indexRows.join("\n")}\n`, "utf8");

  process.stdout.write(
    `Contact sheet: ${path.relative(REPO_ROOT, sheetPath)}\n`,
  );
  process.stdout.write(`Index: ${path.relative(REPO_ROOT, indexPath)}\n`);
  process.stdout.write(
    `Images: ${images.length}; skipped files: ${skippedCount}\n`,
  );
}

function parseRatio(value) {
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    throw new Error("Cover ratio must be a string such as 4/5.");
  }

  const match = value.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (!match) throw new Error(`Invalid cover ratio: ${value}`);
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(`Invalid cover ratio: ${value}`);
  }
  return { width, height };
}

async function resolveSourceImage(sourceRoot, file) {
  const filePath = resolveSourceFilePath(sourceRoot, file);
  const extension = path.extname(filePath).toLowerCase();
  if (UNSUPPORTED_EXTENSIONS.has(extension)) {
    throw new Error(
      `${file} is not supported. Convert PDFs with pdftoppm and export HEIC/HEIF as JPG first.`,
    );
  }
  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    throw new Error(`Unsupported image format: ${file}`);
  }

  const stat = await fs.stat(filePath);
  if (!stat.isFile()) throw new Error(`Image source is not a file: ${file}`);
  let metadata;
  try {
    metadata = await sharp(filePath).metadata();
  } catch (error) {
    throw new Error(`Could not read image ${file}: ${error.message}`);
  }
  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read image dimensions: ${file}`);
  }

  return { file, filePath, stat, metadata };
}

function validateSlug(slug) {
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      "slug must contain lowercase ASCII letters, digits and single hyphens.",
    );
  }
}

function getResizeOptions(record) {
  if (!record.ratio) {
    return {
      width: MAX_IMAGE_EDGE,
      height: MAX_IMAGE_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    };
  }

  const aspectRatio = record.ratio.width / record.ratio.height;
  const width =
    aspectRatio >= 1
      ? MAX_IMAGE_EDGE
      : Math.max(1, Math.round(MAX_IMAGE_EDGE * aspectRatio));
  const height =
    aspectRatio >= 1
      ? Math.max(1, Math.round(MAX_IMAGE_EDGE / aspectRatio))
      : MAX_IMAGE_EDGE;

  return {
    width,
    height,
    fit: "cover",
    position:
      record.position === "attention" ? sharp.strategy.attention : "centre",
  };
}

async function convertImage(record, isCover) {
  const result = await sharp(record.filePath)
    .rotate()
    .resize(getResizeOptions(record))
    .toColourspace("srgb")
    .webp({ quality: isCover ? 85 : 82 })
    .toBuffer({ resolveWithObject: true });

  return {
    destination: record.destination,
    data: result.data,
    width: result.info.width,
    height: result.info.height,
  };
}

function yamlString(value) {
  return JSON.stringify(value);
}

function printManifestOutputs(collection, gallery, coverAlt) {
  if (collection === "projects") {
    process.stdout.write("\nYAML frontmatter block for index.md:\n");
    if (coverAlt !== undefined) {
      process.stdout.write(`coverAlt: ${yamlString(coverAlt)}\n`);
    }
    if (gallery.length === 0) {
      process.stdout.write("gallery: []\n");
      return;
    }
    process.stdout.write("gallery:\n");
    for (const item of gallery) {
      process.stdout.write(
        `  - src: ${yamlString(`./gallery/${item.outputName}`)}\n`,
      );
      process.stdout.write(`    caption: ${yamlString(item.caption)}\n`);
    }
    return;
  }

  if (coverAlt !== undefined) {
    process.stdout.write("\nYAML coverAlt for article frontmatter:\n");
    process.stdout.write(`coverAlt: ${yamlString(coverAlt)}\n`);
  }

  if (gallery.length > 0) {
    process.stdout.write("\nArticle figure files:\n");
    for (const item of gallery) {
      process.stdout.write(`  ./${item.outputName} — ${item.caption}\n`);
    }
  }
}

async function loadManifest(manifestPath) {
  const resolvedManifestPath = path.resolve(process.cwd(), manifestPath);
  let data;
  try {
    const raw = await fs.readFile(resolvedManifestPath, "utf8");
    data = JSON.parse(raw.replace(/^\uFEFF/, ""));
  } catch (error) {
    throw new Error(
      `Could not read manifest ${manifestPath}: ${error.message}`,
    );
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Manifest root must be a JSON object.");
  }

  if (!["projects", "articles"].includes(data.collection)) {
    throw new Error('collection must be either "projects" or "articles".');
  }
  validateSlug(data.slug);
  if (typeof data.sourceDir !== "string" || !data.sourceDir) {
    throw new Error(
      "sourceDir must be a non-empty path relative to the repository root.",
    );
  }

  const sourceRoot = path.resolve(REPO_ROOT, data.sourceDir);
  const sourceStat = await fs.stat(sourceRoot);
  if (!sourceStat.isDirectory()) {
    throw new Error(`sourceDir is not a directory: ${sourceRoot}`);
  }

  const coverData = data.cover;
  let ratio;
  let position;
  if (coverData !== undefined) {
    if (
      !coverData ||
      typeof coverData !== "object" ||
      Array.isArray(coverData)
    ) {
      throw new Error("cover must be an object with a file property.");
    }
    if (typeof coverData.file !== "string" || coverData.file.length === 0) {
      throw new Error("cover.file must be a non-empty relative image path.");
    }
    ratio = parseRatio(coverData.ratio);
    position = coverData.position ?? "center";
    if (!["center", "centre", "attention"].includes(position)) {
      throw new Error('cover.position must be "center" or "attention".');
    }
  }

  let coverAlt = data.coverAlt;
  if (coverAlt !== undefined) {
    if (typeof coverAlt !== "string" || coverAlt.trim().length === 0) {
      throw new Error("coverAlt must be a non-empty string when provided.");
    }
    coverAlt = coverAlt.trim();
  }

  const galleryData = data.gallery ?? [];
  if (!Array.isArray(galleryData)) {
    throw new Error("gallery must be an array.");
  }

  const galleryInputs = [];
  for (const [index, item] of galleryData.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error(`gallery[${index}] must be an object.`);
    }
    if (typeof item.file !== "string" || item.file.length === 0) {
      throw new Error(`gallery[${index}].file must be a non-empty path.`);
    }
    if (typeof item.caption !== "string" || item.caption.trim().length === 0) {
      throw new Error(`gallery[${index}] requires a non-empty caption.`);
    }
    galleryInputs.push({
      file: item.file,
      caption: item.caption.trim(),
    });
  }

  const excludedData =
    data.excluded === undefined ? [] : data.excluded;
  if (!Array.isArray(excludedData)) {
    throw new Error("excluded must be an array of { file, reason } objects.");
  }
  const excluded = [];
  for (const [index, item] of excludedData.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error(`excluded[${index}] must be an object.`);
    }
    if (typeof item.file !== "string" || item.file.length === 0) {
      throw new Error(`excluded[${index}].file must be a non-empty path.`);
    }
    if (typeof item.reason !== "string" || item.reason.trim().length === 0) {
      throw new Error(`excluded[${index}] requires a non-empty reason.`);
    }
    excluded.push({ file: item.file, reason: item.reason.trim() });
  }

  const outputDirectory = path.resolve(
    CONTENT_ROOT,
    data.collection,
    data.slug,
  );
  assertInside(CONTENT_ROOT, outputDirectory, "Content output directory");
  const coverDestination = path.join(outputDirectory, "cover.webp");
  const references = [
    ...(coverData ? [{ file: coverData.file, label: "cover.file" }] : []),
    ...galleryInputs.map((item, index) => ({
      file: item.file,
      label: `gallery[${index}].file`,
    })),
    ...excluded.map((item, index) => ({
      file: item.file,
      label: `excluded[${index}].file`,
    })),
  ];
  await validateSourceCompleteness(sourceRoot, references);

  const coverSource = coverData
    ? await resolveSourceImage(sourceRoot, coverData.file)
    : null;
  const gallerySources = [];
  for (const item of galleryInputs) {
    gallerySources.push({
      ...(await resolveSourceImage(sourceRoot, item.file)),
      caption: item.caption,
    });
  }

  const cover =
    coverSource === null
      ? null
      : {
          ...coverSource,
          ratio,
          position,
          destination: coverDestination,
        };
  const preservedCover =
    cover === null ? await findExistingCover(outputDirectory) : null;
  if (cover === null && preservedCover === null) {
    throw new Error(
      `No existing cover found for ${data.collection}/${data.slug}; provide cover in the manifest.`,
    );
  }

  const galleryDirectory = path.join(outputDirectory, "gallery");
  const galleryRecords = gallerySources.map((source, index) => {
    const number = String(index + 1).padStart(2, "0");
    const outputName =
      data.collection === "projects"
        ? `${number}.webp`
        : `figure-${number}.webp`;
    return {
      ...source,
      outputName,
      destination: path.join(
        data.collection === "projects" ? galleryDirectory : outputDirectory,
        outputName,
      ),
    };
  });
  const outputs = [
    ...(cover ? [cover.destination] : []),
    ...galleryRecords.map((item) => item.destination),
  ];

  for (const output of outputs) {
    await assertNoSymlinkParents(CONTENT_ROOT, output);
  }

  return {
    collection: data.collection,
    slug: data.slug,
    cover,
    preservedCover,
    coverAlt,
    gallery: galleryRecords,
    excluded,
    outputDirectory,
    outputs,
  };
}

function printManifestSummary(plan) {
  const coverLabel = plan.cover
    ? `${plan.cover.file} -> ${path.relative(REPO_ROOT, plan.cover.destination)}`
    : `retained (${path.relative(REPO_ROOT, plan.preservedCover)})`;
  process.stdout.write("\nManifest summary:\n");
  process.stdout.write(`  Cover: ${coverLabel}\n`);
  process.stdout.write(`  Gallery images: ${plan.gallery.length}\n`);
  process.stdout.write(`  Excluded images: ${plan.excluded.length}\n`);
}

async function runManifest(options) {
  const plan = await loadManifest(options.manifestPath);
  const collisions = [];
  for (const output of plan.outputs) {
    if (await checkOutputCollision(output, options.force))
      collisions.push(output);
  }

  if (options.dryRun) {
    process.stdout.write(`Dry run: ${plan.collection}/${plan.slug}\n`);
    printManifestSummary(plan);
    for (const [index, item] of plan.gallery.entries()) {
      process.stdout.write(
        `Gallery ${String(index + 1).padStart(2, "0")}: ${item.file} -> ${item.destination}\n`,
      );
    }
    if (collisions.length > 0) {
      process.stdout.write(
        `Would replace ${collisions.length} existing output(s) with --force.\n`,
      );
    }
    printManifestOutputs(plan.collection, plan.gallery, plan.coverAlt);
    return;
  }

  const converted = [];
  if (plan.cover) converted.push(await convertImage(plan.cover, true));
  for (const image of plan.gallery) {
    converted.push(await convertImage(image, false));
  }

  await fs.mkdir(plan.outputDirectory, { recursive: true });
  if (plan.gallery.length > 0 && plan.collection === "projects") {
    await fs.mkdir(path.join(plan.outputDirectory, "gallery"), {
      recursive: true,
    });
  }

  for (const image of converted) {
    await fs.writeFile(image.destination, image.data, { flag: "w" });
    process.stdout.write(
      `${path.relative(REPO_ROOT, image.destination)} — ${image.width}x${image.height}, ${formatBytes(image.data.length)}\n`,
    );
  }
  printManifestSummary(plan);
  printManifestOutputs(plan.collection, plan.gallery, plan.coverAlt);
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.mode === "sheet") {
    await createContactSheet(options.sourceDirectory);
  } else {
    await runManifest(options);
  }
}

main().catch((error) => {
  process.stderr.write(`[ingest-images] ${error.message}\n`);
  process.exitCode = 1;
});
