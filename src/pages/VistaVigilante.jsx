// VistaVigilante.jsx corregido y funcional con búsqueda por documento
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  obtenerUsuariosVehiculos,
  buscarUsuarioPorDocumento
} from '../api/conexion';
import '../css/estiloVigilante.css';

const VistaVigilante = () => {
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [usuarioBuscado, setUsuarioBuscado] = useState(null);
  const [errorBusqueda, setErrorBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuariosConVehiculos = await obtenerUsuariosVehiculos();
        setDatos(usuariosConVehiculos);
      } catch (error) {
        console.error('Error cargando usuarios con vehículos:', error);
      }
    };
    cargarDatos();
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleBuscar = async () => {
    try {
      const resultado = await buscarUsuarioPorDocumento(busqueda);
      setUsuarioBuscado(resultado);
      setErrorBusqueda('');
    } catch (error) {
      setUsuarioBuscado(null);
      setErrorBusqueda('Usuario no encontrado o sin vehículos registrados');
    }
  };

  return (
    <div className="vista-vigilante">
      <div className="header-vigilante">
        <div className="vista-vigilante-p1">
          <div className="vista-vigilante-titulo">
            <h2 className="titulo">👮 Vista Vigilante</h2>
          </div>
          <div className="vista-vigilante-boton">
            <button className="btn-cerrar-sesion" onClick={handleCerrarSesion}>Cerrar sesión</button>
          </div>
        </div>

        <div className="busqueda-contenedor">
          <input
            type="text"
            className="input-busqueda"
            placeholder="Buscar por documento"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn-buscar" onClick={handleBuscar}>Buscar</button>
          {errorBusqueda && <span className="mensaje-error">{errorBusqueda}</span>}
        </div>
      </div>

      <div className="vista-vigilante-p2">
        {usuarioBuscado ? (
          <div className="resultado-busqueda">
            <p><strong>{usuarioBuscado.nombre}</strong> ({usuarioBuscado.rol}) - {usuarioBuscado.correo}</p>
            <h4>Vehículos Registrados</h4>
            <ul className="lista-vehiculos">
              {usuarioBuscado.vehiculos.length === 0 ? (
                <li className="vehiculo-item">Sin vehículos registrados</li>
              ) : (
                usuarioBuscado.vehiculos.map((v, idx) => (
                  <li key={idx} className="vehiculo-item">
                    🚗 <strong>{v.placa}</strong> - {v.marca} {v.modelo} | {v.color} | {v.tipoVehiculo}
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : (
          datos.length === 0 ? (
            <p className="mensaje-vacio">No hay datos disponibles.</p>
          ) : (
            <ul className="lista-usuarios">
              {datos.map((usuario) => (
                <li key={usuario.id} className="usuario-item">
                  <strong>{usuario.nombre}</strong> ({usuario.rol}) - {usuario.correo}
                  <ul className="lista-vehiculos">
                    {usuario.vehiculos.length === 0 ? (
                      <li className="vehiculo-item">Sin vehículos registrados</li>
                    ) : (
                      usuario.vehiculos.map((v, idx) => (
                        <li key={idx} className="vehiculo-item">
                          🚗 <strong>{v.placa}</strong> - {v.marca} {v.modelo} ({v.color}, {v.tipoVehiculo})
                        </li>
                      ))
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default VistaVigilante;