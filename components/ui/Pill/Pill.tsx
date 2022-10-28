import React from "react";
import cn from "classnames";
import { motion, AnimateSharedLayout } from "framer-motion";

interface PillProps {
  children: React.ReactNode;
  className?: string;
  collapsed: boolean;
}

const Pill = ({ children, className, collapsed }: PillProps) => {
  return (
    <AnimateSharedLayout>
      {collapsed && (
        <motion.svg
          key="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-orange-300 absolute -top-2 left-[40%]"
          layoutId="pill"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clip-rule="evenodd"
          />
        </motion.svg>
      )}
      {!collapsed && (
        <motion.div
          key="badge"
          layoutId="badge"
          className={cn(
            "py-px px-4 bg-orange-200 rounded-xl text-sm",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimateSharedLayout>
  );
};

export default Pill;
