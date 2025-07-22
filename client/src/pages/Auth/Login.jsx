import React, { useState } from 'react'
import { FaHouseUser } from "react-icons/fa6";
import { Navigate, NavLink ,useNavigate } from 'react-router-dom';
import AuthService from '../../Service/AuthServices';
import { toast } from 'react-toastify';



const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const Navigate = useNavigate();

  const handleclick = async (e) => {
  try {
    e.preventDefault();

    const data = { email, password };
    const res = await AuthService.LoginUser(data);
     localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    toast.success("Login successful", {
  position: "top-center",
  autoClose: 1000, // 2 seconds
  theme: "light"
});
    console.log(res.data);
    Navigate("/home"); // Redirect to home after successful login
  } catch (error) {
    toast.error("Login failed. Please check your credentials.", {
  position: "top-center",
  autoClose: 1000, // 2 seconds
  theme: "light"
});
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials.");
    
  }
  }

  return (
    <div>
      <form 
       
        className="max-w-md mx-auto mt-32 p-8 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-6 text-gray-800"
      >
        <div className="flex justify-center mb-4 text-blue-600 text-5xl">
          <FaHouseUser />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">
            email:
          </label>
          <input 
            type="email" 
            name="email" 
            value={email} 
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">
            password:
          </label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <p className='text-center font-bold'>
          don't have an account :
          <NavLink className='text-blue-500' to='/register'> click here to register</NavLink>
        </p>
        <div>
          <button  onClick={handleclick}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </div>
        <br />
      </form>
    </div>
  )
}

export default Login