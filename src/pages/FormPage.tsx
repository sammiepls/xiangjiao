import { ReactElement } from "react";
import Form from "components/Form";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_WORD } from "graphql/mutation";
import { WordProp } from "types";
import gql from "graphql-tag";

export default function FormPage(): ReactElement {
  const [createWord, { error, loading }] = useMutation(CREATE_WORD, {
    update(cache, { data: { createWord } }) {
      cache.modify({
        fields: {
          words(existingWords = []) {
            const newWordRef = cache.writeFragment({
              data: createWord,
              fragment: gql`
                fragment NewWord on Word {
                  en
                  cn
                }
              `,
            });
            return {
              ...existingWords,
              data: [newWordRef, ...existingWords.data],
            };
          },
        },
      });
    },
  });

  const onSubmit = ({ en, cn }: Omit<WordProp, "_id">) => {
    createWord({ variables: { data: { cn, en } } });
  };

  return (
    <div className="my-12 bg-white rounded-xl shadow-sm py-6 px-8 flex flex-col justify-center md:items-center md:w-max md:mx-auto">
      <h1 className="text-xl mb-6">add to the dictionary</h1>
      <Form onSubmit={onSubmit} error={error} loading={loading} />
    </div>
  );
}
