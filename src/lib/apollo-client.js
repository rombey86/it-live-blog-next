import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { removeLastTrailingSlash } from 'lib/util';

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
    }),
    cache: new InMemoryCache(),
  });
}

export function getApolloClient(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
