import React, { ChangeEvent, ReactElement } from "react";

export default function Search({ onSearch }): ReactElement {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSubmit = () => {
    onSearch({ variables: { en: query, cn: query } });
  };

  return (
    <div className="flex flex-row justify-center mt-10">
      <input
        className="outline-none bg-transparent border-b border-darkYellow w-80"
        type="search"
        value={query}
        placeholder="search for a word"
        onChange={handleInputChange}
      />
      <button onClick={onSubmit} className="text-3xl">
        🔍
      </button>
    </div>
  );
}
