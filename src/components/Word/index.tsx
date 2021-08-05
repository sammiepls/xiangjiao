import React, { ReactElement } from "react";

interface Props {
  en: string;
  cn: string;
}

export default function Word({ en, cn }: Props): ReactElement {
  return (
    <article className="bg-white p-4 rounded-xl shadow-lg m-2 flex flex-col justify-center items-center h-40">
      <h3 className="text-xl">{cn}</h3>
      <h4 className="text-md text-gray">{en}</h4>
    </article>
  );
}
