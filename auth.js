import { URL_BASE, tokenKey } from "./constants";

const savedToken = window.localStorage.getItem(tokenKey);

export const authProvider = {
  isAuthenticated: savedToken !== null,
  token: savedToken,
  async login(email, password) {
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
      authProvider.isAuthenticated = true;
      authProvider.token = body.data.token;
      window.localStorage.setItem(tokenKey, body.data.token);      
      return Promise.resolve(body)
    } else {
      const error = await response.json();
      return Promise.reject(error)
    }
  },
  logout() {
    window.localStorage.removeItem(tokenKey);
    authProvider.isAuthenticated = false;
    authProvider.token = null;
  },
};