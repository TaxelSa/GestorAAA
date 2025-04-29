// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import React from 'react';
import Inicio from './Inicio';
import Proyecto from './Proyecto';
import Tareas from './Tareas';
import Equipos from './Equipos';
import Login from './Login';
import './App.css';

function App() {
  const numeroControl = localStorage.getItem("numero_control");

  if (!numeroControl) {
    // Si no ha iniciado sesión, solo mostrar Login
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <h2>Menú</h2>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/proyecto">Proyecto</Link></li>
            <li><Link to="/tareas">Tareas</Link></li>
            <li><Link to="/equipos">Equipos</Link></li>
          </ul>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/proyecto" element={<Proyecto />} />
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
