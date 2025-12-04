import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  className?: string;
}

export const PageHeader = ({ title, showBack = false, rightAction, className = "" }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.header
      className={`sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-background/95 backdrop-blur-lg border-b border-border ${className}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors tap-highlight-none"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg font-semibold truncate">{title}</h1>
      </div>
      {rightAction && <div className="flex items-center">{rightAction}</div>}
    </motion.header>
  );
};
