// Cronograma.jsx
import React, { useEffect, useState } from "react";

const Cronograma = () => {
  const [tareas, setTareas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const obtenerColorPrioridad = (prioridad) => {
    switch (Number(prioridad)) {
      case 1:
        return "border-green-500 bg-green-100";
      case 2:
        return "border-yellow-500 bg-yellow-100";
      case 3:
        return "border-red-500 bg-red-100";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const obtenerColorEstado = (estado) => {
    switch (Number(estado)) {
      case 1:
        return "bg-gray-200 text-gray-800";
      case 2:
        return "bg-blue-200 text-blue-800";
      case 3:
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const obtenerTareas = async () => {
    try {
      const res = await fetch("http://localhost/GestorAAA/gestoraaa/php/tareas.php");
      const data = await res.json();
      if (data.status === "success") {
        const ordenadas = data.data.sort(
          (a, b) => new Date(a.fecha_entrega) - new Date(b.fecha_entrega)
        );
        setTareas(ordenadas);
      }
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const eliminarTarea = async (id_tarea) => {
    try {
      const res = await fetch("http://localhost/GestorAAA/gestoraaa/php/eliminart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_tarea }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setTareas((prev) => prev.filter((t) => t.id_tarea !== id_tarea));
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const modificarTarea = async () => {
    try {
      const res = await fetch("http://localhost/GestorAAA/gestoraaa/php/modificar_tarea.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaSeleccionada),
      });
      const result = await res.json();
      if (result.status === "success") {
        setTareas((prev) =>
          prev.map((t) =>
            t.id_tarea === tareaSeleccionada.id_tarea ? tareaSeleccionada : t
          )
        );
        setTareaSeleccionada(null);
      }
    } catch (error) {
      console.error("Error al modificar tarea:", error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div className="cronograma p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cronograma de Tareas</h2>

      {tareas.map((tarea) => (
        <div
          key={tarea.id_tarea}
          className={`p-4 rounded-lg border-2 mb-4 ${obtenerColorPrioridad(tarea.prioridad)}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">{tarea.nombre_tarea}</h3>
              <p className="text-sm text-gray-600">{tarea.descripcion}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {new Date(tarea.fecha_entrega).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm text-gray-500">{tarea.hora_entrega}</div>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <span className={`px-2 py-1 text-xs rounded-full ${obtenerColorEstado(tarea.id_estado)}`}>
              {Number(tarea.id_estado) === 1
                ? "Por hacer"
                : Number(tarea.id_estado) === 2
                ? "En progreso"
                : "Completado"}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-white border border-gray-300">
              Prioridad {tarea.prioridad}
            </span>
            <button
              onClick={() => eliminarTarea(tarea.id_tarea)}
              className="ml-auto px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
            <button
              onClick={() => setTareaSeleccionada(tarea)}
              className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Modificar
            </button>
          </div>
        </div>
      ))}

      {tareas.length === 0 && <p className="text-center text-gray-500">No hay tareas programadas</p>}

      {tareaSeleccionada && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            modificarTarea();
          }}
          className="mt-6 p-4 bg-white shadow rounded"
        >
          <h3 className="text-lg font-bold mb-4">Modificar Tarea</h3>

          <label className="block mb-2">
            Nombre:
            <input
              type="text"
              value={tareaSeleccionada.nombre_tarea}
              onChange={(e) =>
                setTareaSeleccionada({ ...tareaSeleccionada, nombre_tarea: e.target.value })
              }
              className="block w-full border p-2 rounded"
            />
          </label>

          <label className="block mb-2">
            Descripción:
            <textarea
              value={tareaSeleccionada.descripcion}
              onChange={(e) =>
                setTareaSeleccionada({ ...tareaSeleccionada, descripcion: e.target.value })
              }
              className="block w-full border p-2 rounded"
            ></textarea>
          </label>

          <label className="block mb-2">
            Fecha de entrega:
            <input
              type="date"
              value={tareaSeleccionada.fecha_entrega}
              onChange={(e) =>
                setTareaSeleccionada({ ...tareaSeleccionada, fecha_entrega: e.target.value })
              }
              className="block w-full border p-2 rounded"
            />
          </label>

          <label className="block mb-2">
            Hora de entrega:
            <input
              type="time"
              value={tareaSeleccionada.hora_entrega}
              onChange={(e) =>
                setTareaSeleccionada({ ...tareaSeleccionada, hora_entrega: e.target.value })
              }
              className="block w-full border p-2 rounded"
            />
          </label>

          <label className="block mb-2">
            Prioridad (1-3):
            <input
              type="number"
              min={1}
              max={3}
              value={tareaSeleccionada.prioridad}
              onChange={(e) =>
                setTareaSeleccionada({ ...tareaSeleccionada, prioridad: e.target.value })
              }
              className="block w-full border p-2 rounded"
            />
          </label>

          <label className="block mb-4">
            Estado (1-3):
            <input
              type="number"
              min={1}
              max={3}
              value={tareaSeleccionada.id_estado}
              onChange={(e) =>
                setTareaSeleccionada({ ...tareaSeleccionada, id_estado: e.target.value })
              }
              className="block w-full border p-2 rounded"
            />
          </label>

          <div className="flex justify-end gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setTareaSeleccionada(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};


export default Cronograma;