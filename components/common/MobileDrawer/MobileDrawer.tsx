import React from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import MobileLogo from './MobileLogo';
import {XMarkIcon} from '@heroicons/react/24/solid';
import {minorLinks, mainLinks} from '../DashboardLayout';
import NavLink from '../NavLink';

interface MobileDashboardLayoutProps {
  visible: boolean;
  onClose: () => void;
}

const navbarVariants: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.4
    },
  },
};

const backdropVariant: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
}

const containerVariant:Variants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.5

    }
  },
  hidden: {
    opacity: 0
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      when: 'afterChildren',
      staggerChildren: 0.5,
      staggerDirection: -1
    }
  }
}

const MobileDrawer = ({ visible, onClose }: MobileDashboardLayoutProps) => {
  return (
    <AnimatePresence>
      {visible && <motion.div key="drawer" variants={containerVariant} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 overflow-hidden">
        <motion.div
          onClick={onClose}
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute block md:hidden inset-0 z-10 bg-black/70"
        />
        <motion.div
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute block md:hidden right-0 inset-y-0 w-[70%] z-50 bg-white"
        >
          <div className="w-full flex justify-between items-center px-5 h-[72px] border-b border-slate-300">
            <MobileLogo collapsed={true} />
            <div onClick={onClose} className="shrink-0">
              <XMarkIcon className="w-6 h-6 text-color-black/80" />
            </div>
          </div>
          <nav className="overflow-y-auto h-[calc(100vh-72px)] py-8">
          <div className="mb-28">
                  {mainLinks.map(link => (
                    <NavLink className="capitalize" key={link} collapsed={false} badgeContent={link === 'dashboard' ? null : 2} href={`/dashboard/${link === 'dashboard' ? '' : link}`} icon={link}>{link}</NavLink>
                  ))}
              </div>
              <div>
              {minorLinks.map(link => (
                    <NavLink className="capitalize" key={link} collapsed={false} badgeContent={null} href={`/dashboard/${link}`} icon={link}>{link}</NavLink>
                  ))}
              </div>
          </nav>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
};

export default MobileDrawer;
