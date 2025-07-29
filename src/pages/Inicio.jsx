import React, { useState, useEffect } from 'react';
import '../css/estiloInicio.css';
import { registrarVehiculo, obtenerVehiculos } from '../api/conexion';

const Inicio = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [vehiculos, setVehiculos] = useState([]);
    const [mostrarLista, setMostrarLista] = useState(false);

    const [formData, setFormData] = useState({
        placa: '',
        marca: '',
        modelo: '',
        color: '',
        tipoVehiculo: 'automovil',
        propietario: ''
    });

    // 👉 Obtenemos los datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/'; // Ajusta si tu ruta de login es otra
};

    const toggleFormulario = () => {
        setFormularioVisible(!formularioVisible);
        if (formularioVisible) {
            setFormData({
                placa: '',
                marca: '',
                modelo: '',
                color: '',
                tipoVehiculo: 'automovil',
                propietario: ''
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No estás autenticado. Inicia sesión primero.');
                return;
            }
            await registrarVehiculo(formData);
            alert('Vehículo registrado exitosamente!');
            toggleFormulario();
            cargarVehiculos();
        } catch (error) {
            console.error('Error al registrar el vehículo:', error);
            alert('Error al registrar el vehículo. Asegúrate de estar autenticado.');
        }
    };

    const cargarVehiculos = async () => {
        try {
            const data = await obtenerVehiculos();
            setVehiculos(data);
        } catch (error) {
            console.error('Error al cargar vehículos:', error);
            alert('Error al cargar los vehículos. Asegúrate de estar autenticado.');
        }
    };

    const handleMostrarVehiculos = () => {
        setMostrarLista(!mostrarLista);
        if (!mostrarLista) cargarVehiculos();
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="header">
                    <h2>SenaParking</h2>
                    <span className="username">
                        {usuario.nombre ? `${usuario.nombre} (${usuario.rol})` : 'Aprendiz'}
                    </span>
                    <div className="avatar" onClick={toggleMenu}></div>
                </div>

                <button className="btn" onClick={toggleFormulario}>
                    Registrar vehículo nuevo
                </button>
                <button className="btn" onClick={handleMostrarVehiculos}>
                    Vehículos registrados
                </button>
            </div>

            {menuVisible && (
                <div className="menu-hamburguesa">
                    <ul>
                        <li onClick={cerrarSesion} style={{ cursor: 'pointer', color: 'red' }}>Cerrar sesión</li>
                    </ul>
                </div>
            )}

            {formularioVisible && (
                <div className="formulario-overlay">
                    <div className="formulario-container">
                        <div className="formulario-header">
                            <h3>Registrar Nuevo Vehículo</h3>
                            <button className="btn-cerrar" onClick={toggleFormulario}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="formulario-vehiculo">
                            <div className="form-group">
                                <label htmlFor="placa">Placa *</label>
                                <input
                                    type="text"
                                    id="placa"
                                    name="placa"
                                    value={formData.placa}
                                    onChange={handleInputChange}
                                    placeholder="Ej: ABC123"
                                    required
                                    maxLength="7"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="marca">Marca *</label>
                                    <input
                                        type="text"
                                        id="marca"
                                        name="marca"
                                        value={formData.marca}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Toyota"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="modelo">Modelo *</label>
                                    <input
                                        type="text"
                                        id="modelo"
                                        name="modelo"
                                        value={formData.modelo}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Corolla"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="color">Color *</label>
                                    <input
                                        type="text"
                                        id="color"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Blanco"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tipoVehiculo">Tipo de Vehículo *</label>
                                    <select
                                        id="tipoVehiculo"
                                        name="tipoVehiculo"
                                        value={formData.tipoVehiculo}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="automovil">Automóvil</option>
                                        <option value="motocicleta">Motocicleta</option>
                                        <option value="camioneta">Camioneta</option>
                                        <option value="bicicleta">Bicicleta</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="propietario">Propietario *</label>
                                <input
                                    type="text"
                                    id="propietario"
                                    name="propietario"
                                    value={formData.propietario}
                                    onChange={handleInputChange}
                                    placeholder="Nombre completo del propietario"
                                    required
                                />
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="btn-cancelar" onClick={toggleFormulario}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-registrar">
                                    Registrar Vehículo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {mostrarLista && (
                <div className="contenido-principal">
                    <div className="panel-vehiculos">
                        <h3>Vehículos Registrados</h3>
                        {vehiculos.length === 0 ? (
                            <p>No hay vehículos registrados.</p>
                        ) : (
                            <ul>
                                {vehiculos.map((v, i) => (
                                    <li key={i}>
                                        <strong>{v.placa}</strong> - {v.marca} {v.modelo} | {v.color} | {v.tipoVehiculo} | Propietario: {v.propietario}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inicio;
