import React from "react";
import { GET_ALL_WORDS_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import Word from "./Word";

export default function WordList(): React.ReactElement {
  const { data, loading, error } = useQuery(GET_ALL_WORDS_QUERY);
  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul className="grid grid-cols-4">
      {data.allWords.data.map((word) => (
        <li key={word._id}>
          <Word en={word.en} cn={word.cn} id={word._id} />
        </li>
      ))}
    </ul>
  );
}
