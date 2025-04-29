import React, { useEffect, useState } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import './Kanban.css';

const KanbanBoard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Crear drag and drop states
  const [todoRef, todos, setTodos] = useDragAndDrop([], { group: "kanban-tasks" });
  const [inProgressRef, inProgress, setInProgress] = useDragAndDrop([], { group: "kanban-tasks" });
  const [doneRef, dones, setDone] = useDragAndDrop([], { group: "kanban-tasks" });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost/GestorAAA/gestoraaa/php/tareas.php');
        const json = await response.json();
        console.log('Datos recibidos:', json);

        if (json.status !== "success") {
          throw new Error("Error al traer las tareas");
        }

        const tasks = json.data || [];

        // Aquí asignamos usando directamente `set`
        setTodos(tasks.filter(task => task.id_estado === 1));
        setInProgress(tasks.filter(task => task.id_estado === 2));
        setDone(tasks.filter(task => task.id_estado === 3));

      } catch (err) {
        console.error('Error cargando tareas:', err);
        setError('No se pudo cargar las tareas');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTodos, setInProgress, setDone]);

  if (loading) return <div className="text-center p-5">Cargando tareas...</div>;
  if (error) return <div className="text-center p-5 text-red-500">{error}</div>;

  return (
    <div className="kanban-board">
    {/* To Do */}
    <div className="kanban-column">
      <h2 className="column-header">To Do</h2>
      <ul ref={todoRef} className="task-list">
        {todos.map(task => (
          <li key={task.id_tarea} className="kanban-item">
            <div className="task-header">{task.nombre_tarea}</div>
            <div className="task-details">
              <p>{task.descripcion}</p>
              <div className="task-meta">
                <span>{task.fecha_entrega}</span>
                <span>Prioridad {task.prioridad}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

   {/* In Progress */}
   <div className="kanban-column">
        <h2 className="column-header">In Progress</h2>
        <ul ref={inProgressRef} className="task-list">
          {inProgress.map(task => (
            <li key={task.id_tarea} className="kanban-item">
              <div className="task-header">{task.nombre_tarea}</div>
              <div className="task-details">
                <p>{task.descripcion}</p>
                <div className="task-meta">
                  <span>{task.fecha_entrega}</span>
                  <span>Prioridad {task.prioridad}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Done */}
      <div className="kanban-column">
        <h2 className="column-header">Done</h2>
        <ul ref={doneRef} className="task-list">
          {dones.map(task => (
            <li key={task.id_tarea} className="kanban-item">
              <div className="task-header">{task.nombre_tarea}</div>
              <div className="task-details">
                <p>{task.descripcion}</p>
                <div className="task-meta">
                  <span>{task.fecha_entrega}</span>
                  <span>Prioridad {task.prioridad}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  
);
}
  

export default KanbanBoard;
