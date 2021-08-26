import gql from "graphql-tag";

export const CREATE_WORD = gql`
  mutation createWord($data: WordInput!) {
    createWord(data: $data) {
      _id
      cn
      en
    }
  }
`;

export const UPDATE_WORD = gql`
  mutation updateWord($id: ID!, $data: WordInput!) {
    updateWord(id: $id, data: $data) {
      _id
      en
      cn
    }
  }
`;

export const DELETE_WORD = gql`
  mutation deleteWord($id: ID!) {
    deleteWord(id: $id) {
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginUserInput) {
    loginUser(input: $input)
  }
`;
