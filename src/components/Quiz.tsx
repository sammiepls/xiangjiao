import React, { ReactElement } from "react";
import QuizAnswer from "components/QuizAnswer";
import { DataProp, ScoreProp } from "types";

interface Props {
  quiz: (DataProp & { answers: DataProp[] })[];
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
      {quiz.map((d, i) =>
        currentQuestion === i ? (
          <article>
            <h1>{d.cn}</h1>
            <ul>
              {d.answers.map((a, i) => (
                <li key={a.id}>
                  <QuizAnswer
                    checkAnswer={() => checkAnswer(d.id, a.id)}
                    answer={a}
                  />
                </li>
              ))}
            </ul>
          </article>
        ) : null
      )}
    </div>
  );
}
