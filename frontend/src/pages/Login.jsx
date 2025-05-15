import axios from "axios";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    var navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5010/user/login", { email, password }).then(response => {
            if (response.data.token) {
                let token = response.data.token;
                const user = jwtDecode(token);

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard");
            }else{
                alert("Invalid credentials")
            }
        });
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-700 text-center">Login</h2>

                <form onSubmit={handleLogin} className="space-y-6 mt-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
