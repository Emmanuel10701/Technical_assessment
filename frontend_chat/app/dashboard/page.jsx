"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaUserCircle, FaSignOutAlt, FaComments, FaRobot, FaCogs } from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchUserProfile(token) {
    try {
      const response = await fetch("http://localhost:8000/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        localStorage.removeItem("access_token");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
    setLoading(false);
  }

  async function loginUser(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      fetchUserProfile(data.access);
    } catch (error) {
      alert("Invalid credentials");
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    setUser(null);
  }

  if (loading) return <div className="flex items-center justify-center h-screen text-white text-2xl">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <form onSubmit={loginUser} className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-3xl" />
          <h1 className="text-2xl font-bold">AI Chat Dashboard</h1>
        </div>
        <button onClick={logout} className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </header>

      <div className="w-full max-w-4xl mt-6">
        <h2 className="text-xl font-semibold">Welcome, {user.username}!</h2>
        <p className="text-gray-400">Chat with our AI assistant and explore intelligent conversations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaComments className="text-4xl text-blue-400" />
          <div>
            <h3 className="text-lg font-bold">AI Conversations</h3>
            <p className="text-gray-400">Engage in real-time chat with AI.</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaRobot className="text-4xl text-green-400" />
          <div>
            <h3 className="text-lg font-bold">AI Features</h3>
            <p className="text-gray-400">Explore AI-driven suggestions and automation.</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaCogs className="text-4xl text-yellow-400" />
          <div>
            <h3 className="text-lg font-bold">AI Settings</h3>
            <p className="text-gray-400">Customize your AI chat experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
