import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { removeLastTrailingSlash } from 'lib/util';

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Aktivieren Sie ssrMode, wenn die Ausführung auf dem Server stattfindet
    link: new HttpLink({
      uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
    }),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true,
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Wenn Ihre Seite initialProps oder getStaticProps oder getServerSideProps verwendet
  if (initialState) {
    // Datenwiederherstellung aus dem Cache
    _apolloClient.cache.restore(initialState);
  }

  // Für SSG und SSR immer einen neuen Apollo Client erstellen
  if (typeof window === 'undefined') return _apolloClient;
  // Einen Apollo Client einmal im Client erstellen
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
