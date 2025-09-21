import { Environment, Network, RecordSource, Store, RequestParameters, Variables, GraphQLResponse } from 'relay-runtime';

async function fetchGraphQL(params: RequestParameters, variables: Variables): Promise<GraphQLResponse> {
  const response = await fetch(import.meta.env.VITE_API_URL ?? 'http://localhost:8080/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: params.text, variables })
  });
  return await response.json();
}

export const relayEnvironment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource())
});
