import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Play, Pause, Bookmark, BookmarkCheck, Plus, Minus, 
  Volume2, ChevronRight, MessageSquare, Lightbulb
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const sampleContent = {
  title: "The Little Prince - Chapter 1",
  text: `Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal. Here is a copy of the drawing.

In the book it said: "Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion."

I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One. It looked something like this.

I showed my masterpiece to the grown-ups, and asked them whether the drawing frightened them.

But they answered: "Frighten? Why should any one be frightened by a hat?"

My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant. But since the grown-ups were not able to understand it, I made another drawing: I drew the inside of a boa constrictor, so that the grown-ups could see it clearly. They always need to have things explained.`,
  vocabularyHighlights: [
    { word: "magnificent", definition: "very beautiful, elaborate, or impressive" },
    { word: "primeval", definition: "ancient; belonging to the earliest period" },
    { word: "constrictor", definition: "a snake that kills by coiling around its prey" },
    { word: "digestion", definition: "the process of breaking down food in the body" },
    { word: "pondered", definition: "thought about something carefully" },
  ],
};

const ReadingContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(16);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [selectedWord, setSelectedWord] = useState<typeof sampleContent.vocabularyHighlights[0] | null>(null);

  const progress = 45;

  const handleWordClick = (word: typeof sampleContent.vocabularyHighlights[0]) => {
    setSelectedWord(word);
  };

  const highlightText = (text: string) => {
    let result = text;
    sampleContent.vocabularyHighlights.forEach((vocab) => {
      const regex = new RegExp(`\\b${vocab.word}\\b`, "gi");
      result = result.replace(
        regex,
        `<span class="text-primary underline decoration-dotted cursor-pointer" data-word="${vocab.word}">${vocab.word}</span>`
      );
    });
    return result;
  };

  return (
    <MobileLayout showNav={false}>
      <PageHeader
        title={sampleContent.title}
        showBack
        rightAction={
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 fill-primary text-primary" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        }
      />

      <div className="flex-1 flex flex-col">
        {/* Progress Bar */}
        <div className="px-4 py-2 bg-muted/50">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground text-center mt-1">{progress}% complete</p>
        </div>

        {/* Reading Controls */}
        <div className="flex items-center justify-center gap-4 py-3 border-b border-border px-4">
          <button
            onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            className="p-2 rounded-full hover:bg-muted"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-sm w-8 text-center">{fontSize}</span>
          <button
            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            className="p-2 rounded-full hover:bg-muted"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-border" />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full hover:bg-muted"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button className="p-2 rounded-full hover:bg-muted">
            <Volume2 className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-border" />
          <button
            onClick={() => setShowVocab(!showVocab)}
            className={`p-2 rounded-full hover:bg-muted ${showVocab ? "bg-primary/10 text-primary" : ""}`}
          >
            <Lightbulb className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            {/* Text Area */}
            <div className={`flex-1 px-6 py-6 ${showVocab ? "" : ""}`}>
              <div
                className="prose prose-lg max-w-none leading-relaxed"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: highlightText(sampleContent.text) }}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.dataset.word) {
                    const vocab = sampleContent.vocabularyHighlights.find(
                      (v) => v.word.toLowerCase() === target.dataset.word?.toLowerCase()
                    );
                    if (vocab) handleWordClick(vocab);
                  }
                }}
              />
            </div>

            {/* Vocabulary Sidebar */}
            <AnimatePresence>
              {showVocab && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="border-l border-border overflow-hidden"
                >
                  <div className="w-48 p-4 space-y-3">
                    <h4 className="font-semibold text-sm">Vocabulary</h4>
                    {sampleContent.vocabularyHighlights.map((vocab) => (
                      <button
                        key={vocab.word}
                        onClick={() => handleWordClick(vocab)}
                        className={`w-full text-left p-2 rounded-lg text-sm hover:bg-muted transition-colors ${
                          selectedWord?.word === vocab.word ? "bg-primary/10 text-primary" : ""
                        }`}
                      >
                        {vocab.word}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Word Definition Popup */}
        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="border-t border-border bg-card p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-primary">{selectedWord.word}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{selectedWord.definition}</p>
                </div>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <Volume2 className="w-4 h-4 mr-1" /> Listen
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Save to Vocabulary
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="border-t border-border bg-card p-4 safe-area-inset-bottom">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Notes
            </Button>
            <Button
              className="flex-1 gradient-primary"
              onClick={() => navigate("/vocabulary/practice")}
            >
              Take Quiz
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ReadingContent;
