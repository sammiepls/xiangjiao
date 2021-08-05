import React, { ChangeEvent, ReactElement } from "react";

export default function Search(): ReactElement {
  // const [results, setResults] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // React.useEffect(() => {
  //   if (query !== "") {
  //     setResults(data.filter((d) => d.en === query || d.cn === query));
  //   }
  // }, [query]);

  return (
    <div className="flex flex-row justify-center mt-10 mb-10">
      <input
        className="outline-none bg-transparent border-b border-darkYellow w-80"
        type="search"
        value={query}
        placeholder="search for a word"
        onChange={handleInputChange}
      />
      <button className="text-3xl">🔍</button>
    </div>
  );
}
