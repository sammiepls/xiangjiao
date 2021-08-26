import React from "react";

export const AuthContext = React.createContext({
  authToken: process.env.REACT_APP_FAUNADB_GUEST_KEY,
  isAuthenticated: false,
  setAuthToken: (token: string) => {},
  setIsAuthenticated: (isAuthenticated: boolean) => {},
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = React.useState(
    process.env.REACT_APP_FAUNADB_GUEST_KEY
  );
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const contextValue = {
    authToken,
    setAuthToken,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
