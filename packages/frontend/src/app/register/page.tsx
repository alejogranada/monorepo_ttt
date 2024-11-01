'use client';

import { useState, useEffect } from 'react';
import api from "@/api";
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
  statusCode: string;
  error: string;
}

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', { username, password });
      console.log('Usuario registrado:', response.data);
      setSuccess(true);
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const errorMessage = err.response?.data?.message || 'Error al registrar el usuario. Por favor, intenta nuevamente.';
      setError(errorMessage);
      console.error('Error al registrar:', error);
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleConfirm = () => {
    setSuccess(false);
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <h1 className="title">Registro</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <label htmlFor="username" className="label">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password" className="label">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      <p className="register">
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>

      {success && (
        <div className="modal">
          <div className="modalContent">
            <h2>¡Registro Exitoso!</h2>
            <p>Tu cuenta ha sido creada con éxito.</p>
            <button onClick={handleConfirm} className="modalButton">Aceptar</button>
            <button onClick={() => setSuccess(false)} className="modalButton">Registrar otro usuario</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Register;
