import { T2ALogo } from '../components/ui/T2ALogo';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--bg-primary)">
      <T2ALogo className="w-48 text-(--trait) md:w-64 lg:w-80" />
    </main>
  );
}

