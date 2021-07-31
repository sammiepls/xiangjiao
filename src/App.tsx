import React from "react";
import Quiz from "./components/Quiz";
import { ScoreProp } from "./types";
import { generateQuiz, tallyScore } from "./util";

function App() {
  const [quiz, setQuiz] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [isQuizDone, setIsQuizDone] = React.useState(false);

  const handleStartQuiz = () => {
    setQuiz(generateQuiz());
  };

  const handleQuizFinish = (quizScore: ScoreProp[]) => {
    setIsQuizDone(true);
    setScore(tallyScore(quizScore));
  };

  return (
    <div className="App">
      {quiz ? (
        <Quiz quiz={quiz} handleQuizFinish={handleQuizFinish} />
      ) : (
        <button onClick={handleStartQuiz}>Start quiz</button>
      )}
      {isQuizDone && <h1> You finished with a score of {score}</h1>}
    </div>
  );
}

export default App;
