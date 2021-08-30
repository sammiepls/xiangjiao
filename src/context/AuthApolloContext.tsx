import { ApolloProvider } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import { GET_WORDS } from "../graphql/queries";

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

export function AuthApolloProvider({ children }) {
  const { authToken } = useContext(AuthContext);

  const init = async () => {
    await persistCache({
      cache,
      storage: window.localStorage,
    });

    try {
      console.log(
        cache.readQuery({
          query: GET_WORDS,
        })
      );
    } catch (e) {
      cache.writeQuery({
        query: GET_WORDS,
        data: {
          words: [],
        },
      });
    }
  };

  init();

  const client = new ApolloClient({
    uri: "https://graphql.fauna.com/graphql",
    headers: {
      authorization: `Bearer ${authToken}`,
    },
    cache,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
