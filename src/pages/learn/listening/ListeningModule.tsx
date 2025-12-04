import { useState } from "react";
import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Headphones, Clock, ChevronRight, Play, Filter, Music } from "lucide-react";
import { Link } from "react-router-dom";

const audioContent = [
  {
    id: 1,
    title: "Daily News Brief",
    type: "Podcast",
    level: "Intermediate",
    duration: "8 min",
    progress: 60,
    cover: "🎙️",
  },
  {
    id: 2,
    title: "Shape of You - Ed Sheeran",
    type: "Song",
    level: "Intermediate",
    duration: "4 min",
    progress: 100,
    cover: "🎵",
  },
  {
    id: 3,
    title: "At the Restaurant",
    type: "Dialogue",
    level: "Beginner",
    duration: "3 min",
    progress: 0,
    cover: "💬",
  },
  {
    id: 4,
    title: "TED Talk: The Power of Introverts",
    type: "Speech",
    level: "Advanced",
    duration: "15 min",
    progress: 25,
    cover: "🎤",
  },
];

const ListeningModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredContent = audioContent.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || item.type.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <MobileLayout>
      <PageHeader title="Listening" showBack />
      
      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search audio content..."
            className="pl-10 pr-10 h-12 bg-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: "all", label: "All", icon: Headphones },
            { id: "song", label: "Songs", icon: Music },
            { id: "podcast", label: "Podcasts", icon: Headphones },
            { id: "dialogue", label: "Dialogues", icon: Headphones },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.id
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <f.icon className="w-3.5 h-3.5" />
              {f.label}
            </button>
          ))}
        </div>

        {/* Content List */}
        <div className="space-y-3">
          {filteredContent.map((item, index) => (
            <Link key={item.id} to={`/learn/listening/content/${item.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-4 hover:border-secondary/50 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center text-2xl relative">
                      {item.cover}
                      <div className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                        <Play className="w-3 h-3 text-secondary-foreground fill-secondary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {item.level}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                      </div>
                      {item.progress > 0 && item.progress < 100 && (
                        <Progress value={item.progress} className="h-1.5 mt-2" />
                      )}
                      {item.progress === 100 && (
                        <span className="text-xs text-success font-medium mt-2 inline-block">✓ Completed</span>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground self-center flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ListeningModule;
