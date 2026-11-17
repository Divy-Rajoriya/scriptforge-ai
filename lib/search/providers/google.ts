import { SearchAdapter, SearchResult } from '../types';

export class GoogleAdapter implements SearchAdapter {
  constructor(
    private apiKey: string = process.env.GOOGLE_SEARCH_API_KEY || '',
    private cx: string = process.env.GOOGLE_SEARCH_CX || ''
  ) {}

  async search(query: string, maxResults: number = 5): Promise<SearchResult[]> {
    const url = `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.cx}&q=${encodeURIComponent(query)}&num=${maxResults}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Google Search failed: ${response.statusText}`);
    const data = await response.json();

    return (data.items || []).map((item: any) => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet,
    }));
  }
}