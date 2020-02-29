import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const API_ENDPOINT = 'http://localhost:8000/graphql' // TODO: with or without '/'?

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: API_ENDPOINT,
    credentials: 'include'
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  })
}

const client = createApolloClient();

export default client;
