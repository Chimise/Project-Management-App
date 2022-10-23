import React, {useState, useEffect} from "react";
import { motion, LayoutGroup } from "framer-motion";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from '@heroicons/react/24/solid';
import {dashboardNavVariant} from '../../../animations'
import Logo from '../Logo/Logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}



const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapseHandler = () => {
    setIsCollapsed(prev => !prev);
  }
  

  return (
    <div className="lg:flex">
      <LayoutGroup>
      <motion.nav variants={dashboardNavVariant} initial='initial' animate={isCollapsed ? 'animate' : 'initial'} layout className="hidden relative lg:shrink-0 lg:block lg:h-screen overflow-y-hidden">
        <motion.div layout variants={dashboardNavVariant} className="fixed shadow-md top-0 left-0 h-full lg:bg-white">
          <div className="flex flex-col overflow-auto space-y-3 px-3 py-4">
            <div className="flex justify-end">
              <span onClick={toggleCollapseHandler}>{isCollapsed ? <ChevronDoubleRightIcon className="h-5 w-5 text-slate-500" /> : <ChevronDoubleLeftIcon className="h-5 w-5 text-slate-500" />}</span>
            </div>
            <Logo collapse={isCollapsed} />
          </div>
        </motion.div>
      </motion.nav>
      <motion.div layout className="lg:flex-1">
        <main className="bg-white h-full overflow-y-auto">{children}</main>
      </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default DashboardLayout;
