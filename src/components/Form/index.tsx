import React, { ChangeEvent, FormEvent, ReactElement } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

interface FormProps {}

export default function Form({}: FormProps): ReactElement {
  const CREATE_WORD = gql`
    mutation CreateWord($data: WordInput!) {
      createWord(data: $data) {
        _id
      }
    }
  `;

  const [createWord, { loading }] = useMutation(CREATE_WORD, {
    onCompleted: () => {
      setEn("");
      setCn("");
    },
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

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a new entry</h1>
      <label>
        <h2>English</h2>
        <input type="text" id="en" value={en} onChange={handleEn} />
      </label>
      <label>
        <h2>Chinese pinyin</h2>
        <input type="text" id="cn" value={cn} onChange={handleCn} />
      </label>
      <button>Submit</button>
    </form>
  );
}
