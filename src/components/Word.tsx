import { ChangeEvent, MouseEventHandler, ReactElement, useState } from "react";
import { useModal } from "hooks/useModal";
import Form from "components/Form";

import { UPDATE_WORD, DELETE_WORD } from "graphql/mutation";
import { useMutation } from "@apollo/client";
import { WordProp } from "types";
interface Props {
  id: number;
  en: string;
  cn: string;
}

export default function Word({ id, en, cn }: Props): ReactElement {
  const [front, setFront] = useState(true);
  const { show, RenderModal } = useModal();
  const word = {
    en,
    cn,
  };

  const [updateWord, { error, loading }] = useMutation(UPDATE_WORD);

  const [deleteWord, { error: deleteError, loading: deleteLoading }] =
    useMutation(DELETE_WORD, {
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: "Word" });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });

  const onSubmit = ({ en, cn }: Omit<WordProp, "_id">) => {
    updateWord({ variables: { id, data: { en, cn } } });
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteWord({ variables: { id } });
  };

  const card = {
    transform: "rotateY(0deg)",
  };

  const turn = {
    transform: "rotateY(-180deg) ",
  };

  return (
    <article
      className="p-4 m-2 flex h-40 text-center  cursor-pointer
      perspective relative transform transition duration-100 hover:-translate-y-2 ease-in-out outline-none
      "
    >
      <div
        style={front ? card : turn}
        className="absolute left-0 right-0 top-0 bottom-0 duration-1000 flex transition w-full h-full bg-white rounded-xl shadow-lg hover:inch-up"
        onClick={(e) => {
          setFront(!front);
        }}
      >
        <div
          id="front"
          className="absolute left-0 w-full h-full flex flex-col justify-center items-center backface-hidden transition duration-1000"
          style={{
            transform: front
              ? "scaleX(1) rotateY(0deg)"
              : "scaleX(-1) rotateY(180deg)",
          }}
        >
          <h3 className="text-xl">{cn}</h3>
          <h4 className="text-md text-gray">{en}</h4>
        </div>
        <div
          id="back"
          style={{
            transform: front
              ? "scaleX(1) rotateY(-180deg)"
              : "scaleX(-1) rotateY(0deg)",
          }}
          className="absolute left-0 w-full h-full flex flex-col justify-center items-center backface-hidden transition duration-1000"
        >
          <button
            className="mb-1"
            onClick={(e) => {
              e.stopPropagation();
              show();
            }}
          >
            edit ✏️
          </button>
          <button onClick={onDelete} className="mb-1">
            delete 🗑
          </button>
          <button>sentences 💬</button>
        </div>
      </div>

      <RenderModal>
        <div className="mt-2 bg-white rounded-xl shadow-sm py-6 px-8 flex flex-col justify-center items-center">
          <h1 className="text-xl mb-6">edit word</h1>
          <Form
            word={word}
            onSubmit={onSubmit}
            error={error}
            loading={loading}
          />
        </div>
      </RenderModal>
    </article>
  );
}
