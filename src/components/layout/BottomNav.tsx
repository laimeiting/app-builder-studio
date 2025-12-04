import { NavLink } from "react-router-dom";
import { Home, BookOpen, Library, BarChart3, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/learn", icon: BookOpen, label: "Learn" },
  { to: "/library", icon: Library, label: "Library" },
  { to: "/progress", icon: BarChart3, label: "Progress" },
  { to: "/profile", icon: User, label: "Profile" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-area-inset-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all tap-highlight-none ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
