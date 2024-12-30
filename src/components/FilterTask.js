import React from "react";

const FilterTask = ({ onChange }) => {
  return (
    <div>
      <select
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">Todos</option>
        <option value="pending">Pendientes</option>
        <option value="completed">Completadas</option>
      </select>
    </div>
  );
};

export default FilterTask;
