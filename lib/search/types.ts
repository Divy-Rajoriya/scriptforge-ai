export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  score?: number;
}

export type SearchProvider = 'tavily' | 'serper' | 'google';

export interface SearchOptions {
  provider?: SearchProvider;
  maxResults?: number;
  fallbacks?: SearchProvider[];
}

export interface SearchAdapter {
  search(query: string, maxResults: number): Promise<SearchResult[]>;
}