import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const API_BASE = "http://localhost:3000/api/v1/todo";

const createTodo = (data) => axios.post(`${API_BASE}/create`, data);
const getTodo = (id) => axios.get(`${API_BASE}/getAll/${id}`);
const deleteTodo = (id) => axios.delete(`${API_BASE}/delete/${id}`);
const updateTodo = (id, data) => axios.patch(`${API_BASE}/update/${id}`, data);

const todoService = { createTodo, getTodo, deleteTodo, updateTodo };
export default todoService;
