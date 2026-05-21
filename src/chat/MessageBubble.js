import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Typewriter from "./Typewriter"; // Import typewriter

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-lg ${
          isUser
            ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-br-md font-bold"
            : "bg-white/10 text-white border border-white/10 rounded-bl-md"
        }`}
      >
        <div className="prose prose-invert prose-sm max-w-none">
          {isUser ? (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          ) : (
            // Assistant ke liye typewriter effect
            <Typewriter text={message.content} />
          )}
        </div>
      </div>
    </motion.div>
  );
}