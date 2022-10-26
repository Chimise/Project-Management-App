import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

interface DashboardHeaderProps {
  title: string;
}

const buttonVariant: Variants = {
  initial: {
    rotate: 0,
    transition: {
      mass: 0.8,
      stiffness: 140,
      damping: 8
    },
  },
  animate: {
    rotate: 720,
    transition: {
      mass: 0.8,
      stiffness: 120,
      damping: 8
    },
  },
};

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const onEnterHandler = () => {
    setIsHovering(true);
  };
  const onLeaveHandler = () => {
    setIsHovering(false);
  };
  return (
    <header className="flex items-center justify-between py-2 my-2 relative">
      <p className="text-gray-800 text-base font-normal">
        Welcome to your <span className="font-medium text-black">{title}</span>
      </p>
      <div
        onMouseEnter={onEnterHandler}
        onMouseLeave={onLeaveHandler}
        className="p-2 bg-primary rounded-full inline-flex items-center justify-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
          variants={buttonVariant}
          whileHover={{ scale: 1.2 }}
          initial={false}
          animate={isHovering ? "animate" : "initial"}
        >
          <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
        </motion.svg>
      </div>
      <motion.div>
        
      </motion.div>
    </header>
  );
};

export default DashboardHeader;