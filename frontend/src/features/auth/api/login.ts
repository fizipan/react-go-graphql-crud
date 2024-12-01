import { gql, useMutation } from "@apollo/client";

export const AUTH_LOGIN = gql`
  mutation login($input: NewLogin!) {
    login(input: $input) {
      token
    }
  }
`;

export const useLogin = () => {
  return useMutation(AUTH_LOGIN);
};
