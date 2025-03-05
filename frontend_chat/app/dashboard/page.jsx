"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaComments, FaRobot, FaCogs } from "react-icons/fa";
import NavBar from "../components/NavBar"; // Ensure the correct import path
import { useTheme } from "../context/themeContext";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiMessage, setAiMessage] = useState("");
  const [tokens, setTokens] = useState(0);
  const router = useRouter();
  const { theme } = useTheme(); // Use dynamic theme

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login"); // Redirect to official login page
      return;
    }
    fetchUserProfile(token);
  }, []);

  async function fetchUserProfile(token) {
    try {
      const response = await axios.get("http://localhost:8000/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        localStorage.removeItem("access_token");
        router.push("/login"); // Redirect if authentication fails
        return;
      }

      setUser(response.data);
      setTokens(response.data.tokens);
      generateAiResponse(token);
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/login");
    }
    setLoading(false);
  }

  async function generateAiResponse(token) {
    try {
      const response = await axios.post("http://localhost:8000/api/chat/", {
        message: "Hello AI!",
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAiMessage(response.data.response);
      setTokens(response.data.remaining_tokens);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    setUser(null);
    router.push("/login");
  }

  if (loading) return <div className="flex items-center justify-center h-screen text-white text-2xl">Loading...</div>;

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      <NavBar />
      <div className="flex flex-col items-center p-6 pt-20">
        <header className="w-full max-w-4xl flex justify-between items-center p-4 shadow-md rounded-lg">
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
          <h2 className="text-xl font-semibold">Welcome, {user?.username}!</h2>
          <p className="text-gray-400">Chat with our AI assistant and explore intelligent conversations.</p>
          <p className="text-gray-400 mt-2">Token Balance: {tokens}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-4xl">
          <div className={`p-6 rounded-lg shadow-md flex items-center space-x-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
            <FaComments className="text-4xl text-blue-400" />
            <div>
              <h3 className="text-lg font-bold">AI Conversations</h3>
              <p className="text-gray-400">Engage in real-time chat with AI.</p>
              <p className="text-gray-300 mt-2">AI Response: {aiMessage}</p>
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-md flex items-center space-x-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
            <FaRobot className="text-4xl text-green-400" />
            <div>
              <h3 className="text-lg font-bold">AI Features</h3>
              <p className="text-gray-400">Explore AI-driven suggestions and automation.</p>
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-md flex items-center space-x-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
            <FaCogs className="text-4xl text-yellow-400" />
            <div>
              <h3 className="text-lg font-bold">AI Settings</h3>
              <p className="text-gray-400">Customize your AI chat experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
