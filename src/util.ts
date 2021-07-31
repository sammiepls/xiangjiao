import data from "./data.json";
import { DataProp, ScoreProp } from "./types";

export function generateRandomId(currentIds: number[]) {
  let id = Math.floor(data.length * Math.random()) + 1;
  if (currentIds.includes(id)) {
    id = generateRandomId(currentIds);
  }
  return id;
}

export function getData(id: number) {
  return data.find((d) => d.id === id);
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateAnswers(id: number): DataProp[] {
  const answers = [getData(id)];
  const ids = [id];

  while (answers.length < 4) {
    let randomId = generateRandomId(ids);
    ids.push(randomId);
    answers.push(getData(randomId));
  }
  return shuffleArray(answers);
}

export function generateQuiz() {
  return data.map((d) => {
    const answers = generateAnswers(d.id);
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
