import { motion } from "framer-motion";
import { MobileLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Flame, BookOpen, Mic, Brain, Trophy, ChevronRight, 
  Play, Clock, Sparkles, MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { icon: Mic, label: "Practice Speaking", to: "/learn/speaking/practice", color: "bg-secondary" },
  { icon: Brain, label: "Vocabulary", to: "/vocabulary", color: "bg-accent" },
  { icon: BookOpen, label: "Read Story", to: "/learn/reading", color: "bg-primary" },
];

const recommendedLessons = [
  { id: 1, title: "Daily Conversation", type: "Speaking", duration: "15 min", progress: 60 },
  { id: 2, title: "Business Emails", type: "Writing", duration: "20 min", progress: 0 },
  { id: 3, title: "News Articles", type: "Reading", duration: "10 min", progress: 30 },
];

const achievements = [
  { icon: "🔥", label: "7 Day Streak" },
  { icon: "📚", label: "100 Words" },
  { icon: "🎯", label: "Perfect Quiz" },
];

const Dashboard = () => {
  const userName = "Alex";
  const streak = 7;
  const dailyGoal = 75;

  return (
    <MobileLayout>
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <p className="text-muted-foreground">Good morning,</p>
            <h1 className="text-2xl font-bold">{userName} 👋</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
            <Flame className="w-5 h-5 text-accent" />
            <span className="font-bold text-accent">{streak}</span>
          </div>
        </motion.div>

        {/* Daily Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 gradient-hero border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Today's Progress</h3>
              <span className="text-sm text-muted-foreground">{dailyGoal}% complete</span>
            </div>
            <Progress value={dailyGoal} className="h-2 mb-3" />
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>23 min studied</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-accent" />
                <span>45 XP earned</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, index) => (
              <Link key={action.label} to={action.to}>
                <motion.div
                  className="flex flex-col items-center p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <div className={`p-2 rounded-lg ${action.color} mb-2`}>
                    <action.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* AI Coach Floating Button */}
        <motion.div
          className="fixed bottom-24 right-4 z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Link to="/learn/speaking/practice">
            <Button
              size="lg"
              className="w-14 h-14 rounded-full shadow-lg gradient-primary animate-pulse-glow"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </Link>
        </motion.div>

        {/* Recommended Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Continue Learning</h3>
            <Link to="/learn" className="text-sm text-primary flex items-center">
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recommendedLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{lesson.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{lesson.type}</span>
                        <span>•</span>
                        <span>{lesson.duration}</span>
                      </div>
                      {lesson.progress > 0 && (
                        <Progress value={lesson.progress} className="h-1 mt-2" />
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold mb-3">Recent Achievements</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <span className="text-lg">{achievement.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{achievement.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personalized Tip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-medium mb-1">AI Tip of the Day</h4>
                <p className="text-sm text-muted-foreground">
                  Practice speaking for 10 minutes daily to improve fluency faster. Try our AI conversation partner!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
