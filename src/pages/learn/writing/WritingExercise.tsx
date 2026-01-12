import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Send,
  RotateCcw,
  Save,
  Sparkles,
  Clock,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

// Mock prompt data
const promptData = {
  id: 1,
  title: "Describe Your Dream Vacation",
  type: "Creative",
  difficulty: "Beginner",
  wordLimit: 150,
  description:
    "Write about your ideal vacation destination. Describe the place, activities you would do, and why this destination appeals to you. Use descriptive language and varied sentence structures.",
  tips: [
    "Start with a hook to grab the reader's attention",
    "Use sensory details (sight, sound, smell, taste, touch)",
    "Include at least 3 different activities",
    "End with a memorable conclusion",
  ],
};

// Mock grammar errors for demo
const mockGrammarFeedback = [
  {
    type: "error",
    original: "their",
    suggestion: "there",
    message: "Wrong word usage: 'there' refers to a place",
    position: { start: 45, end: 50 },
  },
  {
    type: "warning",
    original: "very beautiful",
    suggestion: "stunning",
    message: "Consider using a stronger word to avoid redundancy",
    position: { start: 120, end: 134 },
  },
  {
    type: "info",
    original: "I would go to",
    suggestion: "I would visit",
    message: "Alternative phrasing suggestion",
    position: { start: 0, end: 13 },
  },
];

const WritingExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const progressPercent = Math.min((wordCount / promptData.wordLimit) * 100, 100);
  const isOverLimit = wordCount > promptData.wordLimit;

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFeedback(true);
    }, 1500);
  };

  const handleSaveDraft = () => {
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2000);
  };

  const handleSubmit = () => {
    navigate("/learn/writing/feedback/1");
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-accent" />;
      default:
        return <Lightbulb className="w-4 h-4 text-info" />;
    }
  };

  return (
    <MobileLayout showNav={false}>
      <PageHeader title="Writing Exercise" showBack />

      <div className="px-4 py-4 space-y-4 pb-24">
        {/* Prompt Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{promptData.title}</h3>
              <Badge variant="outline">{promptData.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {promptData.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                {promptData.wordLimit} words max
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~15 min
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Writing Tips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              <h4 className="font-medium text-sm">Writing Tips</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              {promptData.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Text Editor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <Textarea
              placeholder="Start writing your response here..."
              className="min-h-[200px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    isOverLimit ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {wordCount} / {promptData.wordLimit} words
                </span>
                {isOverLimit && (
                  <AlertCircle className="w-4 h-4 text-destructive" />
                )}
              </div>
              <Progress
                value={progressPercent}
                className={`w-24 h-2 ${isOverLimit ? "[&>div]:bg-destructive" : ""}`}
              />
            </div>
          </Card>
        </motion.div>

        {/* Grammar Check Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Button
            variant="outline"
            className="w-full"
            onClick={handleAnalyze}
            disabled={wordCount < 10 || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                </motion.div>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Check Grammar & Style
              </>
            )}
          </Button>
        </motion.div>

        {/* Grammar Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">AI Feedback</h4>
                <Badge variant="secondary">
                  {mockGrammarFeedback.length} suggestions
                </Badge>
              </div>
              {mockGrammarFeedback.map((feedback, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-3">
                    <div className="flex items-start gap-3">
                      {getFeedbackIcon(feedback.type)}
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="line-through text-muted-foreground">
                            {feedback.original}
                          </span>
                          <span className="mx-2">→</span>
                          <span className="font-medium text-primary">
                            {feedback.suggestion}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {feedback.message}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-xs">
                        Apply
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4 safe-bottom">
        <div className="flex gap-3 max-w-md mx-auto">
          <Button variant="outline" size="icon" onClick={() => setText("")}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleSaveDraft}
          >
            {savedDraft ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </>
            )}
          </Button>
          <Button
            className="flex-1"
            onClick={handleSubmit}
            disabled={wordCount < 20}
          >
            <Send className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default WritingExercise;
