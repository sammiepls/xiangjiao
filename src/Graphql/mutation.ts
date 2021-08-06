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
