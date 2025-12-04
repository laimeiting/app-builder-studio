import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Star, Volume2, CheckCircle, AlertCircle, 
  ChevronRight, RotateCcw, MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const feedbackData = {
  overallScore: 85,
  pronunciation: 82,
  grammar: 88,
  fluency: 85,
  vocabulary: 78,
  duration: "5:32",
  wordsSpoken: 234,
  corrections: [
    {
      original: "I goed to the store",
      corrected: "I went to the store",
      type: "grammar",
    },
    {
      original: "pronounciation",
      corrected: "pronunciation",
      type: "vocabulary",
    },
  ],
  improvements: [
    "Great use of complex sentences!",
    "Your intonation is improving",
    "Good use of transitional phrases",
  ],
  suggestions: [
    "Practice past tense irregular verbs",
    "Try speaking a bit slower for clarity",
    "Expand vocabulary for everyday topics",
  ],
};

const SpeakingFeedback = () => {
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-accent";
    return "text-destructive";
  };

  return (
    <MobileLayout showNav={false}>
      <PageHeader title="Session Feedback" showBack />

      <div className="px-4 py-4 space-y-6 overflow-y-auto">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${feedbackData.overallScore * 3.52} 352`}
                initial={{ strokeDasharray: "0 352" }}
                animate={{ strokeDasharray: `${feedbackData.overallScore * 3.52} 352` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{feedbackData.overallScore}</span>
              <span className="text-sm text-muted-foreground">Overall</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>⏱️ {feedbackData.duration}</span>
            <span>💬 {feedbackData.wordsSpoken} words</span>
          </div>
        </motion.div>

        {/* Skill Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold mb-3">Skill Breakdown</h3>
          <Card className="p-4 space-y-4">
            {[
              { label: "Pronunciation", value: feedbackData.pronunciation },
              { label: "Grammar", value: feedbackData.grammar },
              { label: "Fluency", value: feedbackData.fluency },
              { label: "Vocabulary", value: feedbackData.vocabulary },
            ].map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{skill.label}</span>
                  <span className={`text-sm font-semibold ${getScoreColor(skill.value)}`}>
                    {skill.value}%
                  </span>
                </div>
                <Progress value={skill.value} className="h-2" />
              </div>
            ))}
          </Card>
        </motion.div>

        {/* Corrections */}
        {feedbackData.corrections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent" />
              Corrections
            </h3>
            <div className="space-y-2">
              {feedbackData.corrections.map((correction, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-start gap-3">
                    <span className="text-destructive line-through text-sm">{correction.original}</span>
                    <span className="text-success">→</span>
                    <span className="text-success text-sm font-medium">{correction.corrected}</span>
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">{correction.type}</span>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* What You Did Well */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            What You Did Well
          </h3>
          <Card className="p-4">
            <ul className="space-y-2">
              {feedbackData.improvements.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 fill-accent text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold mb-3">AI Suggestions</h3>
          <Card className="p-4 bg-primary/5 border-primary/20">
            <ul className="space-y-2">
              {feedbackData.suggestions.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3 pb-4"
        >
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/learn/speaking/practice")}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice Again
          </Button>
          <Button
            className="flex-1 gradient-primary"
            onClick={() => navigate("/dashboard")}
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default SpeakingFeedback;
