import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Mic, Trophy } from "lucide-react";

const features = [
  { icon: Sparkles, text: "AI-Powered Learning", color: "text-primary" },
  { icon: BookOpen, text: "Rich Multimedia Content", color: "text-secondary" },
  { icon: Mic, text: "Speaking Practice", color: "text-accent" },
  { icon: Trophy, text: "Track Progress", color: "text-success" },
];

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gradient-hero">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center shadow-glow"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="text-4xl font-bold text-primary-foreground">V</span>
          </motion.div>

          <h1 className="text-3xl font-bold mb-2">
            Welcome to <span className="text-gradient">Vocaboo</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Master English with AI-powered learning
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="w-full max-w-sm space-y-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className={`p-2 rounded-lg bg-muted ${feature.color}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="p-6 space-y-3 safe-area-inset-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={() => navigate("/auth/signup")}
          className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity"
        >
          Get Started
        </Button>
        <Button
          onClick={() => navigate("/auth/login")}
          variant="outline"
          className="w-full h-12 text-base font-medium"
        >
          I already have an account
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Welcome;
