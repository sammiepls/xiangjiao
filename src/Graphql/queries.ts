import { gql } from "@apollo/client";

export const GET_WORDS = gql`
  query GetWords {
    words {
      data {
        _id
        en
        cn
      }
    }
  }
`;

export const GET_WORD_BY_ID = gql`
  query FindWordById {
    findWordByID(id: "306158323758006848") {
      _id
      en
      cn
    }
  }
`;
