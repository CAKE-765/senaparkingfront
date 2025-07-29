// 📦 Conexión Front-End React al Back-End (SenaParking)
// Asegúrate de tener axios instalado: npm install axios
import axios from 'axios';

// ✅ Config base para usar en todos los requests
const API = axios.create({
    baseURL: 'http://localhost:3001/api', // Cambia si usas otro puerto o hosting
});

// 💥 Añadir token automáticamente si existe
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// ------------------
// 📌 Registro usuario
export const registrarUsuario = async (datos) => {
    const res = await API.post('/auth/registro', datos);
    return res.data;
};

// 📌 Login usuario
export const loginUsuario = async (datos) => {
    try {
        const res = await API.post('/auth/login', datos);
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
        }
        return res.data;
    } catch (error) {
        console.error('⚠️ Error al iniciar sesión: ', error.response?.data || error.message);
        throw error;
    }
};



/// 📌 Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
};

// 📌 Registro de vehículo
export const registrarVehiculo = async (datosVehiculo) => {
    const res = await API.post('/vehiculos/registrar', datosVehiculo);
    return res.data;
};

// 📌 Obtener vehículos (de todos o del usuario actual según endpoint)
export const obtenerVehiculos = async () => {
    const res = await API.get('/vehiculos/listar');
    return res.data;
};

// 📌 Obtener todos los usuarios con sus vehículos (para vigilante)
export const obtenerUsuariosVehiculos = async () => {
    const res = await API.get('/vigilante/usuarios-vehiculos');
    return res.data;
};

// 📌 Buscar usuario por documento (para vigilante)
export const buscarUsuarioPorDocumento = async (documento) => {
    const res = await API.get(`/vigilante/buscar/${documento}`);
    return res.data;
};