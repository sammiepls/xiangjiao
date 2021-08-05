import React, { ReactElement } from "react";
import { useModal } from "../hooks/useModal";
import Form from "./Form";

interface Props {
  id: number;
  en: string;
  cn: string;
}

export default function Word({ id, en, cn }: Props): ReactElement {
  const { show, RenderModal } = useModal();

  return (
    <article className="bg-white p-4 rounded-xl shadow-lg m-2 flex flex-col justify-center items-center h-40 w-60 text-center relative">
      <h3 className="text-xl">{cn}</h3>
      <h4 className="text-md text-gray">{en}</h4>
      <button className="absolute top-4 right-4" onClick={show}>
        ✏️
      </button>

      <RenderModal>
        <div className="my-12 bg-white rounded-xl shadow-sm py-6 px-8 flex flex-col justify-center items-center">
          <h1 className="text-xl mb-6">edit word</h1>
          {/* <Form id={id} /> */}
        </div>
      </RenderModal>
    </article>
  );
}
