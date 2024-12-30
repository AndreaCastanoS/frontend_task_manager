import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async (status) => {
    setLoading(true);
    setError(null);

    try {
      const url = status
        ? `https://backend-task-manager-bhf7.onrender.com/api/tasks?status=${status}`
        : "https://backend-task-manager-bhf7.onrender.com/api/tasks";

      const response = await axios.get(url);
      setTasks(response.data.response);
    } catch (err) {
      setError("Hubo un error al cargar las tareas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async ({ title, description }) => {
    try {
      const response = await axios.post("https://backend-task-manager-bhf7.onrender.com/api/tasks", {
        title,
        description,
      });

      if (response.status !== 201) {
        throw new Error("No se pudo crear la tarea");
      }

      const newTask = response.data.response;

      fetchTasks();

      return newTask;
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await axios.put(
        `https://backend-task-manager-bhf7.onrender.com/api/tasks/${id}`,
        updates
      );
      if (response.status !== 200) {
        throw new Error("No se pudo editar la tarea");
      }

      const updatedTask = response.data.response;

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
      return updatedTask;
    } catch (error) {
      console.error("Error al editar la tarea:", error);
      throw error;
    }
  };

  const fetchTaskById = async (id) => {
    try {
      const response = await axios.get(`https://backend-task-manager-bhf7.onrender.com/api/tasks/${id}`);
      if (response.status !== 200) {
        throw new Error("No se pudo recuperar la tarea");
      }
      return response.data.response;
    } catch (error) {
      console.error("Error al recuperar la tarea:", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://backend-task-manager-bhf7.onrender.com/api/tasks/${id}`
      );
      if (response.status !== 200) {
        throw new Error("No se pudo eliminar la tarea");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        fetchTaskById,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export const useTaskContext = () => useContext(TaskContext);
