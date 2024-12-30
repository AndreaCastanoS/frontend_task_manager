import React, { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import Modal from "./ModalTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import ViewTaskDetail from "./ViewTaskDetail";

const TaskActions = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenView, setIsModalOpenView] = useState(false); 

  return (
    <div className="flex space-x-4">
      <button onClick={() => setIsModalOpen(true)} aria-label="Editar tarea">
        <AiFillEdit className="text-blue-500 hover:text-blue-700" size={20} />
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Crear Nueva Tarea</h2>
        <EditTask task={task} />
      </Modal>

      <button
        onClick={() => setIsModalOpenDelete(true)}
        aria-label="Eliminar tarea"
      >
        <AiFillDelete className="text-red-500 hover:text-red-700" size={20} />
      </button>

      <Modal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(false)}
      >
        <DeleteTask task={task} close={() => setIsModalOpenDelete(false)} />
      </Modal>

      <button
        onClick={() => setIsModalOpenView(true)}
        aria-label="Ver detalles"
      >
        <AiFillEye className="text-green-500 hover:text-green-700" size={20} />
      </button>
      <Modal isOpen={isModalOpenView} onClose={() => setIsModalOpenView(false)}>
        <ViewTaskDetail task={task} />
      </Modal>
    </div>
  );
};

export default TaskActions;
