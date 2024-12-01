import { gql, useQuery } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts {
   getProducts {
      id
      name
      price
      stock
    }
  }
`;

export const useGetProducts = () => {
  return useQuery(GET_PRODUCTS);
}