import { env } from "@/config/env";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: env.API_URL,
  cache: new InMemoryCache(),
});