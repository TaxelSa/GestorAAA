// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Inicio from './Inicio';
import Proyecto from './Proyecto';
import Tareas from './Tareas';
import Equipos from './Equipos';
import Login from './Login';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && (
          <aside className="sidebar">
            <h2>Menú</h2>
            <ul>
              <li><Link to="/inicio">Inicio</Link></li>
              <li><Link to="/proyecto">Proyecto</Link></li>
              <li><Link to="/tareas">Tareas</Link></li>
              <li><Link to="/equipos">Equipos</Link></li>
            </ul>
            <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
          </aside>
        )}

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/inicio" /> : <Login onLogin={() => setIsAuthenticated(true)} />
              }
            />
            <Route
              path="/inicio"
              element={
                isAuthenticated ? <Inicio /> : <Navigate to="/" />
              }
            />
            <Route
              path="/proyecto"
              element={
                isAuthenticated ? <Proyecto /> : <Navigate to="/" />
              }
            />
            <Route
              path="/tareas"
              element={
                isAuthenticated ? <Tareas /> : <Navigate to="/" />
              }
            />
            <Route
              path="/equipos"
              element={
                isAuthenticated ? <Equipos /> : <Navigate to="/" />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
