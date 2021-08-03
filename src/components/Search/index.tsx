import React, { ChangeEvent, ReactElement } from "react";
import data from "../../data.json";

interface Props {}

export default function Search({}: Props): ReactElement {
  const [results, setResults] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  React.useEffect(() => {
    if (query !== "") {
      setResults(data.filter((d) => d.en === query || d.cn === query));
    }
  }, [query]);

  return (
    <div>
      <input type="search" value={query} onChange={handleInputChange} />
      {results.map((r) => (
        <article>
          <p>{r.en}</p>
          <p>{r.cn}</p>
        </article>
      ))}
    </div>
  );
}
