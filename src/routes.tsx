import DictionaryPage from "./pages/DictionaryPage";
import Form from "./components/Form";
import QuizPage from "./pages/QuizPage";

const Routes = {
  "/": () => <DictionaryPage />,
  "/form": () => <Form />,
  "/quiz": () => <QuizPage />,
};

export default Routes;
