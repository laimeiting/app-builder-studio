import { useState } from "react";
import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, BookOpen, Clock, ChevronRight, Bookmark, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const books = [
  {
    id: 1,
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    level: "Intermediate",
    progress: 45,
    duration: "2h read",
    cover: "📚",
    bookmarked: true,
  },
  {
    id: 2,
    title: "Alice in Wonderland",
    author: "Lewis Carroll",
    level: "Intermediate",
    progress: 0,
    duration: "3h read",
    cover: "🐰",
    bookmarked: false,
  },
  {
    id: 3,
    title: "Short Stories for Beginners",
    author: "Various Authors",
    level: "Beginner",
    progress: 80,
    duration: "1h read",
    cover: "📖",
    bookmarked: true,
  },
  {
    id: 4,
    title: "Business English Articles",
    author: "Vocaboo Collection",
    level: "Advanced",
    progress: 20,
    duration: "45 min",
    cover: "💼",
    bookmarked: false,
  },
];

const ReadingModule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || 
      (filter === "inProgress" && book.progress > 0 && book.progress < 100) ||
      (filter === "bookmarked" && book.bookmarked);
    return matchesSearch && matchesFilter;
  });

  return (
    <MobileLayout>
      <PageHeader title="Reading" showBack />
      
      <div className="px-4 py-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search books, articles..."
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
            { id: "all", label: "All" },
            { id: "inProgress", label: "In Progress" },
            { id: "bookmarked", label: "Bookmarked" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Books List */}
        <div className="space-y-3">
          {filteredBooks.map((book, index) => (
            <Link key={book.id} to={`/learn/reading/content/${book.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-4 hover:border-primary/50 transition-colors">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-3xl">
                      {book.cover}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold truncate">{book.title}</h4>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        {book.bookmarked && (
                          <Bookmark className="w-4 h-4 fill-primary text-primary flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {book.level}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {book.duration}
                        </span>
                      </div>
                      {book.progress > 0 && (
                        <div className="mt-2">
                          <Progress value={book.progress} className="h-1.5" />
                          <span className="text-xs text-muted-foreground">{book.progress}% complete</span>
                        </div>
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

export default ReadingModule;
