import { ReactNode } from "react";
import { motion } from "framer-motion";
import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

export const MobileLayout = ({ children, showNav = true, className = "" }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.main
        className={`flex-1 overflow-y-auto ${showNav ? "pb-20" : ""} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.main>
      {showNav && <BottomNav />}
    </div>
  );
};
