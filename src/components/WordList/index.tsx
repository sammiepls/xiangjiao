import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const WORDS_QUERY = gql`
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

interface Props {}

export default function WordList({}: Props): React.ReactElement {
  const { data, loading } = useQuery(WORDS_QUERY);
  console.log(data);
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <ul>
        {data.allWords.data.map((word) => (
          <li key={word._id}>
            {word.en} : {word.cn}
          </li>
        ))}
      </ul>
    );
  }
}
