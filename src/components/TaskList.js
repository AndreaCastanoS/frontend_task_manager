import React, { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";


import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
  const { loading, error, fetchTasks } = useTaskContext();

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando tareas...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col space-y-4 justify-center">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
          
          >
            <TaskItem key={task._id} task={task} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No hay tareas disponibles</p>
      )}
    </div>
  );
};

export default TaskList;
