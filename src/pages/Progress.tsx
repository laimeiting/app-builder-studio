import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Target, TrendingUp, Star, Award } from "lucide-react";

const ProgressPage = () => {
  return (
    <MobileLayout>
      <PageHeader title="Progress" />
      <div className="px-4 py-4 space-y-6">
        <Card className="p-6 text-center gradient-hero">
          <h2 className="text-5xl font-bold text-primary mb-2">B1</h2>
          <p className="text-muted-foreground">Intermediate Level</p>
          <Progress value={65} className="h-2 mt-4" />
          <p className="text-sm text-muted-foreground mt-2">65% to B2</p>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Flame, label: "Day Streak", value: "7", color: "text-destructive" },
            { icon: Trophy, label: "XP Earned", value: "1,250", color: "text-accent" },
            { icon: Target, label: "Lessons", value: "42", color: "text-primary" },
            { icon: Star, label: "Accuracy", value: "85%", color: "text-success" },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-3">Skills</h3>
          {["Reading", "Listening", "Speaking", "Writing"].map((skill, i) => (
            <div key={skill} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{skill}</span>
                <span className="font-medium">{[75, 60, 45, 55][i]}%</span>
              </div>
              <Progress value={[75, 60, 45, 55][i]} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProgressPage;
