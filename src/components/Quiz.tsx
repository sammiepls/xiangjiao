import React, { ReactElement } from "react";
import QuizAnswer from "components/QuizAnswer";
import { WordProp, ScoreProp } from "types";

interface Props {
  quiz: (WordProp & { answers: WordProp[] })[];
  handleQuizFinish: (score: ScoreProp[]) => void;
}

export default function Quiz({ quiz, handleQuizFinish }: Props): ReactElement {
  const [score, setScore] = React.useState<ScoreProp[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const isLastQuestion = currentQuestion === quiz.length;

  React.useEffect(() => {
    if (isLastQuestion) {
      handleQuizFinish(score);
    }
  }, [isLastQuestion, score, handleQuizFinish]);

  function checkAnswer(correctAnswer: number, submittedAnswer: number) {
    setScore([
      ...score,
      {
        correct: correctAnswer === submittedAnswer ? true : false,
        submittedAnswer,
      },
    ]);
    setCurrentQuestion(currentQuestion + 1);
  }

  return (
    <div>
      {quiz.map((d, i) => {
        return currentQuestion === i ? (
          <article className="flex flex-col justify-center items-center">
            <h1 className="text-xl">{d.cn}</h1>
            <ul className="grid grid-cols-2 gap-x-5">
              {d.answers.map((a, i) => (
                <li key={a._id}>
                  <QuizAnswer
                    checkAnswer={() => checkAnswer(d._id, a._id)}
                    answer={a}
                  />
                </li>
              ))}
            </ul>
          </article>
        ) : null;
      })}
    </div>
  );
}
