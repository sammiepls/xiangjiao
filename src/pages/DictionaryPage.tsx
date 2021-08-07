import { ReactElement, useState } from "react";
import Search from "components/Search";
import WordList from "components/WordList";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_WORDS, GET_WORD_BY_CN, GET_WORD_BY_EN } from "graphql/queries";

export default function Dictionary(): ReactElement {
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

  return (
    <>
      <div className="sticky top-12 z-40 bg-lightYellow pb-4">
        <Search onSearch={getSearchResults} />
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
      <WordList
        words={words}
        loading={loading || searchLoading}
        error={error}
      />

      {after && (
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
      )}
    </>
  );
}
