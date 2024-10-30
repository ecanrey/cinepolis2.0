import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('usuario');
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/authenticate', { email, password });
            if (response.data.success) {
                navigate('/home');
            } else {
                setMessage('Credenciales incorrectas');
            }
        } catch (error) {
            setMessage('Error al iniciar sesión');
            console.error(error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', { email, password, role });
            if (response.data.success) {
                setMessage('Registro exitoso');
                setIsRegistering(false);
            } else {
                setMessage('Error en el registro');
            }
        } catch (error) {
            setMessage('Error al registrar');
            console.error(error);
        }
    };

    return (
        <div div className="login-container">
            <div className="form-container">
            <img src="/imagenes/Logo.png" alt="Logo Cinepolis 2" style={{ width: '300px', height: 'auto' }} />
                {message && <p className="message">{message}</p>}
                {isRegistering ? (
                    <form onSubmit={handleRegister}>
                        <h2>Registrarse</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="usuario">Usuario</option>
                            <option value="administrador">Administrador</option>
                        </select>
                        <button type="submit">Registrarse</button>
                        <button type="button" onClick={() => setIsRegistering(false)}>
                            ¿Ya tienes una cuenta? Inicia sesión
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Iniciar sesión</button>
                        <button type="button" onClick={() => setIsRegistering(true)}>
                            ¿No tienes cuenta? Regístrate
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
