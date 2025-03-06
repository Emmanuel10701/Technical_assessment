"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaComments, FaRobot, FaCogs, FaTimes, FaPaperPlane } from "react-icons/fa";
import { useTheme } from "../context/themeContext";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchUserProfile(token);
  }, []);

  async function fetchUserProfile(token) {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/", {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status !== 200) {
        localStorage.removeItem("access_token");
        router.push("/login");
        return;
      }
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/login");
    }
    setLoading(false);
  }

  async function sendMessage() {
    if (!message.trim()) return;
    const newMessage = { text: message, sender: "user", timestamp: new Date().toLocaleTimeString() };
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post("http://127.0.0.1:8000/api/chat/send_message/", { message }, {
        headers: { Authorization: `Token ${token}` },
      });
      const aiResponse = { text: response.data.message, sender: "ai", timestamp: new Date().toLocaleTimeString() };
      setChatMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    setUser(null);
    router.push("/login");
  }

  if (loading) return <div className="flex items-center justify-center h-screen text-white text-2xl"><CircularProgress /></div>;

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
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

        <div className="fixed bottom-6 left-6 bg-blue-500 p-4 rounded-full cursor-pointer shadow-lg" onClick={() => setChatOpen(true)}>
          <FaComments className="text-white text-2xl" />
        </div>

        {chatOpen && (
          <div className="fixed bottom-16 left-6 bg-gray-800 text-white p-4 w-80 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <button onClick={() => setChatOpen(false)} className="text-white text-xl"><FaTimes /></button>
              <h3 className="text-lg font-semibold">Chat</h3>
            </div>
            <div className="flex-1 overflow-y-auto max-h-60 space-y-2 p-2">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-right ml-auto" : "bg-gray-700"}`}>
                  <p>{msg.text}</p>
                  <small className="block text-xs text-gray-300">{msg.timestamp}</small>
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-l bg-gray-900 text-white"
              />
              <button onClick={sendMessage} className="bg-blue-500 p-2 rounded-r">
                <FaPaperPlane className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}