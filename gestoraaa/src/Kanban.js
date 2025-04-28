import React, { useEffect, useState } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

const KanbanBoard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [todoRef, todos] = useDragAndDrop([], { group: "kanban-tasks" });
  const [doneRef, dones] = useDragAndDrop([], { group: "kanban-tasks" });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost/GestorAAA/gestoraaa/php/tareas.php');
        
        console.log('response.ok', response.ok);
        console.log('response.status', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('DATA FROM SERVER:', data);

        if (data.status === "success" && Array.isArray(data.data)) {
          const todoTasks = data.data.filter(task => task.id_estado === 1);
          const doneTasks = data.data.filter(task => task.id_estado === 2);

          todos.set(todoTasks.map(task => ({ id: task.id_tarea.toString(), title: task.nombre_tarea })));
          dones.set(doneTasks.map(task => ({ id: task.id_tarea.toString(), title: task.nombre_tarea })));
        } else {
          throw new Error("Formato inesperado de respuesta del servidor");
        }
      } catch (err) {
        console.error('ERROR EN FETCH:', err);
        setError("Error al conectar o procesar datos del servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [todos, dones]);

  if (loading) return <div className="p-4 text-center">Cargando tareas...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="p-4">
      <table className="w-full border border-gray-300 table-fixed">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="w-1/2 p-2 border">To Do</th>
            <th className="w-1/2 p-2 border">Done</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-top border">
              <ul ref={todoRef} className="min-h-[200px] divide-y divide-gray-200">
                {todos.value.map((task) => (
                  <li
                    key={task.id}
                    className="p-2 hover:bg-blue-100 cursor-move transition"
                  >
                    {task.title}
                  </li>
                ))}
              </ul>
            </td>
            <td className="align-top border">
              <ul ref={doneRef} className="min-h-[200px] divide-y divide-gray-200">
                {dones.value.map((task) => (
                  <li
                    key={task.id}
                    className="p-2 hover:bg-green-100 cursor-move transition"
                  >
                    {task.title}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KanbanBoard;
