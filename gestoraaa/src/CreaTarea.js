import { useState } from 'react';

export const CrearTarea = ({ onTareaCreada }) => {
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre_tarea: '',
    descripcion: '',
    fecha_entrega: '',
    hora_entrega: '',
    prioridad: 1,
    id_usuario: '21011063',
    id_estado: 1,
    id_materia: 1,
    id_proyecto: 22,
  });

  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea((prev) => ({
      ...prev,
      [name]: name === 'prioridad' ? Number(value) : value,
    }));
  };

  const crearTarea = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/GestorAAA/gestoraaa/php/crear_tarea.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaTarea),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok && data.status === 'success') {
        setMensaje('¡Tarea creada exitosamente!');
        setNuevaTarea({
          nombre_tarea: '',
          descripcion: '',
          fecha_entrega: '',
          hora_entrega: '',
          prioridad: 1,
          id_usuario: '21011063',
          id_estado: 1,
          id_materia: 1,
          id_proyecto: 22,
        });
        if (onTareaCreada) onTareaCreada(); // Llama al callback si está definido
      } else {
        setMensaje(data.message || 'Error desconocido al crear la tarea.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de red o servidor.');
    } finally {
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
    }
  };

  return (
    <div className="crear-tarea">
      <h2>Crear Nueva Tarea</h2>

      {mostrarMensaje && (
        <div className={`mensaje ${mensaje.includes('Error') ? 'error' : 'success'}`}>
          {mensaje}
        </div>
      )}

      <form onSubmit={crearTarea} className="formulario">
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la tarea:</label>
          <input
            id="nombre"
            name="nombre_tarea"
            type="text"
            value={nuevaTarea.nombre_tarea}
            onChange={handleChange}
            required
            placeholder="Ingrese el nombre de la tarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={nuevaTarea.descripcion}
            onChange={handleChange}
            required
            placeholder="Descripción de la tarea"
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fecha">Fecha de entrega:</label>
            <input
              id="fecha"
              name="fecha_entrega"
              type="date"
              value={nuevaTarea.fecha_entrega}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="hora">Hora de entrega:</label>
            <input
              id="hora"
              name="hora_entrega"
              type="time"
              value={nuevaTarea.hora_entrega}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="prioridad">Prioridad:</label>
          <select
            id="prioridad"
            name="prioridad"
            value={nuevaTarea.prioridad}
            onChange={handleChange}
          >
            <option value={1}>Baja</option>
            <option value={2}>Media</option>
            <option value={3}>Alta</option>
          </select>
        </div>

        <button type="submit" className="btn-crear">Crear Tarea</button>
      </form>
    </div>
  );
};

export default CrearTarea;