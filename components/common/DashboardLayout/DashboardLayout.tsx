import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { dashboardNavVariant } from "../../../animations";
import Logo from "../Logo";
import NavLink from "../NavLink";
import MobileHeader from "../MobileDrawer/MobileHeader";
import DashboardFooter from "../DashboardFooter";
import { Icons } from "../../../utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface Link {
  icon: Icons;
  href: string;
  title: string;
}

export const mainLinks: Link[] = [{icon: 'dashboard', href: 'dashboard', title: 'Dashboard'}, {icon: 'project', href: 'project', title: 'Projects'}, {icon: 'report', href: 'report', title: 'Reports'}, {icon: 'message', href: 'message', title: 'Messages'}]
export const minorLinks: Link[] = [{icon: 'setting', href: 'setting', title: 'Setting'}, {icon: 'logout', href: 'logout', title: 'Logout'}]


const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openMenuHandler = () => {
    setIsVisible(true);
  };

  const closeMenuHandler = () => {
    setIsVisible(false);
  };

  const toggleCollapseHandler = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="md:flex">
      <LayoutGroup>
        <motion.nav
          variants={dashboardNavVariant}
          initial="initial"
          animate={isCollapsed ? "animate" : "initial"}
          layout
          className="hidden relative md:shrink-0 md:block md:h-screen overflow-y-hidden"
        >
          <motion.div
            layout
            variants={dashboardNavVariant}
            className="fixed shadow-md top-0 left-0 h-full lg:bg-white"
          >
            <div className="flex flex-col space-y-3 my-3">
              <div className="h-28">
                <div className="flex justify-end px-3">
                  <span onClick={toggleCollapseHandler}>
                    {isCollapsed ? (
                      <ChevronDoubleRightIcon className="h-5 w-5 text-slate-500" />
                    ) : (
                      <ChevronDoubleLeftIcon className="h-5 w-5 text-slate-500" />
                    )}
                  </span>
                </div>
                <div className="mt-5">
                  <Logo collapse={isCollapsed} />
                </div>
              </div>
              <div className="h-[calc(100vh-124px)] space-y-14 overflow-auto flex flex-col justify-between">
                <div className="flex-4">
                  {mainLinks.map(({title, href, icon}) => (
                    <NavLink
                      className="capitalize"
                      key={href}
                      collapsed={isCollapsed}
                      pillContent={href === "dashboard" ? null : 2}
                      href={`/dashboard/${href === "dashboard" ? "" : href}`}
                      icon={icon}
                    >
                      {title}
                    </NavLink>
                  ))}
                </div>
                <div className="flex-1">
                  {minorLinks.map(({href, title, icon}) => (
                    <NavLink
                      className="capitalize"
                      key={href}
                      collapsed={isCollapsed}
                      pillContent={null}
                      href={`/dashboard/${href}`}
                      icon={icon}
                    >
                      {title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.nav>
        <motion.div
          layout
          className="md:flex-1 flex flex-col h-screen overflow-hidden"
        >
          <MobileHeader
            onOpen={openMenuHandler}
            onClose={closeMenuHandler}
            isVisible={isVisible}
          />
          <div className="bg-white flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <main className="flex-1">{children}</main>
            <DashboardFooter />
          </div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default DashboardLayout;
