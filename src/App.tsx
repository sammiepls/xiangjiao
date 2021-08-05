import React from "react";

import { useRoutes, A } from "hookrouter";
import Routes from "./routes";

function App() {
  const routeResult = useRoutes(Routes);
  console.log(routeResult);
  return (
    <div className="App">
      <A href="/">Dictionary</A>
      <A href="/form">Add a word</A>
      {/* <A href="/quiz">Quiz</A> */}
      {routeResult}
    </div>
  );
}

export default App;
