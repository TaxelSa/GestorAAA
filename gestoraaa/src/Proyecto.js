import React, { useState, useEffect } from "react";
import "./Proyecto.css";

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeTipo, setMensajeTipo] = useState("");

  const [form, setForm] = useState({
    id_proyecto: "",
    nombre_proyecto: "",
    descripcion: "",
    fecha_entrega: "",
    id_usuario: "",
    id_estado: "",
    id_materia: "",
    id_equipo: "",
  });

  const [editando, setEditando] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const obtenerProyectos = async () => {
    try {
      const res = await fetch("http://localhost/GestorAAA/gestoraaa/php/teams-table-proyectos.php");
      if (!res.ok) throw new Error("Error al obtener proyectos");
      const data = await res.json();
      setProyectos(Array.isArray(data) ? data : []);
    } catch (e) {
      setMensaje("❌ Error al obtener los proyectos.");
      setMensajeTipo("error");
    }
  };

  const guardarProyecto = async () => {
    const url = editando
      ? "http://localhost/GestorAAA/gestoraaa/php/teams-table-update-proyecto.php"
      : "http://localhost/GestorAAA/gestoraaa/php/teams-table-insert-proyectos.php";

    const metodo = editando ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const resultado = await res.json();
        setMensaje(resultado.mensaje || (editando ? "✅ Proyecto actualizado." : "✅ Proyecto creado."));
        setMensajeTipo("success");
        limpiarFormulario();
        obtenerProyectos();
      } else {
        const err = await res.json();
        setMensaje(err.error || "❌ Error al procesar la solicitud.");
        setMensajeTipo("error");
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor.");
      setMensajeTipo("error");
    }
  };

  const eliminarProyecto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este proyecto?")) return;

    try {
      const res = await fetch("http://localhost/GestorAAA/gestoraaa/php/teams-table-delete-proyecto.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_proyecto: id }),
      });

      if (res.ok) {
        const resultado = await res.json();
        setMensaje(resultado.mensaje || "✅ Proyecto eliminado.");
        setMensajeTipo("success");
        obtenerProyectos();
      } else {
        const err = await res.json();
        setMensaje(err.error || "❌ Error al eliminar.");
        setMensajeTipo("error");
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor.");
      setMensajeTipo("error");
    }
  };

  const editarProyecto = (proyecto) => {
    setForm(proyecto);
    setEditando(true);
  };

  const limpiarFormulario = () => {
    setForm({
      id_proyecto: "",
      nombre_proyecto: "",
      descripcion: "",
      fecha_entrega: "",
      id_usuario: "",
      id_estado: "",
      id_materia: "",
      id_equipo: "",
    });
    setEditando(false);
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <h1>Gestión de Proyectos</h1>
      <button onClick={toggleDarkMode} className="toggle-theme">
        Cambiar a {darkMode ? "modo claro" : "modo oscuro"}
      </button>

      <div className="formulario">
        <h2>{editando ? "Editar Proyecto" : "Crear Nuevo Proyecto"}</h2>
        <input name="id_proyecto" value={form.id_proyecto} onChange={handleChange} placeholder="ID del Proyecto" disabled={editando} />
        <input name="nombre_proyecto" value={form.nombre_proyecto} onChange={handleChange} placeholder="Nombre del Proyecto" />
        <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
        <input name="fecha_entrega" type="date" value={form.fecha_entrega} onChange={handleChange} />
        <input name="id_usuario" value={form.id_usuario} onChange={handleChange} placeholder="ID Usuario" />
        <input name="id_estado" value={form.id_estado} onChange={handleChange} placeholder="ID Estado" />
        <input name="id_materia" value={form.id_materia} onChange={handleChange} placeholder="ID Materia" />
        <input name="id_equipo" value={form.id_equipo} onChange={handleChange} placeholder="ID Equipo" />
        <button onClick={guardarProyecto}>{editando ? "Actualizar Proyecto" : "Agregar Proyecto"}</button>
        {editando && <button onClick={limpiarFormulario} className="cancel">Cancelar</button>}
      </div>

      {mensaje && <p className={`mensaje ${mensajeTipo}`}>{mensaje}</p>}

      <h2>Proyectos Registrados</h2>
      {proyectos.length > 0 ? (
        <table className="projects-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Estudiante</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((proy) => (
              <tr key={proy.id_proyecto}>
                <td>{proy.id_proyecto}</td>
                <td>{proy.nombre_proyecto}</td>
                <td>{proy.descripcion}</td>
                <td>{proy.fecha_entrega}</td>
                <td>{proy.id_estado}</td>
                <td>{proy.id_usuario}</td>
                <td>
                  <button className="edit" onClick={() => editarProyecto(proy)}>Modificar</button>
                  <button className="delete" onClick={() => eliminarProyecto(proy.id_proyecto)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay proyectos registrados.</p>
      )}
    </div>
  );
};

export default Proyectos;
