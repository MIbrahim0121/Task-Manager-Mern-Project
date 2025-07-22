import React from 'react'
import { FaHouseUser } from "react-icons/fa6";
import { useState } from 'react';
import {  NavLink ,useNavigate} from 'react-router-dom';
import AuthService from '../../Service/AuthServices';

const Register = () => {
 const [email, setemail] = useState("")
 const [password, setpassword] = useState("")
 const [username, setusername] = useState("")
 const Navigate = useNavigate();

  const handlereg = async (e) => {
  e.preventDefault();
  try {
    const data = { email, password, username };
    const res = await AuthService.RegisterUser(data);
    console.log(res.data);
    alert("Registration Success!");
    Navigate("/login"); // Redirect to login after successful registration
  } catch (error) {
    alert("Registration Failed: " + (error.response?.data?.message || error.message));
    console.error("Registration error:", error);
  }
}
 
   return (
     <div>
 <form 
   action="" 
   className="max-w-md mx-auto mt-32 p-8 bg-white rounded-2xl shadow-xl border border-gray-200 space-y-6 text-gray-800"
 >
   <div className="flex justify-center mb-4 text-blue-600 text-5xl">
     <FaHouseUser />
   </div>
 
   <div>
     <label className="block text-lg font-semibold mb-2">
       username:
     </label>
     <input 
       type="text" 
       name="username" 
       value={username} 
       onChange={(e) => setusername(e.target.value)}
       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
     />
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
   <p>already have an account <NavLink className='text-blue-500' to='/login'>Login</NavLink> </p>
 
   <div>
     <button 
       onClick={handlereg} 
       className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
     >
       Register
     </button>
   </div>
 
   <br />
 </form>
 </div>
  )
}

export default Register