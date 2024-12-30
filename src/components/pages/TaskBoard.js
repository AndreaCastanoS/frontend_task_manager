import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTaskContext } from "../../context/TaskContext";
import TaskList from "../TaskList";
import Modal from "../ModalTask";
import FilterTask from "../FilterTask";
import NewTask from "../NewTask";


const TaskBoard = () => {
  const { tasks, fetchTasks } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("status");
  };

  useEffect(() => {
    const status = getQueryParams();
    fetchTasks(status);
  }, [location.search]);

  const handleFilterChange = (filterStatus) => {
    if (filterStatus) {
      navigate(`?status=${filterStatus}`);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-md p-6 space-y-8">
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-600 text-center pb-6">
            Tablero de Tareas
          </h1>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-md hover:bg-slate-300"
            >
              Crear tarea
            </button>
            <FilterTask onChange={handleFilterChange} />
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-lg font-bold mb-4">Crear Nueva Tarea</h2>
            <NewTask />
          </Modal>
        </div>
        <div      
          className="flex justify-center"
        >
          <TaskList
            tasks={tasks}
            title="Tareas por Hacer"
            emptyMessage="No hay tareas pendientes."
          />
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
