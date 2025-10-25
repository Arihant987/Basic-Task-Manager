import React, { useState, useEffect } from 'react';
import { TaskItem } from './types';
import { getTasks, addTask, updateTask, deleteTask } from './api';
import TaskRow from './components/TaskRow';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

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

  // Filtered tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2"> Task Manager</h1>
        <p className="text-gray-600 text-lg">Organize your tasks like a pro!</p>
      </header>

      {/* Add Task Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg mb-6">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter task description..."
            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
          />
          <label className="flex items-center space-x-3 text-gray-700 font-medium">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={e => setIsCompleted(e.target.checked)}
              className="w-6 h-6 text-indigo-500 rounded focus:ring-2 focus:ring-indigo-400"
            />
            <span>Mark as Completed</span>
          </label>
          <button
            onClick={handleAdd}
            className="bg-indigo-500 hover:bg-indigo-600 transition text-white font-bold p-3 rounded-xl shadow-md hover:shadow-lg"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex space-x-4 mb-6">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full font-medium transition
              ${filter === f ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="w-full max-w-lg space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center italic py-6 bg-white rounded-2xl shadow-md">
            No tasks here. Add your first task! ✨
          </p>
        ) : (
          filteredTasks.map(task => (
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
