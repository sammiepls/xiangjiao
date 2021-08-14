import React, { ChangeEvent, FormEvent, ReactElement } from "react";

export default function Search({ onSearch }): ReactElement {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // onSearch({
    //   variables: {
    //     en: query.toLowerCase().trim(),
    //     cn: query.toLowerCase().trim(),
    //   },
    // });
    onSearch(query.toLowerCase().trim());
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-row justify-center mt-10">
      <input
        className="outline-none bg-transparent border-b border-darkYellow w-full md:w-80"
        type="search"
        value={query}
        placeholder="search for a word"
        onChange={handleInputChange}
      />
      <button type="submit" className="text-3xl">
        🔍
      </button>
    </form>
  );
}
