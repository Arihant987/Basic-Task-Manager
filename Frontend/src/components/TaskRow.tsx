import React, { useState } from 'react';
import { TaskItem } from '../types';

interface Props {
  task: TaskItem;
  onToggle: (task: TaskItem) => void;
  onDelete: (id: string) => void;
  onUpdate?: (task: TaskItem) => void;
}

const TaskRow: React.FC<Props> = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.description);

  const handleSave = () => {
    if (editText.trim() && editText !== task.description) {
      if (onUpdate) {
        onUpdate({ ...task, description: editText.trim() });
      }
      setIsEditing(false);
    } else {
      setEditText(task.description);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.description);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100 group">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 flex-1 min-w-0">
        {!isEditing ? (
          <label htmlFor={`task-${task.id}`} className="flex items-center space-x-3 flex-1 min-w-0">
            <input
              id={`task-${task.id}`}
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => onToggle(task)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-400 cursor-pointer flex-shrink-0"
              aria-label={`Mark "${task.description}" as ${task.isCompleted ? 'incomplete' : 'completed'}`}
              title={`Mark "${task.description}" as ${task.isCompleted ? 'incomplete' : 'completed'}`}
            />
            <span className={`${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800 font-medium'} break-words`}>
              {task.description}
            </span>
          </label>
        ) : (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            className="flex-1 px-3 py-2 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
        )}

        {!isEditing && (
          <span className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
            task.isCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {task.isCompleted ? 'Completed' : 'Active'}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2 ml-4">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Edit task"
            title="Edit task"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-400 hover:text-red-600 transition-colors"
          aria-label="Delete task"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskRow;