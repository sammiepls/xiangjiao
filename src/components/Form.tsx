import React, { ChangeEvent, FormEvent, ReactElement } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_WORD } from "../graphql/mutation";
import { GET_ALL_WORDS_QUERY } from "../graphql/queries";

type FormProps = {
  id?: number;
};

export default function Form({ id }: FormProps): ReactElement {
  const [createWord, { error, loading }] = useMutation(CREATE_WORD, {
    onCompleted: () => {
      setEn("");
      setCn("");
    },
    refetchQueries: [{ query: GET_ALL_WORDS_QUERY }],
  });

  const [en, setEn] = React.useState("");
  const [cn, setCn] = React.useState("");

  const handleEn = (e: ChangeEvent<HTMLInputElement>) => {
    setEn(e.target.value.trim());
  };

  const handleCn = (e: ChangeEvent<HTMLInputElement>) => {
    setCn(e.target.value.trim());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createWord({ variables: { data: { cn, en } } });
  };

  const [enFocused, setEnFocused] = React.useState(false);
  const [cnFocused, setCnFocused] = React.useState(false);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <label className="mb-8">
        <h2
          className={
            enFocused ? "animate-move-up" : "animate-move-down opacity-0"
          }
        >
          English
        </h2>
        <input
          onFocus={() => setEnFocused(true)}
          onBlur={() => setEnFocused(false)}
          className="outline-none bg-transparent border-b border-darkYellow w-80 py-1"
          type="text"
          id="en"
          value={en}
          onChange={handleEn}
          placeholder="english"
        />
      </label>

      <label className="mb-8">
        <h2
          className={
            cnFocused ? "animate-move-up" : "animate-move-down opacity-0"
          }
        >
          Chinese pinyin
        </h2>
        <input
          onFocus={() => setCnFocused(true)}
          onBlur={() => setCnFocused(false)}
          className="outline-none bg-transparent border-b border-darkYellow w-80 py-1"
          type="text"
          id="cn"
          value={cn}
          onChange={handleCn}
          placeholder="chinese pinyin"
        />
      </label>
      {loading && <p>Loading</p>}
      {error && <p>error</p>}
      <button className="bg-yellow py-2 px-8 rounded-full shadow-sm mb-4">
        Submit
      </button>
    </form>
  );
}
