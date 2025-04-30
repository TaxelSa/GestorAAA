// src/Login.js
import React, { useState } from 'react';
import './Login.css'; // Puedes mantener los estilos que ya usabas
import itoLogo from './ito-logo.jpg';

function Login({ onLogin }) {
  const [numeroControl, setNumeroControl] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!numeroControl || !password) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    const datos = {
      numero_control: numeroControl,
      password: password
    };

    try {
      const respuesta = await fetch('http://localhost/VueGestorFree/Controllers/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (resultado.success) {
        // Llama a la función pasada por props para indicar que ya se autenticó
        onLogin();
      } else {
        setErrorMessage(resultado.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      setErrorMessage('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <img src={itoLogo} alt="Logo-ITO" className="logo" />
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
}

export default Login;
