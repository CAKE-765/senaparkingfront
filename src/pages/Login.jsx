// Login.jsx adaptado para conectarse al backend
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/estiloLogin.css';
import { loginUsuario } from '../api/conexion';

function Login() {
    const [form, setForm] = useState({
        tipoDoc: '',
        documento: '',
        rol: '',
        password: ''
    });


    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
    try {
        const { usuario, token } = await loginUsuario({
            tipoDoc: form.tipoDoc,
            documento: form.documento,
            rol: form.rol,
            password: form.password
        });

        // Guardar usuario y token en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        // Redirigir según rol
        if (usuario.rol === 'vigilante') {
            navigate('/vigilante');
        } else {
            navigate('/Inicio');
        }

    } catch (error) {
        alert('Credenciales inválidas o error de conexión.');
    }
};


    const handleRegister = () => {
        navigate('/Registro');
    };

    return (
        <div className="login-wrapper">
            <div className="bg-login-container">
                <h1 className="neon-title">SenaParking</h1>

                <label className="label">Tipo de documento</label>
                <select
                    name="tipoDoc"
                    value={form.tipoDoc}
                    onChange={handleChange}
                    className="input"
                >
                    <option value="">Seleccionar tipo</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="DNI">Documento nacional</option>
                </select>

                <label className="label">Número de documento</label>
                <input
                    type="text"
                    name="documento"
                    value={form.documento}
                    onChange={handleChange}
                    className="input"
                    placeholder="Ej: 1234567890"
                />

                <label className="label">Rol</label>
                <select
                    name="rol"
                    value={form.rol}
                    onChange={handleChange}
                    className="input"
                >
                    <option value="">Seleccionar rol</option>
                    <option value="aprendiz">Aprendiz</option>
                    <option value="instructor">Instructor</option>
                    <option value="vigilante">Vigilante</option>
                </select>

                <label className="label">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="input"
                    placeholder="Contraseña segura"
                />

                <button onClick={handleLogin} className="btn-login">
                    Inicia sesión
                </button>

                <div className="text-center mt-4">
                    <span className="text-light">¿Ya tienes cuenta?</span>
                    <button onClick={handleRegister} className="text-green-400">
                        Registrar cuenta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
