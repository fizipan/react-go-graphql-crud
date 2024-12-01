import { gql, useMutation } from "@apollo/client";
import { GET_USERS } from "./get-users";

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $input: NewUser!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

export const useUpdateUser = ({ userId}: { userId: string }) => {
 return useMutation(UPDATE_USER, {
    variables: {
     id: userId
    },
    refetchQueries: [{ query: GET_USERS }],
  });
};

