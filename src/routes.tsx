import DictionaryPage from "./pages/DictionaryPage";
import FormPage from "./pages/FormPage";
import QuizPage from "./pages/QuizPage";

const Routes = {
  "/": () => <DictionaryPage />,
  "/form": () => <FormPage />,
  "/quiz": () => <QuizPage />,
};

export default Routes;
