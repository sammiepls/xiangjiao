import { ReactElement, useState } from "react";
import Search from "components/Search";
import WordList from "components/WordList";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_WORDS, GET_WORD_BY_CN, GET_WORD_BY_EN } from "graphql/queries";

export default function Dictionary(): ReactElement {
  const [language, setLanguage] = useState<"en" | "cn">("en");
  const isEn = language === "en";
  const { data, loading, error } = useQuery(GET_WORDS);

  const [getSearchResults, { data: searchData }] = useLazyQuery(
    isEn ? GET_WORD_BY_EN : GET_WORD_BY_CN
  );

  let { words } = data || {};

  if (searchData) {
    words = searchData[isEn ? "wordsByEn" : "wordsByCn"];
  }

  return (
    <div className="flex flex-col">
      <Search onSearch={getSearchResults} />
      <div className="mx-auto mt-2 mb-4">
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
      <WordList words={words} loading={loading} error={error} />
    </div>
  );
}
