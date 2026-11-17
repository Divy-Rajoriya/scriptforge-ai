import { SearchAdapter, SearchOptions, SearchProvider, SearchResult } from './types';
import { TavilyAdapter } from './providers/tavily';
import { SerperAdapter } from './providers/serper';
import { GoogleAdapter } from './providers/google';

export class ConfigurableSearchEngine {
  private adapters: Map<SearchProvider, SearchAdapter>;
  private defaultProvider: SearchProvider;
  private defaultFallbacks: SearchProvider[];

  constructor(
    defaultProvider: SearchProvider = 'tavily',
    defaultFallbacks: SearchProvider[] = ['serper', 'google']
  ) {
    this.defaultProvider = defaultProvider;
    this.defaultFallbacks = defaultFallbacks;

    this.adapters = new Map<SearchProvider, SearchAdapter>([
      ['tavily', new TavilyAdapter()],
      ['serper', new SerperAdapter()],
      ['google', new GoogleAdapter()],
    ]);
  }

  async search(query: string, options: SearchOptions = {}): Promise<{ results: SearchResult[]; providerUsed: SearchProvider }> {
    const primary = options.provider || this.defaultProvider;
    const fallbacks = options.fallbacks || this.defaultFallbacks.filter((p) => p !== primary);
    const chain: SearchProvider[] = [primary, ...fallbacks];
    const maxResults = options.maxResults || 5;

    const errors: Array<{ provider: SearchProvider; error: any }> = [];

    for (const provider of chain) {
      const adapter = this.adapters.get(provider);
      if (!adapter) continue;

      try {
        const results = await adapter.search(query, maxResults);
        return { results, providerUsed: provider };
      } catch (err) {
        console.warn(`Search engine provider '${provider}' failed. Trying next fallback...`, err);
        errors.push({ provider, error: err });
      }
    }

    throw new Error(`All search providers failed:\n` + errors.map((e) => `[${e.provider}]: ${e.error.message}`).join('\n'));
  }
}