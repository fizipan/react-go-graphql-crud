import { gql, useQuery } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
   getUsers {
      id
      name
      email
    }
  }
`;

export const useGetUsers = () => {
  return useQuery(GET_USERS);
}