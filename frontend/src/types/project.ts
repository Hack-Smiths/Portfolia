export type Project = {
  id: number;
  title: string;
  description?: string;
  type: 'github' | 'others';
  stack: string[];
  features: string[];
  stars: number;
  forks: number;
  link?: string;

  // backend booleans:
  imported?: boolean;
  ai_summary?: boolean;
  saved?: boolean;

  // UI expects this nested object for the 3 dots:
  status?: {
    imported: boolean;
    aiSummary: boolean; // camelCase in UI
    saved: boolean;
  };

  lastUpdated?: string; // optional; your UI shows this for github items
};
