import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProfileSetup from "./pages/profile/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import LearnHub from "./pages/learn/LearnHub";
import ReadingModule from "./pages/learn/reading/ReadingModule";
import ReadingContent from "./pages/learn/reading/ReadingContent";
import ListeningModule from "./pages/learn/listening/ListeningModule";
import ListeningContent from "./pages/learn/listening/ListeningContent";
import SpeakingModule from "./pages/learn/speaking/SpeakingModule";
import SpeakingPractice from "./pages/learn/speaking/SpeakingPractice";
import SpeakingFeedback from "./pages/learn/speaking/SpeakingFeedback";
import WritingModule from "./pages/learn/writing/WritingModule";
import WritingExercise from "./pages/learn/writing/WritingExercise";
import WritingFeedback from "./pages/learn/writing/WritingFeedback";
import VocabularyDashboard from "./pages/vocabulary/VocabularyDashboard";
import VocabularyPractice from "./pages/vocabulary/VocabularyPractice";
import Library from "./pages/Library";
import ProgressPage from "./pages/Progress";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Flow */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/profile/setup" element={<ProfileSetup />} />
          
          {/* Main App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<LearnHub />} />
          <Route path="/learn/reading" element={<ReadingModule />} />
          <Route path="/learn/reading/content/:id" element={<ReadingContent />} />
          <Route path="/learn/listening" element={<ListeningModule />} />
          <Route path="/learn/listening/content/:id" element={<ListeningContent />} />
          <Route path="/learn/speaking" element={<SpeakingModule />} />
          <Route path="/learn/speaking/practice" element={<SpeakingPractice />} />
          <Route path="/learn/speaking/feedback" element={<SpeakingFeedback />} />
          <Route path="/learn/speaking/feedback/:id" element={<SpeakingFeedback />} />
          <Route path="/learn/writing" element={<WritingModule />} />
          <Route path="/learn/writing/exercise/:id" element={<WritingExercise />} />
          <Route path="/learn/writing/feedback/:id" element={<WritingFeedback />} />
          <Route path="/vocabulary" element={<VocabularyDashboard />} />
          <Route path="/vocabulary/practice" element={<VocabularyPractice />} />
          <Route path="/library" element={<Library />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
