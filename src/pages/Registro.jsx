import React, { useState } from 'react';
import '../css/estiloRegistro.css';
import { registrarUsuario } from '../api/conexion';
import { useNavigate } from 'react-router-dom';

function Registro() {
    const [form, setForm] = useState({
        nombre: '',
        tipoDoc: '',
        documento: '',
        correo: '',
        rol: '',
        password: '',
        confirmarPassword: '',
        ficha: '',
        centro: '',
        codigoVerificacion: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmarPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Validaciones por rol
        if (!form.rol) {
            alert('Debes seleccionar un rol');
            return;
        }

        if (form.rol === 'aprendiz' && (!form.ficha || !form.centro)) {
            alert('Los aprendices deben ingresar ficha y centro');
            return;
        }

        if ((form.rol === 'instructor' || form.rol === 'vigilante') && !form.codigoVerificacion) {
            alert(`El rol ${form.rol} requiere un código de verificación`);
            return;
        }

        try {
            await registrarUsuario(form);
            alert('Usuario registrado con éxito');
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.msg || 'Error al registrar. Verifica los datos.');
        }
    };

    return (
        <div className="registro-wrapper">
            <form className="registro-container" onSubmit={handleSubmit}>
                <h1 className="neon-title">Registrar Usuario</h1>

                <label className="label">Nombre completo</label>
                <input
                    type="text"
                    name="nombre"
                    className="input"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                />

                <label className="label">Tipo de documento</label>
                <select
                    name="tipoDoc"
                    className="input"
                    value={form.tipoDoc}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar tipo</option>
                    <option value="CC">Cédula</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="DNI">Documento Nacional</option>
                </select>

                <label className="label">Número de documento</label>
                <input
                    type="text"
                    name="documento"
                    className="input"
                    value={form.documento}
                    onChange={handleChange}
                    placeholder="Ej: 1234567890"
                    required
                />

                <label className="label">Correo electrónico</label>
                <input
                    type="email"
                    name="correo"
                    className="input"
                    value={form.correo}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    required
                />

                <label className="label">Rol</label>
                <select
                    name="rol"
                    className="input"
                    value={form.rol}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar rol</option>
                    <option value="aprendiz">Aprendiz</option>
                    <option value="instructor">Instructor</option>
                    <option value="vigilante">Vigilante</option>
                </select>

                {form.rol === 'aprendiz' && (
                    <>
                        <label className="label">Ficha</label>
                        <input
                            type="text"
                            name="ficha"
                            className="input"
                            value={form.ficha}
                            onChange={handleChange}
                            placeholder="Número de ficha"
                            required
                        />

                        <label className="label">Centro de formación</label>
                        <input
                            type="text"
                            name="centro"
                            className="input"
                            value={form.centro}
                            onChange={handleChange}
                            placeholder="Nombre del centro"
                            required
                        />
                    </>
                )}

                {['instructor', 'vigilante'].includes(form.rol) && (
                    <>
                        {form.rol === 'instructor' && (
                            <>
                                <label className="label">Centro de formación</label>
                                <input
                                    type="text"
                                    name="centro"
                                    className="input"
                                    value={form.centro}
                                    onChange={handleChange}
                                    placeholder="Nombre del centro"
                                    required
                                />
                            </>
                        )}

                        <label className="label">Código de verificación</label>
                        <input
                            type="text"
                            name="codigoVerificacion"
                            className="input"
                            value={form.codigoVerificacion}
                            onChange={handleChange}
                            placeholder="Código especial otorgado por el administrador"
                            required
                        />
                    </>
                )}

                <label className="label">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    className="input"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Crea una contraseña"
                    required
                />

                <label className="label">Confirmar contraseña</label>
                <input
                    type="password"
                    name="confirmarPassword"
                    className="input"
                    value={form.confirmarPassword}
                    onChange={handleChange}
                    placeholder="Confirma la contraseña"
                    required
                />

                <button type="submit" className="btn-submit">
                    Crear cuenta
                </button>
            </form>
        </div>
    );
}

export default Registro;
