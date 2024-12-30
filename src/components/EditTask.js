import React, { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";

const EditTaskForm = ({ task }) => {
  const { updateTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await updateTask(task._id, { title, description });
      console.log(response);

      if (response) {
        setMessage("¡Tarea guardada exitosamente!");
      } else {
        setMessage("No se pudo editar la tarea. Inténtalo de nuevo.");
      }
    } catch (error) {
      setMessage("Error al editar la tarea");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-bold mb-1">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-1">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      {message && (
        <p
          className={`text-center ${
            message.includes("¡Tarea guardada")
              ? "text-green-600"
              : "text-red-600"
          } italic`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default EditTaskForm;
