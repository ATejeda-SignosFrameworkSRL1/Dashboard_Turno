import React from "react";
import { loginIconSRC } from "../../helpers/base64Images";

export const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  logIn,
}) => {
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const noRecargarPagina = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="LoginBox">
        <img className="LoginBoxLogo" src={loginIconSRC} alt="Logo" />
        <h1 className="LoginBoxH1"> Iniciar Sesión </h1>

        <form onSubmit={noRecargarPagina} autoComplete="off">
          <label className="LoginBoxLabel" htmlFor="username">
            Usuario
          </label>
          <input
            name="username"
            value={username}
            onChange={handleUsername}
            className="LoginBoxInput"
            type="text"
            placeholder="Ingrese su nombre de usuario"
          />

          <label className="LoginBoxLabel" htmlFor="password">
            Contraseña
          </label>
          <input
            name="password"
            value={password}
            onChange={handlePassword}
            className="LoginBoxInput"
            type="password"
            placeholder="Ingrese su contraseña"
          />

          <input
            onClick={logIn}
            className="LoginBoxButton"
            type="submit"
            value="Iniciar sesión"
          />
        </form>
      </div>
    </>
  );
};
