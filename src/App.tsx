import React from "react";
import Quiz from "./components/Quiz";
import { ScoreProp } from "./types";
import { generateQuiz, tallyScore } from "./util";

function App() {
  const [quiz, setQuiz] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [isQuizDone, setIsQuizDone] = React.useState(false);
  const [quizBreakdown, setQuizBreakdown] = React.useState<ScoreProp[]>(null);

  const handleStartQuiz = () => {
    setScore(0);
    setIsQuizDone(false);
    setQuizBreakdown(null);
    setQuiz(generateQuiz());
  };

  const handleQuizFinish = (quizScore: ScoreProp[]) => {
    setIsQuizDone(true);
    setScore(tallyScore(quizScore));
    setQuizBreakdown(quizScore);
  };

  return (
    <div className="App">
      {quiz === null && <button onClick={handleStartQuiz}>Start quiz</button>}
      {quiz && !isQuizDone && (
        <Quiz quiz={quiz} handleQuizFinish={handleQuizFinish} />
      )}
      {isQuizDone && <h1> You finished with a score of {score}</h1>}
      {quizBreakdown && (
        <>
          <ul>
            {quizBreakdown.map((answer, i) => {
              return (
                !answer.correct && (
                  <li>
                    <h2>{quiz[i].cn}</h2>
                    <p>
                      Submitted answer:{" "}
                      {
                        quiz[i].answers.find(
                          (a) => a.id === answer.submittedAnswer
                        ).en
                      }
                    </p>
                    <p>Correct answer: {quiz[i].en}</p>
                  </li>
                )
              );
            })}
          </ul>
          <button onClick={handleStartQuiz}>Play again</button>
        </>
      )}
    </div>
  );
}

export default App;
