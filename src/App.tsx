import React from "react";
import data from "./data.json";

type DataProp = {
  id: number;
  en: string;
  cn: string;
};

function generateRandomId(currentIds: number[]) {
  let id = Math.floor(data.length * Math.random()) + 1;
  if (currentIds.includes(id)) {
    id = generateRandomId(currentIds);
  }
  return id;
}

function getData(id: number) {
  return data.find((d) => d.id === id);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateAnswers(id: number): DataProp[] {
  const answers = [getData(id)];
  const ids = [id];

  while (answers.length < 4) {
    let randomId = generateRandomId(ids);
    ids.push(randomId);
    answers.push(getData(randomId));
  }
  return shuffleArray(answers);
}

function generateQuiz() {
  return data.map((d) => {
    const answers = generateAnswers(d.id);
    return {
      ...d,
      answers,
    };
  });
}

function App() {
  const [score, setScore] = React.useState(0);
  const [quiz, setQuiz] = React.useState(generateQuiz());

  function checkAnswer(correctAnswer: number, submittedAnswer: number) {
    if (correctAnswer === submittedAnswer) {
      setScore(score + 1);
    }
  }

  return (
    <div className="App">
      Current Score: {score}
      {quiz.map((d) => {
        return (
          <article>
            <h1>{d.cn}</h1>
            <ul>
              {d.answers.map((a) => (
                <li key={a.id}>
                  <button onClick={() => checkAnswer(d.id, a.id)}>
                    {a["en"]}
                  </button>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

export default App;
