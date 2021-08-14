import React, { ReactElement } from "react";

interface Props {
  pages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  pages,
  currentPage,
  setCurrentPage,
}: Props): ReactElement {
  return (
    <ol className="flex justify-center mt-6">
      {Array.from({ length: pages }).map((_, i) => (
        <li
          className={`${
            i + 1 === currentPage ? "text-black" : "text-gray"
          } mx-1`}
        >
          <button onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
        </li>
      ))}
    </ol>
  );
}
