import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Mic, MessageCircle, Volume2, ChevronRight, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const speakingTopics = [
  {
    id: 1,
    title: "Daily Conversations",
    description: "Practice everyday dialogues",
    level: "Beginner",
    sessions: 12,
    completed: 8,
    icon: "💬",
  },
  {
    id: 2,
    title: "Job Interviews",
    description: "Prepare for professional interviews",
    level: "Intermediate",
    sessions: 8,
    completed: 3,
    icon: "💼",
  },
  {
    id: 3,
    title: "Pronunciation Drills",
    description: "Perfect your accent and sounds",
    level: "All Levels",
    sessions: 20,
    completed: 15,
    icon: "🎯",
  },
  {
    id: 4,
    title: "Public Speaking",
    description: "Deliver presentations confidently",
    level: "Advanced",
    sessions: 6,
    completed: 0,
    icon: "🎤",
  },
];

const recentSessions = [
  { id: 1, topic: "Ordering at a Restaurant", score: 85, date: "Today" },
  { id: 2, topic: "Asking for Directions", score: 92, date: "Yesterday" },
  { id: 3, topic: "Making Small Talk", score: 78, date: "2 days ago" },
];

const SpeakingModule = () => {
  return (
    <MobileLayout>
      <PageHeader title="Speaking" showBack />
      
      <div className="px-4 py-4 space-y-6">
        {/* AI Coach Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/learn/speaking/practice">
            <Card className="p-5 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">AI Conversation Coach</h3>
                  <p className="text-sm text-muted-foreground">Practice speaking with our AI partner</p>
                </div>
                <ChevronRight className="w-5 h-5 text-accent" />
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Speaking Topics */}
        <div>
          <h3 className="font-semibold mb-3">Topics</h3>
          <div className="space-y-3">
            {speakingTopics.map((topic, index) => (
              <Link key={topic.id} to={`/learn/speaking/practice?topic=${topic.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="p-4 hover:border-accent/50 transition-colors">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl">
                        {topic.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{topic.title}</h4>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                            {topic.level}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {topic.completed}/{topic.sessions} sessions
                          </span>
                        </div>
                        <Progress 
                          value={(topic.completed / topic.sessions) * 100} 
                          className="h-1.5 mt-2" 
                        />
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground self-center flex-shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div>
          <h3 className="font-semibold mb-3">Recent Sessions</h3>
          <div className="space-y-2">
            {recentSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Link to={`/learn/speaking/feedback/${session.id}`}>
                  <Card className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Mic className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{session.topic}</p>
                          <p className="text-xs text-muted-foreground">{session.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-semibold">{session.score}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SpeakingModule;
