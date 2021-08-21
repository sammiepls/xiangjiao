import React from "react";
import Word from "components/Word";
import Loader from "./Loader";
import { WordProp } from "../types";

export default function WordList({
  words,
  loading,
  error,
}): React.ReactElement {
  if (loading || !words) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul className="grid grid-cols-2 grid-c md:grid-cols-wordList overflow-auto justify-center">
      {words.map((word: WordProp) => (
        <li key={word._id}>
          <Word en={word.en} cn={word.cn} id={word._id} />
        </li>
      ))}
    </ul>
  );
}
