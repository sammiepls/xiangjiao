import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        words: {
          keyArgs: false,
          merge(existing = { data: [] }, incoming) {
            const mergedData = {
              ...incoming,
              data: [...existing.data, ...incoming.data],
            };
            return mergedData;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_FAUNADB_KEY}`,
  },
  cache,
});
