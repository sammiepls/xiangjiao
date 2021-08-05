import React, { ReactElement } from "react";
import WordList from "../components/WordList";

interface Props {}

export default function Dictionary({}: Props): ReactElement {
  return (
    <div>
      Dictionary
      <WordList />
    </div>
  );
}
