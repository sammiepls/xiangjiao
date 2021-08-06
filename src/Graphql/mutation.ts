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
  mutation updateWord($id: ID!, $cn: String, $en: String) {
    updateWord(id: $id, data: { cn: $cn, en: $en }) {
      _id
      cn
      en
    }
  }
`;
