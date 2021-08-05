import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { WordsProp } from "./types";

const initialState: WordsProp = [];

const wordsVar = makeVar<WordsProp>(initialState);

export const client = new ApolloClient({
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_FAUNADB_KEY}`,
  },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          words: {
            read() {
              return wordsVar();
            },
          },
        },
      },
    },
  }),
});
