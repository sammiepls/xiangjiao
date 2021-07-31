import React, { ReactElement } from "react";
import { DataProp } from "../types";

type QuizProps = {
  answer: DataProp;
  checkAnswer: () => void;
};

export default function QuizAnswer({
  answer,
  checkAnswer,
}: QuizProps): ReactElement {
  return <button onClick={checkAnswer}>{answer["en"]}</button>;
}
