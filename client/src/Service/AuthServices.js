import axios from 'axios';

const API_BASE = "http://localhost:3000/api/v1/users"; // ✅ Backend ka sahi URL

const RegisterUser = (data) => {
  return axios.post(`${API_BASE}/register`, data);
}
const LoginUser = (data) => {
  return axios.post(`${API_BASE}/login`, data);
}

const AuthService = { RegisterUser, LoginUser };
export default AuthService;
