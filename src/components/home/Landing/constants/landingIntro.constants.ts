export interface LandingColumn {
  index: string;
  label: string;
}

export const LANDING_COLUMNS: readonly LandingColumn[] = [
  { index: '01', label: 'ATELIER' },
  { index: '02', label: 'TraiT' },
  { index: '03', label: "D'ARCHITECTURE" },
] as const;

export const LANDING_COLUMN_THRESHOLDS = [0.55, 0.62, 0.69] as const;
