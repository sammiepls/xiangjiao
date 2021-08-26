import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "context/AuthContext";
import { AuthApolloProvider } from "context/AuthApolloContext";

ReactDOM.render(
  <AuthProvider>
    <AuthApolloProvider>
      <App />
    </AuthApolloProvider>
  </AuthProvider>,
  document.getElementById("root")
);
