"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, Loader2, Trash2, Sparkles } from "lucide-react";
import MessageBubble from "@/chat/MessageBubble";
import QuickActions from "@/chat/QuickAction";
import { useChatStorage } from "@/hooks/useChatStroage";

export default function AIApp() {
  const { messages, setMessages, clearChat } = useChatStorage();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Main Logic for sending messages
  const processMessage = async (userQuery) => {
    if (!userQuery.trim() || loading) return;

    const userMsg = { role: "user", content: userQuery };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      setMessages([...updatedMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: "assistant", content: "System logic error. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4 relative overflow-hidden">
      
      {/* Visual Identity */}
    \

      <div className="relative z-10 w-full max-w-4xl h-175 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="border-b border-white/10 px-8 py-5 flex items-center justify-between bg-[#1a2b4b]">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${loading ? "bg-orange-500 animate-pulse" : "bg-[#1a2b4b] animate-pulse"}`} />
            <span className="text-[10px] uppercase tracking-[4px] text-white font-bold">
              {loading ? "Processing..." : "System Online"}
            </span>
          </div>
          <button onClick={clearChat} className="text-gray-600 hover:text-red-400 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20">
              <Bot size={60} className="text-cyan-400 mb-4" />
              <p className="text-xs tracking-[5px] uppercase">Awaiting Input</p>
            </div>
          ) : (
            messages.map((m, i) => <MessageBubble key={i} message={m} />)
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions & Input Area */}
        <div className="border-t border-white/10 pt-4 bg-blue-950">
          
          {/* Action Chips */}
          <QuickActions onActionClick={(query) => processMessage(query)} />

          <form onSubmit={(e) => { e.preventDefault(); processMessage(input); }} className="p-6 pt-2">
            <div className="relative flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query Nida's Digital Twin..."
                className="w-full bg-[#0f172a] border border-white/5 rounded-2xl px-6 py-5 text-white outline-none focus:border-cyan-400/40 transition-all placeholder:text-gray-600"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-3 w-12 h-12 rounded-xl bg-[#1a2b4b] text-black flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}