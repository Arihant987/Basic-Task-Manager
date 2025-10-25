import axios from 'axios';
import { TaskItem } from './types';

const API_URL = 'http://localhost:5000/api/tasks'; // match your backend

export const getTasks = async (): Promise<TaskItem[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTask = async (description: string, isCompleted: boolean): Promise<TaskItem> => {
  const res = await axios.post(API_URL, { description, isCompleted });
  return res.data;
};

export const updateTask = async (task: TaskItem): Promise<void> => {
  await axios.put(`${API_URL}/${task.id}`, task);
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
