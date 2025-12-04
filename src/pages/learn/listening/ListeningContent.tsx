import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MobileLayout, PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Repeat, ChevronRight, Lightbulb
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const sampleAudio = {
  title: "Daily News Brief",
  type: "Podcast",
  duration: 480, // seconds
  transcript: [
    { time: 0, text: "Welcome to your Daily News Brief." },
    { time: 3, text: "Today we're covering the latest developments in technology and business." },
    { time: 8, text: "First up, major tech companies announced new AI initiatives." },
    { time: 14, text: "These developments are expected to revolutionize how we work and communicate." },
    { time: 20, text: "In business news, the stock market showed positive gains today." },
    { time: 26, text: "Experts attribute this to improved economic indicators." },
    { time: 32, text: "Now let's dive deeper into today's top story." },
    { time: 38, text: "Artificial intelligence continues to transform industries." },
    { time: 44, text: "From healthcare to education, AI applications are expanding rapidly." },
    { time: 50, text: "Thank you for listening to the Daily News Brief." },
  ],
  vocabulary: [
    { word: "initiatives", definition: "new plans or strategies to achieve something" },
    { word: "revolutionize", definition: "to completely change something" },
    { word: "indicators", definition: "signs that show the state of something" },
    { word: "expanding", definition: "growing or increasing in size or scope" },
  ],
};

const ListeningContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [loopSection, setLoopSection] = useState<{start: number; end: number} | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentTranscriptIndex = () => {
    for (let i = sampleAudio.transcript.length - 1; i >= 0; i--) {
      if (currentTime >= sampleAudio.transcript[i].time) {
        return i;
      }
    }
    return 0;
  };

  const handleTimelineClick = (time: number) => {
    setCurrentTime(time);
  };

  // Simulate playback
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= sampleAudio.duration) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
  };

  const currentTranscriptIndex = getCurrentTranscriptIndex();

  return (
    <MobileLayout showNav={false}>
      <PageHeader title={sampleAudio.title} showBack />

      <div className="flex-1 flex flex-col">
        {/* Audio Visualization */}
        <div className="px-6 py-8 bg-gradient-to-b from-secondary/10 to-transparent">
          <motion.div
            className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-lg"
            animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <span className="text-5xl">🎙️</span>
          </motion.div>
          <h2 className="text-center font-semibold mt-4">{sampleAudio.title}</h2>
          <p className="text-center text-sm text-muted-foreground">{sampleAudio.type}</p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <Slider
            value={[currentTime]}
            max={sampleAudio.duration}
            step={1}
            onValueChange={(value) => setCurrentTime(value[0])}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(sampleAudio.duration)}</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              className="p-3 rounded-full hover:bg-muted"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-secondary-foreground" />
              ) : (
                <Play className="w-7 h-7 text-secondary-foreground ml-1" />
              )}
            </button>
            <button
              onClick={() => setCurrentTime(Math.min(sampleAudio.duration, currentTime + 10))}
              className="p-3 rounded-full hover:bg-muted"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={() => setPlaybackSpeed(playbackSpeed === 2 ? 0.5 : playbackSpeed + 0.25)}
              className="px-3 py-1 rounded-full bg-muted text-sm font-medium"
            >
              {playbackSpeed}x
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full hover:bg-muted"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setLoopSection(loopSection ? null : { start: currentTime, end: currentTime + 10 })}
              className={`p-2 rounded-full hover:bg-muted ${loopSection ? "text-secondary" : ""}`}
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 border-t border-border overflow-hidden">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full flex items-center justify-between px-6 py-3 hover:bg-muted/50"
          >
            <span className="font-medium">Transcript</span>
            <Lightbulb className={`w-5 h-5 ${showTranscript ? "text-secondary" : "text-muted-foreground"}`} />
          </button>
          
          {showTranscript && (
            <div className="px-6 pb-4 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {sampleAudio.transcript.map((line, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimelineClick(line.time)}
                    className={`block w-full text-left p-2 rounded-lg transition-colors ${
                      index === currentTranscriptIndex
                        ? "bg-secondary/10 text-secondary font-medium"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="text-xs opacity-60 mr-2">{formatTime(line.time)}</span>
                    {line.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="border-t border-border bg-card p-4 safe-area-inset-bottom">
          <Button
            className="w-full gradient-secondary"
            onClick={() => navigate("/vocabulary/practice")}
          >
            Take Comprehension Quiz
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ListeningContent;
