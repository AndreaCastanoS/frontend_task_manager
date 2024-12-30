/* 
import './index.css';  

import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskBoard from "./components/pages/TaskBoard";

const App = () => {
  return (
    <TaskProvider>
      <TaskBoard />
    </TaskProvider>
  );
};

export default App;
 */

import './index.css';  
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Agregamos estas importaciones
import { TaskProvider } from "./context/TaskContext"; // Importa el proveedor de tareas
import TaskBoard from "./components/pages/TaskBoard"; // Importa tu componente TaskBoard

const App = () => {
  return (
    <Router>  {/* Agregamos Router para el enrutamiento */}
      <TaskProvider>
        <Routes> {/* Usamos Routes para definir las rutas */}
          <Route path="/" element={<TaskBoard />} /> {/* Definimos una ruta para TaskBoard */}
        </Routes>
      </TaskProvider>
    </Router>
  );
};

export default App;
