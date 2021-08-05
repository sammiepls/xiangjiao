export type DataProp = {
  id: number;
  en: string;
  cn: string;
};

export type ScoreProp = {
  correct: boolean;
  submittedAnswer: number;
};

export type WordProp = {
  _id: number;
  en: string;
  cn: string;
};

export type WordsProp = WordProp[];
