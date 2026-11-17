import { SearchAdapter, SearchResult } from '../types';

export class TavilyAdapter implements SearchAdapter {
  constructor(private apiKey: string = process.env.TAVILY_API_KEY || '') {}

  async search(query: string, maxResults: number = 5): Promise<SearchResult[]> {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: this.apiKey,
        query,
        max_results: maxResults,
      }),
    });

    if (!response.ok) throw new Error(`Tavily search failed: ${response.statusText}`);
    const data = await response.json();

    return data.results.map((item: any) => ({
      title: item.title,
      url: item.url,
      snippet: item.content,
      score: item.score,
    }));
  }
}