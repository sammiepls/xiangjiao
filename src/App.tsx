import { useRoutes, A, usePath } from "hookrouter";
import Routes from "./routes";

function App() {
  const path = usePath();
  const routeResult = useRoutes(Routes);

  const isCurrentPath = (p: string) => p === path;

  const linkStyles = (p: string) =>
    `mr-4 p-2 ${isCurrentPath(p) ? "bg-yellow" : ""}`;

  return (
    <div className="min-h-screen h-100 bg-lightYellow flex flex-col items-center p-6">
      <header className="sticky top-0 bg-lightYellow z-50 w-full text-center">
        <h1
          className="text-4xl
        my-2 md:my-6"
        >
          xiang 🍌 jiao
        </h1>
        <nav className="bg-lightGray md:rounded-full md:px-6 md:bottom-auto md:relative md:text-md md:w-max md:mx-auto w-full text-sm shadow-md flex justify-center fixed left-0 bottom-0 z-50">
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
      </header>
      <main className="self-stretch mb-6">{routeResult}</main>
    </div>
  );
}

export default App;
