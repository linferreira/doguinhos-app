import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import LoginCreate from "./LoginCreate";
import LoginForm from "./LoginForm";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";

const Login = () => {
  const { login } = useContext(UserContext);
  if (login) {
    return <Navigate to="/conta" />;
  } else {
    return (
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="criar" element={<LoginCreate />}></Route>
          <Route path="perdeu" element={<LoginPasswordLost />}></Route>
          <Route path="resetar" element={<LoginPasswordReset />}></Route>
        </Routes>
      </div>
    );
  }
};

export default Login;
