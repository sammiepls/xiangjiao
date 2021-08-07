import React from "react";
import Word from "components/Word";

export default function WordList({
  words,
  loading,
  error,
}): React.ReactElement {
  if (loading || !words) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-wordList overflow-auto justify-center">
      {words.data.map((word) => (
        <li key={word._id}>
          <Word en={word.en} cn={word.cn} id={word._id} />
        </li>
      ))}
    </ul>
  );
}
