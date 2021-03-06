import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import storage from '../../storage/storage';
import storageKeys from '../../storage/storageKeys';


class ApolloClientWrapper {
  constructor() {
    const httpLink = createHttpLink({
      uri: 'http://10.0.2.2:4000',
    });

    const authLink = setContext(async (_, { headers }) => {
      const token = await storage.load(storageKeys.TOKEN);

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    const link = ApolloLink.from([
      authLink,
      httpLink,
    ]);

    this.client = new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }

  query = (gql, variables = {}) => {
    const queryObject = {
      query: gql,
      variables,
    };

    const apolloQuery = this.client.query(queryObject);
    return apolloQuery;
  };

  mutate = (gql, variables = {}) => {
    const mutateObject = {
      mutation: gql,
      variables,
    };

    const apolloMutate = this.client.mutate(mutateObject);
    return apolloMutate;
  };
}

const apolloClient = new ApolloClientWrapper();

export default apolloClient;

