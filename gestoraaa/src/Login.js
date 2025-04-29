import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./ito-logo.jpg"; // Asegúrate que la ruta sea correcta

const Login = () => {
  const navigate = useNavigate();
  const [numeroControl, setNumeroControl] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();

    if (!numeroControl || !password) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    const datos = {
      numero_control: numeroControl,
      password: password,
    };

    try {
      const respuesta = await fetch("http://localhost/GestorAAA/gestoraaa/php/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (resultado.success) {
        localStorage.setItem("numero_control", numeroControl);
        navigate("/Inicio");
      } else {
        setErrorMessage(resultado.message || "Credenciales incorrectas");
      }
    } catch (error) {
      setErrorMessage("Error de conexión con el servidor");
    }
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <img src={logo} alt="Logo ITO" className="logo" />
        <h2>Iniciar Sesión</h2>

        <form onSubmit={login}>
          <label htmlFor="numero_control">Número de Control:</label>
          <input
            type="text"
            id="numero_control"
            value={numeroControl}
            onChange={(e) => setNumeroControl(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Iniciar Sesión</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>

        <button onClick={toggleDarkMode} style={{ marginTop: "20px" }}>
          Cambiar Modo
        </button>
      </div>
    </div>
  );
};

export default Login;
