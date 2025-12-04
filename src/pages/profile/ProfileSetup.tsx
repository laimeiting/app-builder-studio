import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const levels = [
  { id: "beginner", label: "Beginner", description: "Just starting out" },
  { id: "intermediate", label: "Intermediate", description: "Can hold basic conversations" },
  { id: "advanced", label: "Advanced", description: "Fluent but want to improve" },
];

const goals = [
  { id: "business", label: "Business", icon: "💼" },
  { id: "academic", label: "Academic", icon: "🎓" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "casual", label: "Casual", icon: "💬" },
  { id: "career", label: "Career", icon: "📈" },
  { id: "exams", label: "Exams", icon: "📝" },
];

const methods = [
  { id: "reading", label: "Reading", icon: "📚" },
  { id: "listening", label: "Listening", icon: "🎧" },
  { id: "speaking", label: "Speaking", icon: "🎤" },
  { id: "writing", label: "Writing", icon: "✍️" },
];

const interests = [
  "Technology", "Sports", "Music", "Movies", "Travel", "Food",
  "Business", "Science", "Art", "Fashion", "Gaming", "News",
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    level: "",
    goals: [] as string[],
    methods: [] as string[],
    studyTime: [30],
    interests: [] as string[],
  });

  const toggleArrayItem = (array: string[], item: string, key: keyof typeof formData) => {
    const newArray = array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
    setFormData({ ...formData, [key]: newArray });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.level !== "";
      case 2: return formData.goals.length > 0;
      case 3: return formData.methods.length > 0;
      case 4: return true;
      case 5: return formData.interests.length >= 3;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      toast({
        title: "Profile created!",
        description: "Your personalized learning path is ready.",
      });
      navigate("/dashboard");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">What's your English level?</h2>
              <p className="text-muted-foreground">We'll customize your experience</p>
            </div>
            {levels.map((level) => (
              <motion.button
                key={level.id}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  formData.level === level.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setFormData({ ...formData, level: level.id })}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{level.label}</p>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                  {formData.level === level.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">What are your goals?</h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <motion.button
                  key={goal.id}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.goals.includes(goal.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleArrayItem(formData.goals, goal.id, "goals")}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl mb-2 block">{goal.icon}</span>
                  <p className="font-medium">{goal.label}</p>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">How do you learn best?</h2>
              <p className="text-muted-foreground">Select your preferred methods</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {methods.map((method) => (
                <motion.button
                  key={method.id}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.methods.includes(method.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleArrayItem(formData.methods, method.id, "methods")}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl mb-2 block">{method.icon}</span>
                  <p className="font-medium">{method.label}</p>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">Daily study time</h2>
              <p className="text-muted-foreground">How much time can you commit?</p>
            </div>
            <div className="text-center">
              <span className="text-5xl font-bold text-primary">{formData.studyTime[0]}</span>
              <span className="text-xl text-muted-foreground ml-2">min/day</span>
            </div>
            <div className="px-4">
              <Slider
                value={formData.studyTime}
                onValueChange={(value) => setFormData({ ...formData, studyTime: value })}
                min={5}
                max={120}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>5 min</span>
                <span>120 min</span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2">What interests you?</h2>
              <p className="text-muted-foreground">Select at least 3 topics</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <motion.button
                  key={interest}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    formData.interests.includes(interest)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleArrayItem(formData.interests, interest, "interests")}
                  whileTap={{ scale: 0.98 }}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.header
        className="flex items-center justify-between h-14 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
          className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-8 h-1 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <div className="w-9" />
      </motion.header>

      {/* Content */}
      <motion.div
        className="flex-1 px-6 py-4"
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {renderStep()}
      </motion.div>

      {/* Bottom */}
      <div className="p-6 safe-area-inset-bottom">
        <Button
          onClick={handleNext}
          className="w-full h-12 text-base font-semibold gradient-primary"
          disabled={!canProceed()}
        >
          {step < 5 ? (
            <>
              Continue
              <ChevronRight className="w-5 h-5 ml-1" />
            </>
          ) : (
            "Start Learning"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;
