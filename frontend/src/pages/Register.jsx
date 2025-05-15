import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    var navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: "student" // Default to student
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (role) => {
        setFormData({ ...formData, role });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5010/user/register", formData).then(response => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    navigate('/login');
                }
            });
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Register</h2>
                
           
                <div className="mt-4 flex justify-center space-x-6">
                    <label className="flex items-center space-x-2">
                        <input 
                            type="radio" 
                            name="role" 
                            value="student" 
                            checked={formData.role === "student"} 
                            onChange={() => handleRoleChange("student")}
                            className="form-radio text-blue-500"
                        />
                        <span className="text-gray-700">Student</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input 
                            type="radio" 
                            name="role" 
                            value="coach" 
                            checked={formData.role === "coach"} 
                            onChange={() => handleRoleChange("coach")}
                            className="form-radio text-blue-500"
                        />
                        <span className="text-gray-700">Coach</span>
                    </label>
                </div>

               
                <form onSubmit={handleRegister} className="space-y-6 mt-6">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
