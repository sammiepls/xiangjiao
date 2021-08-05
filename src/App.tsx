import { useRoutes, A, usePath } from "hookrouter";
import Routes from "./routes";

function App() {
  const path = usePath();
  const routeResult = useRoutes(Routes);

  const isCurrentPath = (p: string) => p === path;

  const linkStyles = (p: string) =>
    `mr-4 p-2 ${isCurrentPath(p) ? "bg-yellow" : ""}`;

  return (
    <div className="min-h-screen h-100 bg-lightYellow flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl my-6">xiang 🍌 jiao</h1>
      <nav className="bg-lightGray rounded-full px-6 shadow-md flex justify-center">
        <A className={linkStyles("/")} href="/">
          dictionary
        </A>
        <A href="/form" className={linkStyles("/form")}>
          add new words
        </A>
        <A href="/quiz" className={linkStyles("/quiz")}>
          quiz
        </A>
      </nav>
      <main>{routeResult}</main>
    </div>
  );
}

export default App;
