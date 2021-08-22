import { ReactElement } from "react";
import { WordProp } from "types";

type QuizProps = {
  answer: WordProp;
  checkAnswer: () => void;
};

export default function QuizAnswer({
  answer,
  checkAnswer,
}: QuizProps): ReactElement {
  return <button onClick={checkAnswer}>{answer["en"]}</button>;
}
