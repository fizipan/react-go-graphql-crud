import { gql, useMutation } from "@apollo/client"
import { GET_USERS } from "./get-users"

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

// graphql
export const useDeleteUser = ({ userId }: { userId: string }) => {
  return useMutation(DELETE_USER, {
    variables: { id: userId },
    refetchQueries: [{ query: GET_USERS }],
  })
}