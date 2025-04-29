import React, { useState, useEffect } from 'react';
import 'C:/xampp/htdocs/GestorAAA/gestoraaa/src/Equipo.css';

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [mensajeTipo, setMensajeTipo] = useState('');
  const [codigoEquipo, setCodigoEquipo] = useState('');
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [numeroControl, setNumeroControl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [equipoEditado, setEquipoEditado] = useState({
    codigo_equipo: '',
    nombre_equipo: '',
    descripcion: '',
    numero_control: ''
  });

  useEffect(() => {
    obtenerEquipos();
  }, []);

  const obtenerEquipos = async () => {
    try {
      const respuesta = await fetch('http://localhost/GestorAAA/gestoraaa/php/teams-table.php');
      if (!respuesta.ok) throw new Error('Error al obtener equipos.');
      const datos = await respuesta.json();
      setEquipos(Array.isArray(datos) ? datos : []);
    } catch (error) {
      setMensaje('❌ Error al obtener los equipos.');
      setMensajeTipo('error');
    }
  };

  const crearEquipo = async () => {
    const equipo = { codigo_equipo: codigoEquipo, nombre_equipo: nombreEquipo, descripcion, numero_control: numeroControl };
    try {
      const respuesta = await fetch('http://localhost/GestorAAA/gestoraaa/php/teams-table-insert.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipo),
      });
      if (respuesta.ok) {
        setMensaje('✅ Equipo creado exitosamente.');
        setMensajeTipo('success');
        obtenerEquipos();
        limpiarCampos();
      } else {
        setMensaje('❌ Error al crear equipo.');
        setMensajeTipo('error');
      }
    } catch (error) {
      setMensaje('❌ Error de conexión con el servidor.');
      setMensajeTipo('error');
    }
  };

  const limpiarCampos = () => {
    setCodigoEquipo('');
    setNombreEquipo('');
    setDescripcion('');
    setNumeroControl('');
  };

  const eliminarEquipo = async (codigo) => {
    try {
      const respuesta = await fetch(`http://localhost/GestorAAA/gestoraaa/php/teams-table-delete.php?codigo_equipo=${codigo}`, {
        method: 'DELETE'
      });
      if (respuesta.ok) {
        setMensaje('✅ Equipo eliminado exitosamente.');
        setMensajeTipo('success');
        obtenerEquipos();
      } else {
        setMensaje('❌ Error al eliminar el equipo.');
        setMensajeTipo('error');
      }
    } catch (error) {
      setMensaje('❌ Error de conexión con el servidor.');
      setMensajeTipo('error');
    }
  };

  const abrirModal = (equipo) => {
    setEquipoEditado({ ...equipo });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const guardarEdicion = async () => {
    try {
      const respuesta = await fetch('http://localhost/GestorAAA/gestoraaa/php/teams-table-update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipoEditado),
      });
      if (respuesta.ok) {
        setMensaje('✅ Equipo actualizado correctamente.');
        setMensajeTipo('success');
        obtenerEquipos();
        cerrarModal();
      } else {
        setMensaje('❌ Error al actualizar equipo.');
        setMensajeTipo('error');
      }
    } catch (error) {
      setMensaje('❌ Error de conexión con el servidor.');
      setMensajeTipo('error');
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Equipos</h1>

      <div className="formulario">
        <h2>Crear Nuevo Equipo</h2>
        <input value={codigoEquipo} onChange={(e) => setCodigoEquipo(e.target.value)} placeholder="Código del equipo" />
        <input value={nombreEquipo} onChange={(e) => setNombreEquipo(e.target.value)} placeholder="Nombre del equipo" />
        <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />
        <input value={numeroControl} onChange={(e) => setNumeroControl(e.target.value)} placeholder="Número de control (líder)" />
        <button onClick={crearEquipo}>Agregar Equipo</button>
      </div>

      {mensaje && <p className={`mensaje ${mensajeTipo}`}>{mensaje}</p>}

      <h2>Equipos Registrados</h2>
      {equipos.length > 0 ? (
        <table className="teams-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Líder</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((equipo) => (
              <tr key={equipo.codigo_equipo}>
                <td>{equipo.codigo_equipo}</td>
                <td>{equipo.nombre_equipo}</td>
                <td>{equipo.descripcion}</td>
                <td>{equipo.numero_control}</td>
                <td>
                  <button onClick={() => eliminarEquipo(equipo.codigo_equipo)} className="btn-eliminar">Eliminar</button>
                  <button onClick={() => abrirModal(equipo)} className="btn-editar">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay equipos registrados.</p>
      )}

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Equipo</h2>
            <input value={equipoEditado.nombre_equipo} onChange={(e) => setEquipoEditado({ ...equipoEditado, nombre_equipo: e.target.value })} placeholder="Nombre del equipo" />
            <input value={equipoEditado.descripcion} onChange={(e) => setEquipoEditado({ ...equipoEditado, descripcion: e.target.value })} placeholder="Descripción" />
            <input value={equipoEditado.numero_control} onChange={(e) => setEquipoEditado({ ...equipoEditado, numero_control: e.target.value })} placeholder="Número de control (líder)" />
            <div className="modal-buttons">
              <button onClick={guardarEdicion} className="btn-guardar">Guardar</button>
              <button onClick={cerrarModal} className="btn-cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipos;
