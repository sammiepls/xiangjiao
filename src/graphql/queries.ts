import { gql } from "@apollo/client";

export const GET_WORDS = gql`
  query GetWords($cursor: String) {
    words(_cursor: $cursor, _size: 40) {
      data {
        _id
        en
        cn
      }
      before
      after
    }
  }
`;

export const GET_WORD_BY_ID = gql`
  query FindWordById($id: Int!) {
    findWordByID(id: $id) {
      _id
      en
      cn
    }
  }
`;

export const GET_WORD_BY_EN = gql`
  query GetWordByEn($en: String!) {
    wordsByEn(en: $en) {
      data {
        _id
        en
        cn
      }
    }
  }
`;

export const GET_WORD_BY_CN = gql`
  query GetWordByCn($cn: String!) {
    wordsByCn(cn: $cn) {
      data {
        _id
        en
        cn
      }
    }
  }
`;
