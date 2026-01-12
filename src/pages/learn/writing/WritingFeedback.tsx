import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  BookOpen,
  RefreshCcw,
  Home,
  Star,
  Lightbulb,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const feedbackData = {
  overallScore: 85,
  wordCount: 142,
  timeSpent: "12:34",
  scores: {
    grammar: 90,
    vocabulary: 82,
    structure: 88,
    creativity: 78,
  },
  strengths: [
    "Excellent use of descriptive language",
    "Good paragraph structure",
    "Varied sentence lengths",
  ],
  improvements: [
    "Consider using more transition words",
    "Add more sensory details",
    "Work on concluding statement strength",
  ],
  grammarErrors: 2,
  spellingErrors: 0,
  xpEarned: 45,
};

const WritingFeedback = () => {
  const { id } = useParams();

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-secondary";
    if (score >= 70) return "text-primary";
    if (score >= 50) return "text-accent";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: "Excellent", variant: "secondary" as const };
    if (score >= 70) return { label: "Good", variant: "default" as const };
    if (score >= 50) return { label: "Fair", variant: "outline" as const };
    return { label: "Needs Work", variant: "destructive" as const };
  };

  const badge = getScoreBadge(feedbackData.overallScore);

  return (
    <MobileLayout showNav={false}>
      <PageHeader title="Writing Feedback" showBack />

      <div className="px-4 py-4 space-y-5 pb-24">
        {/* Overall Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-primary"
                  strokeDasharray={`${feedbackData.overallScore * 3.02} 302`}
                  initial={{ strokeDasharray: "0 302" }}
                  animate={{ strokeDasharray: `${feedbackData.overallScore * 3.02} 302` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className={`text-3xl font-bold ${getScoreColor(feedbackData.overallScore)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {feedbackData.overallScore}
                </motion.span>
                <span className="text-xs text-muted-foreground">out of 100</span>
              </div>
            </div>
            <Badge variant={badge.variant} className="mb-2">
              {badge.label}
            </Badge>
            <div className="flex justify-center gap-4 mt-3 text-sm text-muted-foreground">
              <span>{feedbackData.wordCount} words</span>
              <span>•</span>
              <span>{feedbackData.timeSpent} min</span>
            </div>
          </Card>
        </motion.div>

        {/* XP Earned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-accent/10 border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold">+{feedbackData.xpEarned} XP Earned</p>
                  <p className="text-sm text-muted-foreground">Great effort!</p>
                </div>
              </div>
              <Award className="w-8 h-8 text-accent" />
            </div>
          </Card>
        </motion.div>

        {/* Detailed Scores */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Score Breakdown
            </h4>
            <div className="space-y-4">
              {Object.entries(feedbackData.scores).map(([key, value], index) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{key}</span>
                    <span className={`font-medium ${getScoreColor(value)}`}>
                      {value}%
                    </span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Error Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Grammar Errors</span>
            </div>
            <p className="text-2xl font-bold">{feedbackData.grammarErrors}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Spelling Errors</span>
            </div>
            <p className="text-2xl font-bold">{feedbackData.spellingErrors}</p>
          </Card>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              Strengths
            </h4>
            <ul className="space-y-2">
              {feedbackData.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-secondary mt-0.5">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Areas for Improvement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              Areas for Improvement
            </h4>
            <ul className="space-y-2">
              {feedbackData.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-0.5">→</span>
                  {improvement}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Suggested Practice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="p-4 bg-muted/50">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Recommended Practice
            </h4>
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Transition Words Practice</p>
                <p className="text-xs text-muted-foreground">5 exercises available</p>
              </div>
              <Button size="sm" variant="outline">
                Start
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4 safe-bottom">
        <div className="flex gap-3 max-w-md mx-auto">
          <Link to="/learn/writing" className="flex-1">
            <Button variant="outline" className="w-full">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try Another
            </Button>
          </Link>
          <Link to="/dashboard" className="flex-1">
            <Button className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
};

export default WritingFeedback;
