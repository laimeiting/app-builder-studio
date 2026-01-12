import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PenTool, 
  FileText, 
  Mail, 
  GraduationCap, 
  Sparkles,
  Clock,
  ChevronRight,
  Trophy,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const writingPrompts = [
  {
    id: 1,
    title: "Describe Your Dream Vacation",
    type: "Creative",
    difficulty: "Beginner",
    wordLimit: 150,
    timeEstimate: 15,
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Professional Email Request",
    type: "Business",
    difficulty: "Intermediate",
    wordLimit: 100,
    timeEstimate: 10,
    icon: Mail,
  },
  {
    id: 3,
    title: "Essay: Technology Impact",
    type: "Academic",
    difficulty: "Advanced",
    wordLimit: 300,
    timeEstimate: 30,
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Short Story Continuation",
    type: "Creative",
    difficulty: "Intermediate",
    wordLimit: 200,
    timeEstimate: 20,
    icon: FileText,
  },
];

const writingChallenges = [
  { id: 1, title: "Daily Journal", streak: 5, participants: 1240 },
  { id: 2, title: "Flash Fiction Friday", streak: 2, participants: 856 },
  { id: 3, title: "Grammar Master", streak: 0, participants: 2100 },
];

const progressStats = {
  wordsWritten: 4520,
  essaysCompleted: 12,
  grammarScore: 78,
  currentStreak: 5,
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-secondary text-secondary-foreground";
    case "Intermediate":
      return "bg-accent text-accent-foreground";
    case "Advanced":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const WritingModule = () => {
  return (
    <MobileLayout>
      <PageHeader title="Writing" showBack />

      <div className="px-4 py-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progressStats.wordsWritten.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Words Written</p>
                </div>
              </div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Target className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{progressStats.grammarScore}%</p>
                  <p className="text-xs text-muted-foreground">Grammar Score</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Writing Prompts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Writing Prompts</h3>
            <button className="text-sm text-primary flex items-center">
              All prompts <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {writingPrompts.map((prompt, index) => (
              <Link key={prompt.id} to={`/learn/writing/exercise/${prompt.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="p-4 hover:border-primary/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                        <prompt.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium mb-1">{prompt.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {prompt.type}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(prompt.difficulty)}`}>
                            {prompt.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {prompt.wordLimit} words
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            ~{prompt.timeEstimate} min
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Writing Challenges */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Challenges</h3>
            <Badge variant="secondary" className="text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              3 Active
            </Badge>
          </div>
          <div className="space-y-3">
            {writingChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {challenge.participants.toLocaleString()} participants
                      </p>
                    </div>
                    <div className="text-right">
                      {challenge.streak > 0 ? (
                        <div className="flex items-center gap-1 text-accent">
                          <span className="text-lg">🔥</span>
                          <span className="font-bold">{challenge.streak}</span>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline">
                          Join
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Grammar Progress */}
        <div>
          <h3 className="font-semibold mb-3">Grammar Progress</h3>
          <Card className="p-4">
            <div className="space-y-4">
              {[
                { skill: "Punctuation", progress: 85 },
                { skill: "Sentence Structure", progress: 72 },
                { skill: "Vocabulary Usage", progress: 68 },
                { skill: "Tenses", progress: 90 },
              ].map((item, index) => (
                <div key={item.skill}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.skill}</span>
                    <span className="text-muted-foreground">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/learn/writing/exercise/1">
            <Button className="w-full h-14 text-base" size="lg">
              <PenTool className="w-5 h-5 mr-2" />
              Start Writing Practice
            </Button>
          </Link>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default WritingModule;
