import React from "react";
import { motion } from "framer-motion"; 
import TaskActions from "./TaskActions";
import { useTaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { updateTask } = useTaskContext(); 

  const handleCheckboxChange = async () => {
    try {
      await updateTask(task._id, { status: !task.status });
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  return (
    <div
      className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg flex justify-between items-center"
     
    >
      <div>
        <h3 className="font-bold text-lg text-gray-800 truncate">
          {task.title}
        </h3>
        <div className="flex items-center mt-4 space-x-2">
          <input
            type="checkbox"
            checked={task.status}
            onChange={handleCheckboxChange} 
            className="form-checkbox text-green-500"
          />
          <p
            className={`text-xs font-medium ${task.status ? "text-green-500" : "text-red-500"}`}
          >
            {task.status ? "Completada" : "Pendiente"}
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Creada el {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      <TaskActions task={task} />
    </div>
  );
};

export default TaskItem;
