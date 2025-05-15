import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-lg bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Getting Started</h1>
        
        <p className="text-gray-600 mb-6">Below are credentials for testing the application. Feel free to register and create more accounts.</p>

        <div className="bg-gray-100 p-4 rounded-md shadow-sm text-left mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Student Credentials:</h2>
          <p>📧 Email: <span className="font-mono text-blue-600">johndoe@gmail.com</span></p>
          <p>🔑 Password: <span className="font-mono text-blue-600">Password123</span></p>
          
          <h2 className="text-lg font-semibold text-gray-700 mt-4">Coach Credentials:</h2>
          <p>📧 Email: <span className="font-mono text-blue-600">bobsmith@gmail.com</span></p>
          <p>🔑 Password: <span className="font-mono text-blue-600">Password123</span></p>
        </div>


        <div className="flex space-x-4">
          <Link to="/login" className="px-6 py-2  rounded-md shadow hover:bg-blue-700 transition">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2  rounded-md shadow hover:bg-green-700 transition">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
