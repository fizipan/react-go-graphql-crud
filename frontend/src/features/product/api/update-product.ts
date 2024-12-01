import { gql, useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "./get-products";

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: NewProduct!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      stock
    }
  }
`;

export const useUpdateProduct = ({ productId}: { productId: string }) => {
 return useMutation(UPDATE_PRODUCT, {
    variables: {
     id: productId
    },
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
};

