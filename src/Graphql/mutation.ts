import gql from "graphql-tag";

export const CREATE_WORD = gql`
  mutation createWord($data: WordInput!) {
    createWord(data: $data) {
      _id
    }
  }
`;
