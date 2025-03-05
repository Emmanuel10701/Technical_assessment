
"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaComments, FaRobot, FaCogs } from "react-icons/fa";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen text-white text-2xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-3xl" />
          <h1 className="text-2xl font-bold">AI Chat Dashboard</h1>
        </div>
        <button 
          onClick={() => signOut()}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </header>
      
      <div className="w-full max-w-4xl mt-6">
        <h2 className="text-xl font-semibold">Welcome, {session?.user?.name}!</h2>
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
