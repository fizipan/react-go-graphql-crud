import { env } from "@/config/env";
import { Cookie } from "@/utils/storage";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// HTTP link to connect to the GraphQL API
const httpLink = createHttpLink({
  uri: env.API_URL,
});

// Auth link to add token to request headers
const authLink = setContext((_, { headers }) => {
  const token = Cookie.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo client instance to connect to the GraphQL API
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
