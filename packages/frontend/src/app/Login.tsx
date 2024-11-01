// src/app/Login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../api';
import { AxiosError } from 'axios';
import "./globals.css";

interface ErrorResponse {
  message: string;
  statusCode: string;
  error: string;
}

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Mensaje de error
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Activar estado de carga

    // Validaciones adicionales
    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');    
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      const { accessToken } = response.data;

      // Verificar si el token está presente
      console.log('Token recibido:', accessToken);

      // Almacena el token en sessionStorage para que solo persista durante la sesión actual
      sessionStorage.setItem('token', accessToken);

      // Redirigir a la página de tareas
      router.push('/tasks');
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response && axiosError.response.data) {
        const errorData = axiosError.response.data as ErrorResponse;
        setError(errorData.message); // Mostrar el mensaje de error recibido
      } else {
        setError('Error al iniciar sesión. Por favor, verifica tus credenciales.'); // Mensaje genérico
      }
      
      setTimeout(() => {
        setError('');
      }, 2500);

    } finally {
      setLoading(false); // Desactivar estado de carga después de la solicitud
    }
  };

  return (
    <div className="container">
      <h1 className="title">Iniciar Sesión</h1>
      {error && (
        <div className="errorContainer">
          <p className="error">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} onReset={() => setError('')} className="form">
        <div className="inputGroup">
          <label htmlFor="username" className="label">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
            autoComplete="username" // Añadido para autocompletar
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password" className="label">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
            autoComplete="current-password" // Añadido para autocompletar
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <p className="register">
        ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
      </p>
      <footer className="footer">
        <p>Fecha de consulta: {new Date().toLocaleDateString()}</p>
        <p>Elaborado por Alejandro Granada</p>
      </footer>
    </div>
  );
};

export default Login;
