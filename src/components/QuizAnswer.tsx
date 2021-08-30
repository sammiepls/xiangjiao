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
  return (
    <button
      className="bg-white rounded-xl shadow-lg p-5 w-full m-2"
      onClick={checkAnswer}
    >
      {answer["en"]}
    </button>
  );
}
