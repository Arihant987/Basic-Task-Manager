import React from 'react';
import { TaskItem } from '../types';

interface Props {
  task: TaskItem;
  onToggle: (task: TaskItem) => void;
  onDelete: (id: string) => void;
}

const TaskRow: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task)}
          className="mr-2"
          aria-label={`Mark "${task.description}" as completed`}
        />
        <span className={task.isCompleted ? 'line-through text-gray-500' : ''}>
          {task.description}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 font-bold px-2"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskRow;
