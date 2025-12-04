import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Flame, Target, TrendingUp, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const VocabularyDashboard = () => {
  const stats = { learned: 245, mastered: 180, reviewing: 45, streak: 7 };

  return (
    <MobileLayout>
      <PageHeader title="Vocabulary" showBack />
      <div className="px-4 py-4 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Brain, label: "Words Learned", value: stats.learned, color: "text-primary" },
            { icon: Award, label: "Mastered", value: stats.mastered, color: "text-success" },
            { icon: Target, label: "Reviewing", value: stats.reviewing, color: "text-accent" },
            { icon: Flame, label: "Day Streak", value: stats.streak, color: "text-destructive" },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
        <Link to="/vocabulary/practice">
          <Card className="p-4 bg-primary/5 border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Practice Now</h3>
                <p className="text-sm text-muted-foreground">15 words ready for review</p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </Card>
        </Link>
      </div>
    </MobileLayout>
  );
};

export default VocabularyDashboard;
