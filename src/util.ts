// import data from "./data.json";
import { DataProp, ScoreProp } from "./types";
import sampleSize from "lodash/sampleSize";

export function generateRandomId(currentIds: number[], data) {
  let index = Math.floor(data.length * Math.random());
  let id = data[index]._id;
  if (currentIds.includes(id)) {
    id = generateRandomId(currentIds, data);
  }
  return id;
}

export function getData(id: number, data) {
  return data.find((d) => d._id === id);
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateAnswers(answer, data): DataProp[] {
  const answers = [answer];
  const answerIds = [answer._id];

  while (answers.length < 4) {
    let randomId = generateRandomId(answerIds, data);
    answerIds.push(randomId);
    answers.push(data.find((d) => d._id === randomId));
  }
  return shuffleArray(answers);
}

export function generateQuiz(data) {
  const quiz = sampleSize(data, 10);

  return quiz.map((d) => {
    const answers = generateAnswers(d, data);
    return {
      ...d,
      answers,
    };
  });
}

export function tallyScore(score: ScoreProp[]) {
  return score.reduce((total, score) => {
    if (score.correct) {
      total++;
    }
    return total;
  }, 0);
}
