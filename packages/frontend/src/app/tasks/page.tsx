// src/app/tasks/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../api';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate?: string;
}

interface DecodedToken {
  exp: number;
  username: string;
}

const taskStatusLabels: { [key: string]: string } = {
  pendiente: 'Pendiente',
  en_progreso: 'En Progreso',
  completada: 'Completada',
};

const TasksPage = () => {
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);
  const [tokenUserName, setTokenUserName] = useState<string | null>(null);
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState<{ title: string; description: string; status: string; dueDate?: string }>({
    title: '',
    description: '',
    status: 'pendiente',
    dueDate: '',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskLimit, setTaskLimit] = useState(5);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now();
      if (decodedToken.exp * 1000 < currentTime) {
        sessionStorage.removeItem('token');
        router.push('/login');
      } else {
        setTokenExpiration(decodedToken.exp * 1000);
        setTokenUserName(decodedToken.username);
        fetchTasks();
      }
    }
  }, [router]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch {
      setError('Error al cargar las tareas.');
    }
  };

  const handleAddTask = async () => {
    try {
      await api.post('/tasks', newTask);
      setError('');
      setNewTask({ title: '', description: '', status: 'pendiente', dueDate: '' });
      fetchTasks();
    } catch {
      setError('Error al agregar la tarea.');
    }
  };

  const handleEditChange = (field: string, value: string) => {
    if (editingTask) {
      setEditingTask({
        ...editingTask,
        [field]: value,
      });
    }
  };

  const handleEditTask = async () => {
    if (!editingTask) return;
    try {
      await api.put(`/tasks/${editingTask.id}`, editingTask);
      setEditingTask(null);
      setNewTask({ title: '', description: '', status: 'pendiente', dueDate: '' });
      fetchTasks();
    } catch {
      setError('Error al editar la tarea.');
    }
  };

  const prepareEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId: number) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
    if (confirmDelete) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch {
        setError('Error al eliminar la tarea.');
      }
    }
  };

  const groupedTasks = tasks.reduce((acc: { [key: string]: Task[] }, task: Task) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, {} as { [key: string]: Task[] });
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Tareas</h1>
      {tokenExpiration && (
        <p>
          Bienvenido <strong>{tokenUserName}</strong>, su sesión expira: {new Date(tokenExpiration).toLocaleString()}
        </p>
      )}
      <button onClick={() => { sessionStorage.removeItem('token'); router.push('/login'); }} style={{ color: 'blue', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', padding: '0' }}>
        Cerrar sesión
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {Object.keys(groupedTasks).length === 0 || Object.values(groupedTasks).every((tasks) => (tasks as Task[]).length === 0) ? (
        <p>No tienes tareas aún.</p>
      ) : (
        Object.keys(groupedTasks).map((status) => (
          <div key={status}>
            <h2>{taskStatusLabels[status] || status}</h2>
              <ul>
                {groupedTasks[status].slice(0, taskLimit).map((task: Task) => (
                  <li key={task.id} style={{ marginBottom: '10px', position: 'relative' }}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    {task.dueDate && <p>Fecha de vencimiento: {new Date(task.dueDate).toLocaleDateString()}</p>}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={{ right: '40px', top: '0', background: 'none', border: 'none', cursor: 'pointer' }}
                      title="Eliminar tarea"
                    >
                      <FontAwesomeIcon icon={faTrash} style={{ color: 'red', width: '20px', height: '20px' }} />
                    </button>
                    <button
                      onClick={() => prepareEditTask(task)}
                      style={{ right: '0', top: '0', background: 'none', border: 'none', cursor: 'pointer' }}
                      title="Editar tarea"
                    >
                      <FontAwesomeIcon icon={faEdit} style={{ color: 'blue', width: '20px', height: '20px' }} />
                    </button>
                  </li>
                ))}
                {groupedTasks[status].length > taskLimit && (
                  <button onClick={() => setTaskLimit(prev => prev + 5)}>
                    Ver Más
                  </button>
                )}
              </ul>
          </div>
        ))
      )}

      {!editingTask && ( // Solo muestra la sección de agregar tarea si no se está editando
        <>
          <h2>Agregar Tarea</h2>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', width: '300px' }}>
            <input
              type="text"
              placeholder="Título"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
              style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <textarea
              placeholder="Descripción"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
              style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '60px', resize: 'vertical' }}
            />
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
            <input
              type="date"
              value={newTask.dueDate ? newTask.dueDate.substring(0, 10) : ''}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={handleAddTask} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>
              Agregar
            </button>
          </div>
        </>
      )}

      {editingTask && ( // Mostrar sección de editar tarea
        <>
          <h2>Editar Tarea</h2>
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', width: '300px' }}>
            <input
              type="text"
              placeholder="Título"
              value={editingTask.title}
              onChange={(e) => handleEditChange('title', e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <textarea
              placeholder="Descripción"
              value={editingTask.description}
              onChange={(e) => handleEditChange('description', e.target.value)}
              required
              style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '60px', resize: 'vertical' }}
            />
            <select
              value={editingTask.status}
              onChange={(e) => handleEditChange('status', e.target.value)}
              style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
            <input
              type="date"
              value={editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : ''}
              onChange={(e) => handleEditChange('dueDate', e.target.value)}
              style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={handleEditTask} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
              Guardar Cambios
            </button>
            <button onClick={handleCancelEdit} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer', marginTop: '10px' }}>
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TasksPage;
