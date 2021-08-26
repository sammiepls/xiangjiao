import { ReactElement, useState, useContext, FormEvent } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../graphql/mutation";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage(): ReactElement {
  const { setAuthToken, setIsAuthenticated } = useContext(AuthContext);
  const [loginUser] = useMutation(LOGIN_USER);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginUser({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
      .then(({ data }) => {
        setAuthToken(data.loginUser);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      LOGIN
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
