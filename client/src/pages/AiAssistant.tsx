import { useState, useRef, useEffect } from "react";
import { Send, Mic, Sparkles, User, Bot } from "lucide-react";
import { useChat } from "@/hooks/use-shramik";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AiAssistant() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Namaste! I am your Shramik Sahayak. Ask me about jobs, government schemes, or new skills. I speak 10+ Indian languages.' }
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const chatMutation = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");

    chatMutation.mutate({ message: userMsg, language }, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: 'bot', text: data.response }]);
      },
      onError: () => {
        setMessages(prev => [...prev, { role: 'bot', text: "Maaf kijiye, kuch gadbad ho gayi. Kripya phir se prayas karein." }]);
      }
    });
  };

  const suggestions = ["Find masonry jobs near me", "Apply for PM Vishwakarma Yojana", "How to increase my daily wage?"];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center shadow-sm shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">Shramik Sahayak</h1>
            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online
            </p>
          </div>
        </div>
        
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="text-sm border-none bg-gray-100 rounded-lg py-1.5 px-3 font-medium text-gray-700 focus:ring-0 cursor-pointer"
        >
          <option>Hindi</option>
          <option>English</option>
          <option>Tamil</option>
          <option>Telugu</option>
          <option>Bengali</option>
        </select>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
              msg.role === 'user' ? "bg-gray-200" : "bg-primary/10"
            )}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4 text-primary" />}
            </div>
            <div className={cn(
              "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-accent text-white rounded-tr-none" 
                : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
            )}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {chatMutation.isPending && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4 pb-24 md:pb-4 shrink-0">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
           {suggestions.map((s, i) => (
             <button key={i} onClick={() => setInput(s)} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">
               {s}
             </button>
           ))}
        </div>
        <div className="flex gap-2">
          <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 bg-gray-50 border-gray-200 rounded-full px-5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || chatMutation.isPending}
            className="p-3 rounded-full bg-primary text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-orange-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
