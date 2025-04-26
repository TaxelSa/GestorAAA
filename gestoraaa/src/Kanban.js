import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

const KanbanBoard = () => {
  const initialTodos = [
    { id: "1", title: "Schedule perm" },
    { id: "2", title: "Rewind VHS tapes" },
    { id: "3", title: "Make change for the arcade" },
    { id: "4", title: "Get disposable camera developed" },
    { id: "5", title: "Learn C++" },
    { id: "6", title: "Return Nintendo Power Glove" },
  ];

  const initialDones = [{ id: "7", title: "Pickup new mix-tape from Beth" }];

  const [todoRef, todos] = useDragAndDrop(initialTodos, {
    group: "kanban-tasks",
  });

  const [doneRef, dones] = useDragAndDrop(initialDones, {
    group: "kanban-tasks",
  });

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
                {todos.map((task) => (
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
                {dones.map((task) => (
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
