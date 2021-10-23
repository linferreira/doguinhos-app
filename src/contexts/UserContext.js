import React, { createContext, useState, useEffect, useCallback } from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);

    window.localStorage.removeItem("Doguinhos - App: token");
    navigate("/login");
  }, [navigate]);


  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("Doguinhos - App: token");

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);

          const response = await fetch(url, options);

          if (!response.ok) {
            throw new Error("Token Inválido");
          } else {
            await getUser(token);
          }
        } catch (err) {
          await userLogout();
        } finally {
          setLoading(false);
        }
      }
    }

    autoLogin();
  }, [userLogout]);

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);

    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: Usuário Inválido`);
      } else {
        const { token } = await response.json();

        window.localStorage.setItem("Doguinhos - App: token", token);

        await getUser(token);
        navigate("/conta");
      }
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        data,
        login,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
