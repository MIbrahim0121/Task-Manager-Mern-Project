// import axios from "axios";

// const token = localStorage.getItem("token");
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// const API_BASE = "http://localhost:3000/api/v1/todo";

// const createTodo = (data) => axios.post(`${API_BASE}/create`, data);
// const getTodo = (id) => axios.get(`${API_BASE}/getAll/${id}`);
// const deleteTodo = (id) => axios.delete(`${API_BASE}/delete/${id}`);
// const updateTodo = (id, data) => axios.patch(`${API_BASE}/update/${id}`, data);

// const todoService = { createTodo, getTodo, deleteTodo, updateTodo };
// export default todoService;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Service/todoService.js
import axios from "axios";

const API_BASE = "http://localhost:3000/api/v1/todo";

// Create axios instance
const axiosInstance = axios.create();

// Intercept every request to add token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // <-- yahan sirf "token"
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
const createTodo = (data) => axiosInstance.post(`${API_BASE}/create`, data);
const getTodo = (id) => axiosInstance.get(`${API_BASE}/getAll/${id}`);
const deleteTodo = (id) => axiosInstance.delete(`${API_BASE}/delete/${id}`);
const updateTodo = (id, data) => axiosInstance.patch(`${API_BASE}/update/${id}`, data);

const todoService = { createTodo, getTodo, deleteTodo, updateTodo };
export default todoService;
