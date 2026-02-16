import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { updateAuthenticationState } from "../../store/authentication";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export const LoginLogic = function () {
  const baseUrl = import.meta.env.VITE_APP_BASEURL;
  const loginProc = import.meta.env.VITE_APP_API_LOGIN;
  const ApiKey = import.meta.env.VITE_APP_APIKEY;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
      APIKey: ApiKey,
    },
  };

  const completeFields = () => {
    Swal.fire({
      icon: "info",
      title: "",
      text: "Completa todos los campos para continuar",
    });
  };

  const loadingUser = () => {
    Swal.fire({
      title: "Iniciando Sesión...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const invalidUser = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El nombre de usuario y la contraseña no coinciden",
    });
    setUsername("");
    setPassword("");
  };

  const logIn = async () => {
    try {
      if (username.length === 0 || password.length === 0) {
        completeFields();
        return;
      }

      loadingUser();

      const response = await axios.post(
        baseUrl + loginProc,
        {
          Username: `'${username}'`,
          Password: `'${password}'`,
        },
        config
      );

      
      console.log(response);
      
      if (response.data[0]) {
        navigate("/dashboard");
        sessionStorage.setItem("nombre", response.data[0].Nombre);
        dispatch(updateAuthenticationState(true));
        Swal.close();
        return;
      }

      Swal.close();
      invalidUser();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        logIn={logIn}
      />
    </>
  );
};
