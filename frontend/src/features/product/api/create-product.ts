import { gql, useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "./get-products";

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: NewProduct!) {
    createProduct(input: $input) {
      id
      name
      price
      stock
    }
  }
`;

export const useCreateProduct = () => {
  return useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
};
