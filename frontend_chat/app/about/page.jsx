"use client";
import { FaRobot, FaCommentDots, FaRocket, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "../../app/context/themeContext";

const About = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <>
      <div
        className={`py-16 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-blue-100"}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h1
              className={`text-3xl font-extrabold mt-[10%] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 sm:text-4xl mb-4`}
            >
              About Our AI Chat Assistant
            </h1>
            <p className={`mt-4 text-base ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Our AI-powered chat assistant is designed to provide seamless and intelligent conversations, helping users get instant responses, automate tasks, and improve productivity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`rounded-lg p-6 hover:bg-blue-50 transition-all ${theme === "dark" ? "bg-gray-800 text-white opacity-90" : "bg-white"}`}
            >
              <div className="flex items-center mb-4">
                <FaRobot className="text-blue-600 text-2xl mr-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Smart <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">AI Responses</span>
                </h2>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Get intelligent and context-aware replies powered by our advanced AI model.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`rounded-lg p-6 hover:bg-blue-50 transition-all ${theme === "dark" ? "bg-gray-800 text-white opacity-90" : "bg-white"}`}
            >
              <div className="flex items-center mb-4">
                <FaCommentDots className="text-yellow-600 text-2xl mr-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Seamless <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-transparent bg-clip-text">Conversations</span>
                </h2>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Engage in natural and fluid conversations, whether for customer support or personal assistance.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`rounded-lg p-6 hover:bg-blue-50 transition-all ${theme === "dark" ? "bg-gray-800 text-white opacity-90" : "bg-white"}`}
            >
              <div className="flex items-center mb-4">
                <FaRocket className="text-red-600 text-2xl mr-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Automated <span className="bg-gradient-to-r from-red-500 to-red-700 text-transparent bg-clip-text">Task Execution</span>
                </h2>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Let our AI handle repetitive tasks and automate responses efficiently.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`rounded-lg p-6 hover:bg-blue-50 transition-all ${theme === "dark" ? "bg-gray-800 text-white opacity-90" : "bg-white"}`}
            >
              <div className="flex items-center mb-4">
                <FaUserShield className="text-green-600 text-2xl mr-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Privacy & <span className="bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">Security</span>
                </h2>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-300">
                Your conversations are safe with us. We prioritize data security and user privacy.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Choose Our Chat AI?
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
              Our Chat AI is built to make conversations smoother and smarter, assisting you in a variety of scenarios, from answering FAQs to executing automated workflows.
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Whether you're a business looking to enhance customer interactions or an individual seeking a powerful virtual assistant, our AI is designed to adapt to your needs.
            </p>
          </motion.div>

          <button
            onClick={() => router.push("/")}
            className={`px-6 py-2 bg-transparent border border-gray-500 mt-10 text-gray-800 rounded-full shadow hover:bg-gray-500 hover:text-white transition-all ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
