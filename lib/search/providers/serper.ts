import { SearchAdapter, SearchResult } from '../types';

export class SerperAdapter implements SearchAdapter {
  constructor(private apiKey: string = process.env.SERPER_API_KEY || '') {}

  async search(query: string, maxResults: number = 5): Promise<SearchResult[]> {
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: query, num: maxResults }),
    });

    if (!response.ok) throw new Error(`Serper search failed: ${response.statusText}`);
    const data = await response.json();

    return (data.organic || []).map((item: any) => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet,
    }));
  }
}