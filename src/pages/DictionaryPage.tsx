import { ReactElement, useState, useEffect } from "react";
import Search from "components/Search";
import WordList from "components/WordList";
import { useQuery } from "@apollo/react-hooks";
import { GET_WORDS } from "graphql/queries";
import Loader from "components/Loader";
import Pagination from "components/Pagination";

export default function Dictionary(): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState("");

  const size = 40;

  const [paginatedWords, setPaginatedWords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { data, loading, error, fetchMore } = useQuery(GET_WORDS);

  let { words } = data || {};
  const { after } = words || {};

  const filterWords = (query) => {
    setSearchResults(
      words.data.filter((w) => w.en.includes(query) || w.cn.includes(query))
    );
  };

  useEffect(() => {
    if (data && after) {
      fetchMore({
        variables: { cursor: after },
      });
    }
  }, [data, after, fetchMore]);

  useEffect(() => {
    if (!loading && words) {
      setPages(Math.ceil(words.data.length / size));
    }
  }, [loading, size, words]);

  useEffect(() => {
    if (words) {
      const offset = (currentPage - 1) * size;
      const w = words.data.slice(offset, size + offset);
      setPaginatedWords(w);
    }
  }, [currentPage, size, words]);

  useEffect(() => {
    if (query === "") {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <>
      <div className="sticky md:static top-12 z-40 bg-lightYellow pb-4">
        <Search onSearch={filterWords} query={query} setQuery={setQuery} />
      </div>

      {loading ? (
        <Loader />
      ) : query && searchResults.length === 0 ? (
        <p className="text-center text-red-400 mt-4 mb-6">
          No results found 😢
        </p>
      ) : (
        <>
          <WordList
            words={searchResults.length === 0 ? paginatedWords : searchResults}
            loading={loading}
            error={error}
          />
          {query === "" && (
            <Pagination
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </>
  );
}
