import React, { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext"; 

const ViewTaskDetail = ({ task }) => {
  const { fetchTaskById } = useTaskContext(); 
  const [taskDetail, setTaskDetail] = useState(task); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!task._id) return;

    const loadTaskDetail = async () => {
      setLoading(true);
      try {
        const data = await fetchTaskById(task._id);
        setTaskDetail(data); 
      } catch (error) {
        setError("Hubo un error al cargar los detalles de la tarea");
      } finally {
        setLoading(false);
      }
    };

    loadTaskDetail(); 
  }, [ fetchTaskById]); 

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Detalles de la Tarea</h2>
      <div>
        <strong>Título: </strong>
        <p>{taskDetail.title}</p>
      </div>
      <div>
        <strong>Descripción: </strong>
        <p>{taskDetail.description}</p>
      </div>
      <div>
        <strong>Estado: </strong>
        <p
          className={`text-xs font-medium ${
            task.status ? "text-green-500" : "text-red-500"
          }`}
        >
          {task.status ? "Completada" : "Pendiente"}
        </p>
      </div>
      <div>
        <strong>Fecha de Creación: </strong>
        <p>{new Date(taskDetail.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ViewTaskDetail;
