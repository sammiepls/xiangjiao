import React, { ReactElement } from "react";
import Form from "../components/Form";

interface Props {}

export default function FormPage({}: Props): ReactElement {
  return (
    <div className="my-12">
      <Form />
    </div>
  );
}
