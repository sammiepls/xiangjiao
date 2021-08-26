import { ReactElement, useState, useEffect } from "react";
import Search from "components/Search";
import WordList from "components/WordList";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_WORDS, GET_WORD_BY_CN, GET_WORD_BY_EN } from "graphql/queries";
import Loader from "components/Loader";
import Pagination from "components/Pagination";

export default function Dictionary(): ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const size = 40;

  const [paginatedWords, setPaginatedWords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [language, setLanguage] = useState<"en" | "cn">("en");
  const isEn = language === "en";
  const { data, loading, error, fetchMore } = useQuery(GET_WORDS);

  const [getSearchResults, { data: searchData, loading: searchLoading }] =
    useLazyQuery(isEn ? GET_WORD_BY_EN : GET_WORD_BY_CN);

  let { words } = data || {};
  const { after } = words || {};

  if (searchData) {
    words = searchData[isEn ? "wordsByEn" : "wordsByCn"];
  }

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

  return (
    <>
      <div className="sticky md:static top-12 z-40 bg-lightYellow pb-4">
        <Search onSearch={filterWords} />
        <div className="text-center mt-4">
          <button
            onClick={() => setLanguage("en")}
            className={`p-2 rounded-full text-xs mr-2 ${
              isEn ? "bg-yellow" : "bg-lightGray text-gray"
            }`}
          >
            in english
          </button>
          <button
            onClick={() => setLanguage("cn")}
            className={`p-2 rounded-full text-xs mr-2 ${
              !isEn ? "bg-yellow" : "bg-lightGray text-gray"
            }`}
          >
            in chinese
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <WordList
            words={searchResults.length ? searchResults : paginatedWords}
            loading={loading || searchLoading}
            error={error}
          />

          {!searchResults.length && (
            <Pagination
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}

      {/* {after && (
        <button
          className="text-center bg-yellow rounded-full mx-auto flex my-4 py-2 px-4 text-sm"
          onClick={() => {
            return fetchMore({
              variables: { cursor: after },
            });
          }}
        >
          load more
        </button>
      )} */}
    </>
  );
}
