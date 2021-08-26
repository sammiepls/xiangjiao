import DictionaryPage from "./pages/DictionaryPage";
import FormPage from "./pages/FormPage";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/LoginPage";

const Routes = (isAuthenticated) => ({
  "/": () => <DictionaryPage />,
  "/form": () => (isAuthenticated ? <FormPage /> : <LoginPage />),
  "/quiz": () => <QuizPage />,
});

export default Routes;
