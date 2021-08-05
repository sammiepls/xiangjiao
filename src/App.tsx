import React from "react";

import { useRoutes, A, usePath } from "hookrouter";
import Routes from "./routes";

function App() {
  const currentPath = window.location.pathname;
  const path = usePath();
  console.log("path", path, currentPath);
  const routeResult = useRoutes(Routes);
  console.log(routeResult);

  const isCurrentPath = (p) => p === path;

  const linkStyles = (p) => `mr-4 p-2 ${isCurrentPath(p) ? "bg-yellow" : ""}`;

  return (
    <div className="h-screen bg-lightYellow flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl my-6">xiang 🍌 jiao</h1>
      <nav className="bg-lightGray rounded-full py-2 px-6">
        <A className={linkStyles("/")} href="/">
          dictionary
        </A>
        <A href="/form" className={linkStyles("/form")}>
          add new words
        </A>
        <A href="/quiz" disabled className={linkStyles("/quiz")}>
          quiz (coming soon)
        </A>
      </nav>
      <main>{routeResult}</main>
    </div>
  );
}

export default App;
