import React, { ReactElement } from "react";
import Form from "../components/Form";

export default function FormPage(): ReactElement {
  return (
    <div className="my-12 bg-white rounded-xl shadow-sm py-6 px-8 flex flex-col justify-center items-center">
      <h1 className="text-xl mb-6">add to the dictionary</h1>
      <Form />
    </div>
  );
}
