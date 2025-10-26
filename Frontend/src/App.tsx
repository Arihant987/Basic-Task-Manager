import React, { useState, useEffect } from 'react';
import { TaskItem } from './types';
import { getTasks, addTask, updateTask, deleteTask } from './api';
import TaskRow from './components/TaskRow';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 4000);
  };

  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      showError('Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!description.trim()) {
      showError('Please enter a task description');
      return;
    }

    try {
      const added = await addTask(description, isCompleted);
      setTasks(prev => [...prev, added]);
      setDescription('');
      setIsCompleted(false);
      showSuccess('Task added successfully');
    } catch (error) {
      showError('Failed to add task. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleUpdate = async (updatedTask: TaskItem) => {
    try {
      await updateTask(updatedTask);
      setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      showSuccess('Task updated successfully');
    } catch (error) {
      showError('Failed to update task. Please try again.');
    }
  };

  const handleToggle = async (task: TaskItem) => {
    const updated = { ...task, isCompleted: !task.isCompleted };
    try {
      await updateTask(updated);
      setTasks(prev => prev.map(t => (t.id === task.id ? updated : t)));
      showSuccess(updated.isCompleted ? 'Task marked as completed' : 'Task marked as active');
    } catch (error) {
      showError('Failed to update task. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      showSuccess('Task deleted successfully');
    } catch (error) {
      showError('Failed to delete task. Please try again.');
    }
  };

  const handleClearCompleted = async () => {
    const completedTasks = tasks.filter(t => t.isCompleted);
    if (completedTasks.length === 0) {
      showError('No completed tasks to clear');
      return;
    }

    try {
      await Promise.all(completedTasks.map(t => deleteTask(t.id)));
      setTasks(prev => prev.filter(t => !t.isCompleted));
      showSuccess(`Cleared ${completedTasks.length} completed task${completedTasks.length > 1 ? 's' : ''}`);
    } catch (error) {
      showError('Failed to clear completed tasks. Please try again.');
    }
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  // Task statistics
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(t => !t.isCompleted).length;
  const completedTasks = tasks.filter(t => t.isCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center p-4 sm:p-6">
      {/* Notifications */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in-right max-w-md">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in-right max-w-md">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="text-center mb-8 mt-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Task Manager
        </h1>
        <p className="text-gray-600 text-lg">Stay organized and productive</p>
      </header>

      {/* Statistics */}
      {totalTasks > 0 && (
        <div className="w-full max-w-lg mb-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-gray-800">{totalTasks}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-yellow-600">{activeTasks}</div>
            <div className="text-sm text-gray-500">Active</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
        </div>
      )}

      {/* Add Task Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg mb-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="What needs to be done?"
            className="p-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            autoFocus
          />
          <label className="flex items-center space-x-3 text-gray-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={e => setIsCompleted(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            />
            <span className="text-sm">Mark as completed</span>
          </label>
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all text-white font-semibold p-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-lg mb-4">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-between items-center">
          <div className="flex gap-2">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-5 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  filter === f
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          {completedTasks > 0 && (
            <button
              onClick={handleClearCompleted}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-sm text-sm"
            >
              Clear Completed
            </button>
          )}
        </div>
      </div>

      {/* Task List */}
      <div className="w-full max-w-lg space-y-3">
        {loading ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              <p className="text-gray-600">Loading tasks...</p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
            </h3>
            <p className="text-gray-500">
              {filter === 'all'
                ? 'Start by adding your first task above'
                : `You have no ${filter} tasks at the moment`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <TaskRow
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
