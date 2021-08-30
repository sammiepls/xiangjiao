import React, { ChangeEvent, FormEvent, ReactElement } from "react";
import { ApolloError } from "@apollo/react-hooks";
import { WordProp } from "../types";
import Loader from "./Loader";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_WORD_BY_EN } from "graphql/queries";

type FormProps = {
  word?: {
    cn?: string;
    en?: string;
  };
  onSubmit: (arg: Omit<WordProp, "_id">) => void;
  error?: ApolloError;
  loading?: boolean;
};

export default function Form({
  word,
  onSubmit,
  error,
  loading,
}: FormProps): ReactElement {
  const [en, setEn] = React.useState(word?.en || "");
  const [cn, setCn] = React.useState(word?.cn || "");
  const [hasDuplicate, setHasDuplicate] = React.useState(false);

  React.useEffect(() => {
    if (hasDuplicate === true) {
      setTimeout(() => {
        setHasDuplicate(false);
      }, 5000);
    }
  }, [hasDuplicate]);

  const [getSearchResults] = useLazyQuery(GET_WORD_BY_EN, {
    onCompleted: ({ wordsByEn: { data } }) => {
      const matches = data.some((w) => w.en === en && w.cn === cn);
      if (matches) {
        setHasDuplicate(true);
        return;
      }
      onSubmit({
        cn: cn.trim().toLowerCase(),
        en: en.trim().toLowerCase(),
      });
      if (!error) {
        setEn("");
        setCn("");
      }
    },
  });

  const checkForDuplicates = () => {
    getSearchResults({
      variables: {
        en: en.toLowerCase().trim(),
      },
    });
  };

  const handleEn = (e: ChangeEvent<HTMLInputElement>) => {
    setEn(e.target.value);
  };

  const handleCn = (e: ChangeEvent<HTMLInputElement>) => {
    setCn(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    checkForDuplicates();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <label className="mb-8 self-stretch">
        <h2>English</h2>
        <input
          className="outline-none bg-transparent border-b border-darkYellow md:w-80 w-full py-1"
          type="text"
          id="en"
          value={en}
          onChange={handleEn}
          placeholder="english"
        />
      </label>

      <label className="mb-8 self-stretch">
        <h2>Chinese pinyin</h2>
        <input
          className="outline-none bg-transparent border-b border-darkYellow md:w-80 w-full py-1"
          type="text"
          id="cn"
          value={cn}
          onChange={handleCn}
          placeholder="chinese pinyin"
        />
      </label>
      {loading && <Loader />}
      {error && <p>error</p>}
      {hasDuplicate && <p>Word already exists in dictionary</p>}
      <button
        className="bg-yellow py-2 px-8 rounded-full shadow-sm mb-4 disabled:opacity-50"
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
}
