import React from "react";
import { GET_ALL_WORDS_QUERY } from "../../Graphql/queries";
import { useQuery } from "@apollo/react-hooks";

interface Props {}

export default function WordList({}: Props): React.ReactElement {
  const { data, loading, error } = useQuery(GET_ALL_WORDS_QUERY);
  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

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
