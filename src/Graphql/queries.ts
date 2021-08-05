import { gql } from "@apollo/client";

export const GET_ALL_WORDS_QUERY = gql`
  {
    allWords {
      data {
        _id
        cn
        en
      }
    }
  }
`;
