import React from 'react';
import { TaskItem } from '../types';

interface Props {
  task: TaskItem;
  onToggle: (task: TaskItem) => void;
  onDelete: (id: string) => void;
}

const TaskRow: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md 
                    hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label htmlFor={`task-${task.id}`} className="flex items-center space-x-3">
          <input
            id={`task-${task.id}`}
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task)}
            className="w-6 h-6 text-indigo-500 rounded focus:ring-2 focus:ring-indigo-400"
            aria-label={`Mark "${task.description}" as ${task.isCompleted ? 'incomplete' : 'completed'}`}
            title={`Mark "${task.description}" as ${task.isCompleted ? 'incomplete' : 'completed'}`}
          />
          <span className={`${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800 font-semibold'}`}>
            {task.description}
          </span>
        </label>
        {/* Badge */}
        <span className={`mt-2 sm:mt-0 px-2 py-1 rounded-full text-sm font-medium
                          ${task.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {task.isCompleted ? 'Completed' : 'Active'}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 font-bold hover:text-red-700 transition text-lg ml-4"
        aria-label="Delete task"
      >
        🗑️
      </button>
    </div>
  );
};

export default TaskRow;