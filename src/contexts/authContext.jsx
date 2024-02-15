import * as React from "react";
import { URL_BASE, tokenKey } from "../constants";

const authContext = React.createContext({
  token: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  async function login(email, password) {
    const url = URL_BASE + "/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const body = await response.json();
      setToken(body.token);
      window.localStorage.setItem(tokenKey, body.token);
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  }

  function logout() {
    setToken(null);
    window.localStorage.removeItem(tokenKey);
  }

  return (
    <authContext.Provider value={{ token, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(authContext);
}