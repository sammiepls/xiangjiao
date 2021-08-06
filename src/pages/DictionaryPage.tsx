import { ReactElement } from "react";
import Search from "components/Search";
import WordList from "components/WordList";

export default function Dictionary(): ReactElement {
  return (
    <div>
      <Search />
      <WordList />
    </div>
  );
}
