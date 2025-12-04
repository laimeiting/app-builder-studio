import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, Music, Film, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { id: "books", icon: BookOpen, label: "Books", count: 124, to: "/learn/reading" },
  { id: "videos", icon: Video, label: "Videos", count: 89, to: "/library" },
  { id: "music", icon: Music, label: "Music", count: 156, to: "/learn/listening" },
  { id: "movies", icon: Film, label: "Movies", count: 45, to: "/library" },
];

const Library = () => {
  return (
    <MobileLayout>
      <PageHeader title="Library" />
      <div className="px-4 py-4 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Search content..." className="pl-10 h-12 bg-muted/50" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Link key={cat.id} to={cat.to}>
              <Card className="p-4 hover:border-primary/50 transition-colors">
                <cat.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold">{cat.label}</h3>
                <p className="text-sm text-muted-foreground">{cat.count} items</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Library;
