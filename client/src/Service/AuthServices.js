import axios from 'axios';

const API_BASE = "https://task-manager-mern-project-production.up.railway.app/api/v1/users"; // ✅ Backend ka sahi URL
// const API_BASE2 = "http://localhost:3000/api/v1/todo";

const RegisterUser = (data) => {
  return axios.post(`${API_BASE}/register`, data);
}
const LoginUser = (data) => {
  return axios.post(`${API_BASE}/login`, data);
}

const AuthService = { RegisterUser, LoginUser };
export default AuthService;
