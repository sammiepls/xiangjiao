import React, { ReactElement } from "react";

interface FormProps {}

export default function Form({}: FormProps): ReactElement {
  return (
    <form>
      <h1>Add a new entry</h1>
      <label>
        <h2>English</h2>
        <input type="text" id="en" />
      </label>
      <label>
        <h2>Chinese pinyin</h2>
        <input type="text" id="cn" />
      </label>
      <button>Submit</button>
    </form>
  );
}
