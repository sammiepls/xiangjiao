import React, { useRef, ChangeEvent, FormEvent, ReactElement } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_WORD } from "../../Graphql/mutation";
import { GET_ALL_WORDS_QUERY } from "../../Graphql/queries";

interface FormProps {}

export default function Form({}: FormProps): ReactElement {
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
    setEn(e.target.value);
  };

  const handleCn = (e: ChangeEvent<HTMLInputElement>) => {
    setCn(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createWord({ variables: { data: { cn, en } } });
  };

  const [enFocused, setEnFocused] = React.useState(false);
  const [cnFocused, setCnFocused] = React.useState(false);

  return (
    <form
      className="bg-white rounded-xl shadow-sm py-6 px-8 flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl mb-6">add to the dictionary</h1>

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
      <button className="bg-yellow py-2 px-8 rounded-full shadow-sm mb-4">
        Submit
      </button>
    </form>
  );
}
