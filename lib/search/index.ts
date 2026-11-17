import { ConfigurableSearchEngine } from './engine';

export * from './engine';
export * from './types';

const engine = new ConfigurableSearchEngine('tavily', ['serper', 'google']);

async function run() {
  const query = "Latest developments in quantum computing 2026";

  // Example 1: Standard usage with fallback chain
  const response = await engine.search(query, { maxResults: 5 });
  console.log(`Results from (${response.providerUsed}):`, response.results);

  // Example 2: Override to use Serper explicitly first
  const serperFirst = await engine.search(query, {
    provider: 'serper',
    fallbacks: ['tavily'],
  });
  console.log('Serper explicit results:', serperFirst.results);
}

// Invoke the test function
run();