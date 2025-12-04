import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Volume2, RotateCcw, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const words = [
  { word: "magnificent", definition: "very beautiful or impressive", example: "The view was magnificent." },
  { word: "eloquent", definition: "fluent and persuasive in speech", example: "She gave an eloquent speech." },
  { word: "diligent", definition: "hardworking and careful", example: "He is a diligent student." },
];

const VocabularyPractice = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const handleAnswer = (correct: boolean) => {
    setScore({ ...score, [correct ? "correct" : "incorrect"]: score[correct ? "correct" : "incorrect"] + 1 });
    setIsFlipped(false);
    if (currentIndex < words.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      navigate("/dashboard");
    }
  };

  const progress = ((currentIndex + 1) / words.length) * 100;
  const currentWord = words[currentIndex];

  return (
    <MobileLayout showNav={false}>
      <PageHeader title="Flashcards" showBack />
      <div className="flex-1 flex flex-col px-4 py-4">
        <Progress value={progress} className="h-2 mb-4" />
        <p className="text-center text-sm text-muted-foreground mb-6">{currentIndex + 1} of {words.length}</p>
        
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            className="w-full max-w-sm cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="p-8 min-h-[250px] flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-3xl font-bold mb-4">{currentWord.word}</h2>
                    <p className="text-muted-foreground">Tap to reveal definition</p>
                  </motion.div>
                ) : (
                  <motion.div key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="text-lg mb-4">{currentWord.definition}</p>
                    <p className="text-sm text-muted-foreground italic">"{currentWord.example}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        <div className="flex gap-4 mt-6 safe-area-inset-bottom">
          <Button variant="outline" className="flex-1 h-14" onClick={() => handleAnswer(false)}>
            <X className="w-5 h-5 mr-2 text-destructive" /> Again
          </Button>
          <Button className="flex-1 h-14 bg-success hover:bg-success/90" onClick={() => handleAnswer(true)}>
            <Check className="w-5 h-5 mr-2" /> Got it
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default VocabularyPractice;
