import React, { ReactElement } from "react";
import Form from "../components/Form";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_WORD } from "../graphql/mutation";
import { GET_ALL_WORDS_QUERY } from "../graphql/queries";
import { WordProp } from "../types";

export default function FormPage(): ReactElement {
  const [createWord, { error, loading }] = useMutation(CREATE_WORD, {
    refetchQueries: [{ query: GET_ALL_WORDS_QUERY }],
  });

  const onSubmit = ({ en, cn }: Omit<WordProp, "_id">) => {
    createWord({ variables: { data: { cn, en } } });
  };

  return (
    <div className="my-12 bg-white rounded-xl shadow-sm py-6 px-8 flex flex-col justify-center items-center">
      <h1 className="text-xl mb-6">add to the dictionary</h1>
      <Form onSubmit={onSubmit} error={error} loading={loading} />
    </div>
  );
}
