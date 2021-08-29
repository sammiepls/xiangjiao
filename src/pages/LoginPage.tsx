import { ReactElement, useState, useContext, FormEvent } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "graphql/mutation";
import { AuthContext } from "context/AuthContext";
import Loader from "components/Loader";

export default function LoginPage(): ReactElement {
  const { setAuthToken, setIsAuthenticated } = useContext(AuthContext);
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
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
    <div
      className="my-12 bg-white rounded-xl shadow-sm py-6 px-8 flex flex-col justify-center
    md:w-max  md:mx-auto
    "
    >
      <h1 className="text-xl mb-3 text-center">login</h1>
      <p className="text-xs mb-8 text-center">
        you need to be logged in <br />
        to add words to the dictionary
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="mb-8 w-full">
          <h2>email</h2>
          <input
            className="outline-none bg-transparent border-b border-darkYellow py-1 md:w-80 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="mb-8 w-full">
          <h2>password</h2>
          <input
            className="outline-none bg-transparent border-b border-darkYellow py-1 md:w-80 w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {loading && <Loader />}
        {error && (
          <div className="mb-6 text-sm text-red-400">
            There was an error with your email or password.
          </div>
        )}
        <button
          disabled={loading}
          type="submit"
          className="bg-yellow py-2 px-8 rounded-full shadow-sm mb-4 disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
