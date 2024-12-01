import { gql, useMutation } from "@apollo/client"
import { GET_PRODUCTS } from "./get-products"

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

// graphql
export const useDeleteProduct = ({ productId }: { productId: string }) => {
  return useMutation(DELETE_PRODUCT, {
    variables: { id: productId },
    refetchQueries: [{ query: GET_PRODUCTS }],
  })
}