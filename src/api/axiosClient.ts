import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Interceptor para inyectar el token en cada petición
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para limpiar la respuesta o manejar errores
client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    throw new Error(error.response?.data?.message ?? "Error en la petición");
  }
);

export default client;
