import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Send, Volume2, Lightbulb, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const suggestedPhrases = [
  "How are you today?",
  "Tell me about yourself",
  "What's your favorite hobby?",
  "Can you repeat that?",
];

const SpeakingPractice = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      content: "Hi there! I'm your AI conversation partner. Let's practice English together. What would you like to talk about today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Simulate transcription
      const userMessage: Message = {
        id: messages.length + 1,
        role: "user",
        content: "I'd like to practice ordering food at a restaurant.",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      
      // AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 2,
          role: "ai",
          content: "Great choice! Restaurants are perfect for practicing conversational English. Let's roleplay - I'll be the waiter. *clears throat* Good evening! Welcome to The Blue Lagoon. Table for one, or are you expecting someone?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1500);
    } else {
      setIsRecording(true);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputText("");

    // AI response
    setTimeout(() => {
      const responses = [
        "That's interesting! Can you tell me more about that?",
        "Good pronunciation! I noticed you're improving. Let's continue.",
        "Nice! Here's a follow-up question for you...",
      ];
      const aiMessage: Message = {
        id: messages.length + 2,
        role: "ai",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const handlePhraseClick = (phrase: string) => {
    setInputText(phrase);
  };

  return (
    <MobileLayout showNav={false}>
      <PageHeader 
        title="AI Conversation" 
        showBack 
        rightAction={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/learn/speaking/feedback")}
          >
            End & Review
          </Button>
        }
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.role === "ai" && (
                    <button className="mt-2 flex items-center gap-1 text-xs opacity-70 hover:opacity-100">
                      <Volume2 className="w-3 h-3" />
                      Listen
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Phrases */}
        <div className="px-4 py-2 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Suggested phrases</span>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {suggestedPhrases.map((phrase) => (
              <button
                key={phrase}
                onClick={() => handlePhraseClick(phrase)}
                className="flex-shrink-0 px-3 py-1.5 bg-card border border-border rounded-full text-sm hover:border-primary/50 transition-colors"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card safe-area-inset-bottom">
          <div className="flex items-center gap-3">
            {/* Recording Button */}
            <motion.button
              onClick={handleRecord}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isRecording
                  ? "bg-destructive animate-pulse"
                  : "bg-accent hover:bg-accent/90"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {isRecording ? (
                <MicOff className="w-6 h-6 text-destructive-foreground" />
              ) : (
                <Mic className="w-6 h-6 text-accent-foreground" />
              )}
            </motion.button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type or tap to speak..."
                className="w-full h-12 px-4 rounded-full bg-muted border border-border focus:border-primary focus:outline-none text-sm"
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                inputText.trim()
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {isRecording && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-destructive mt-2"
            >
              Recording... Tap to stop
            </motion.p>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default SpeakingPractice;
