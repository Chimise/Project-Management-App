import React, {useState} from "react";
import { motion, LayoutGroup } from "framer-motion";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from '@heroicons/react/24/solid';
import {dashboardNavVariant} from '../../../animations'
import Logo from '../Logo';
import NavLink from '../NavLink';
import MobileHeader from '../MobileDrawer/MobileHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const mainLinks = ['dashboard', 'projects', 'reports', 'messages'];
export const minorLinks = ['setting', 'logout'];



const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openMenuHandler = () => {
    setIsVisible(true);
  }

  const closeMenuHandler = () => {
    setIsVisible(false);
  }

  const toggleCollapseHandler = () => {
    setIsCollapsed(prev => !prev);
  }
  

  return (
    <div className="md:flex">
      <LayoutGroup>
      <motion.nav variants={dashboardNavVariant} initial='initial' animate={isCollapsed ? 'animate' : 'initial'} layout className="hidden relative lg:shrink-0 lg:block lg:h-screen overflow-y-hidden">
        <motion.div layout variants={dashboardNavVariant} className="fixed shadow-md top-0 left-0 h-full lg:bg-white">
          <div className="flex flex-col overflow-auto space-y-3 my-3">
            <div className="flex justify-end px-3">
              <span onClick={toggleCollapseHandler}>{isCollapsed ? <ChevronDoubleRightIcon className="h-5 w-5 text-slate-500" /> : <ChevronDoubleLeftIcon className="h-5 w-5 text-slate-500" />}</span>
            </div>
            <div>
            <div className="mb-10">
            <Logo collapse={isCollapsed} />
            </div>
              <div className="mb-32">
                  {mainLinks.map(link => (
                    <NavLink className="capitalize" key={link} collapsed={isCollapsed} badgeContent={link === 'dashboard' ? null : 2} href={`/dashboard/${link === 'dashboard' ? '' : link}`} icon={link}>{link}</NavLink>
                  ))}
              </div>
              <div>
              {minorLinks.map(link => (
                    <NavLink className="capitalize" key={link} collapsed={isCollapsed} badgeContent={null} href={`/dashboard/${link}`} icon={link}>{link}</NavLink>
                  ))}
              </div>
              <div>

              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>
      <motion.div layout className="md:flex-1">
        <main className="bg-white h-full">
        <MobileHeader onOpen={openMenuHandler} onClose={closeMenuHandler} isVisible={isVisible} />
          {children}
        </main>
      </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default DashboardLayout;
