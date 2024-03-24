import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { removeLastTrailingSlash } from 'lib/util';

let apolloClient;

function createApolloClient() {
  const errorLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      if (response.errors) {
        response.errors.forEach(error => {
          console.log(`[GraphQL error]: ${error.message}`);
        });
      }
      return response;
    });
  });

  const httpLink = new HttpLink({
    uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Enable ssrMode for server-side rendering
    link: ApolloLink.from([errorLink, httpLink]),
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

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create an Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  // Hydrate the Apollo Client cache with the initial state if provided
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
