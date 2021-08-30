import React from "react";
import Quiz from "components/Quiz";
import { ScoreProp } from "types";
import { generateQuiz, tallyScore } from "../util";

import { useApolloClient } from "@apollo/client";
import { GET_WORDS } from "graphql/queries";

const QuizPage = () => {
  const [quiz, setQuiz] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [isQuizDone, setIsQuizDone] = React.useState(false);
  const [quizBreakdown, setQuizBreakdown] = React.useState<ScoreProp[]>(null);

  const client = useApolloClient();

  let words;

  try {
    words = client.readQuery({
      query: GET_WORDS,
    })?.words;
  } catch (e) {
    console.log("oopsies");
  }

  const handleStartQuiz = () => {
    setScore(0);
    setIsQuizDone(false);
    setQuizBreakdown(null);
    setQuiz(generateQuiz(words.data));
  };

  const handleQuizFinish = (quizScore: ScoreProp[]) => {
    setIsQuizDone(true);
    setScore(tallyScore(quizScore));
    setQuizBreakdown(quizScore);
  };

  return (
    <div className="flex flex-column justify-center items-center mt-6">
      {quiz === null && (
        <button
          className="bg-yellow py-2 px-8 rounded-full shadow-sm mb-4 disabled:opacity-50"
          onClick={handleStartQuiz}
        >
          Start quiz
        </button>
      )}
      {quiz && !isQuizDone && (
        <Quiz quiz={quiz} handleQuizFinish={handleQuizFinish} />
      )}
      {isQuizDone && (
        <h1 className="text-center">
          {" "}
          You finished with a score of {score}/10
        </h1>
      )}
      {quizBreakdown && (
        <>
          <ul>
            {quizBreakdown.map((answer, i) => {
              return (
                !answer.correct && (
                  <li className="bg-white rounded-xl shadow-lg my-4 p-2 text-center">
                    <h2>{quiz[i].cn}</h2>
                    <p>
                      Submitted answer:{" "}
                      {
                        quiz[i].answers.find(
                          (a) => a._id === answer.submittedAnswer
                        ).en
                      }
                    </p>
                    <p>Correct answer: {quiz[i].en}</p>
                  </li>
                )
              );
            })}
          </ul>
          <button
            onClick={handleStartQuiz}
            className="bg-yellow py-2 px-8 rounded-full w-max my-6 shadow-sm mb-4 disabled:opacity-50"
          >
            Play again
          </button>
        </>
      )}
    </div>
  );
};

export default QuizPage;
