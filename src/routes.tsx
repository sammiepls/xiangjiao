import Dictionary from "./pages/Dictionary";
import Form from "./components/Form";
// import Quiz from "./components/Quiz";

const Routes = {
  "/": () => <Dictionary />,
  "/form": () => <Form />,
  // "/quiz": () => <Quiz />,
};

export default Routes;
