import React from 'react'
import { NavLink } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-400  px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center space-y-8 relative z-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
        <p className="text-gray-500 text-lg">Choose your action below</p>
        
        <div className="flex justify-center gap-6">
          <NavLink
            to="/register"
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:from-blue-500 hover:to-green-400 transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl shadow-md hover:from-red-500 hover:to-pink-500 transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Login
          </NavLink>
        </div>
      </div>

      {/* Optional: glowing background effect */}
      <div className="absolute w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse z-0"></div>
    </div>
  )
}

export default Landing
