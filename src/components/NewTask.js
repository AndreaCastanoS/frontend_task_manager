import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const CreateTaskForm = () => {
  const { createTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await createTask({ title, description }); // Llamada API

      if (response) {
        setMessage("¡Tarea creada exitosamente!");
      } else {
        setMessage("No se pudo crear la tarea. Inténtalo de nuevo.");
      }
    } catch (error) {
      setMessage("Error al crear la tarea: ");
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
        <p className="text-gray-400">Campo obligatorio</p>
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
        <p className="text-gray-400">Ingresa mínimo 15 caracteres</p>
      </div>

      {message && (
        <p
          className={`text-center ${
            message.includes("¡Tarea creada")
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
        {isSubmitting ? "Creando..." : "Crear"}
      </button>
    </form>
  );
};

export default CreateTaskForm;
