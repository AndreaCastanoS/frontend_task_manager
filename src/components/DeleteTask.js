import React from "react";
import { useTaskContext } from "../context/TaskContext";

const ConfirmDeleteAlert = ({ task, close }) => {
  const tasks = useTaskContext();

  const handleDeleteClick = async () => {
    try {
      await tasks.deleteTask(task._id);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">
          ¿Estás seguro de que deseas eliminar esta tarea?
        </h3>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleDeleteClick}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Aceptar
          </button>
          <button
            onClick={close}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cancelar
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAlert;
