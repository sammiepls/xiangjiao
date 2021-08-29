import React, { ChangeEvent, FormEvent, ReactElement } from "react";

type SearchProps = {
  onSearch: (query: string) => void;
  query: string;
  setQuery: (query: string) => void;
};

export default function Search({
  onSearch,
  query,
  setQuery,
}: SearchProps): ReactElement {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query.toLowerCase().trim());
  };

  React.useEffect(() => {
    if (query) {
      onSearch(query.toLowerCase().trim());
    }
  }, [query]);

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
