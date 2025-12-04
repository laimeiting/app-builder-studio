import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, ChevronRight, Award, BookOpen, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <MobileLayout>
      <PageHeader title="Profile" rightAction={<Link to="/settings"><Settings className="w-5 h-5" /></Link>} />
      <div className="px-4 py-4 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">A</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">Alex Johnson</h2>
            <p className="text-muted-foreground">Learning since Jan 2024</p>
            <div className="flex items-center gap-2 mt-1">
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">7 day streak</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: BookOpen, value: "42", label: "Lessons" },
            { icon: Award, value: "12", label: "Badges" },
            { icon: Flame, value: "1.2K", label: "XP" },
          ].map((stat) => (
            <Card key={stat.label} className="p-3 text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { label: "Edit Profile", to: "/profile/edit" },
            { label: "Settings", to: "/settings" },
            { label: "Help & Support", to: "/help" },
          ].map((item) => (
            <Link key={item.label} to={item.to}>
              <Card className="p-4 flex items-center justify-between hover:bg-muted/50">
                <span>{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Card>
            </Link>
          ))}
        </div>
        <Button variant="outline" className="w-full" onClick={() => window.location.href = "/welcome"}>
          Sign Out
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Profile;
