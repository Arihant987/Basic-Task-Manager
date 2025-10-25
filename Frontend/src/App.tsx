import React, { useState, useEffect } from 'react';
import { TaskItem } from './types';
import { getTasks, addTask, updateTask, deleteTask } from './api';
import TaskRow from './components/TaskRow';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!description.trim()) return;

    try {
      const added = await addTask(description, isCompleted);
      setTasks(prev => [...prev, added]);
      setDescription('');
      setIsCompleted(false);
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const handleToggle = async (task: TaskItem) => {
    const updated = { ...task, isCompleted: !task.isCompleted };
    try {
      await updateTask(updated);
      setTasks(prev => prev.map(t => (t.id === task.id ? updated : t)));
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

      <div className="flex flex-col mb-4 space-y-2">
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Task description"
          className="p-2 rounded border border-gray-300"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={e => setIsCompleted(e.target.checked)}
          />
          <span>Is Completed?</span>
        </label>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add
        </button>
      </div>

      <div>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet</p>
        ) : (
          tasks.map(task => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
