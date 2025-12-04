import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Headphones, Mic, PenTool, Search, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const skillCategories = [
  {
    id: "reading",
    icon: BookOpen,
    title: "Reading",
    description: "Stories, articles & books",
    progress: 65,
    color: "bg-primary",
    to: "/learn/reading",
  },
  {
    id: "listening",
    icon: Headphones,
    title: "Listening",
    description: "Audio, podcasts & songs",
    progress: 45,
    color: "bg-secondary",
    to: "/learn/listening",
  },
  {
    id: "speaking",
    icon: Mic,
    title: "Speaking",
    description: "Conversations & pronunciation",
    progress: 30,
    color: "bg-accent",
    to: "/learn/speaking",
  },
  {
    id: "writing",
    icon: PenTool,
    title: "Writing",
    description: "Essays, emails & grammar",
    progress: 55,
    color: "bg-info",
    to: "/learn/writing",
  },
];

const featuredContent = [
  { id: 1, title: "Business English Basics", type: "Course", rating: 4.8, lessons: 12 },
  { id: 2, title: "IELTS Preparation", type: "Course", rating: 4.9, lessons: 24 },
  { id: 3, title: "Everyday Conversations", type: "Practice", rating: 4.7, lessons: 8 },
];

const LearnHub = () => {
  return (
    <MobileLayout>
      <PageHeader title="Learn" />
      
      <div className="px-4 py-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search topics, lessons..."
            className="pl-10 h-12 bg-muted/50"
          />
        </div>

        {/* Skill Categories */}
        <div>
          <h3 className="font-semibold mb-3">Skills</h3>
          <div className="grid grid-cols-2 gap-3">
            {skillCategories.map((skill, index) => (
              <Link key={skill.id} to={skill.to}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="p-4 h-full hover:border-primary/50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl ${skill.color} flex items-center justify-center mb-3`}>
                      <skill.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold mb-1">{skill.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{skill.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-1.5" />
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Content */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Featured Courses</h3>
            <button className="text-sm text-primary flex items-center">
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {featuredContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{content.title}</h4>
                      <p className="text-sm text-muted-foreground">{content.type} • {content.lessons} lessons</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span className="text-sm font-medium">{content.rating}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Continue Where You Left Off */}
        <div>
          <h3 className="font-semibold mb-3">Continue Learning</h3>
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Daily Conversation Practice</h4>
                <p className="text-sm text-muted-foreground">Lesson 5 of 12</p>
                <Progress value={42} className="h-1.5 mt-2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LearnHub;
