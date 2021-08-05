import { gql } from "@apollo/client";

export const GET_ALL_WORDS_QUERY = gql`
  query GetAllWords {
    allWords {
      data {
        _id
        cn
        en
      }
    }
  }
`;

export const GET_WORD_BY_ID = gql`
  query GetWordById($id: ID!) {
    findWordByID(id: $id) {
      en
      cn
    }
  }
`;
