import { gql, useMutation } from "@apollo/client";
import { GET_USERS } from "./get-users";

export const CREATE_USER = gql`
  mutation createUser($input: NewUser!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const useCreateUser = () => {
  return useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
};
