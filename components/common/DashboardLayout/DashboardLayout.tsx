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
import { Icons} from "../../../utils";
import AddProjectLink from "../AddProjectLink";
import useMessages from "../../../hooks/useMessages";
import useReports from "../../../hooks/useReports";
import useAuth from "../../../hooks/useAuth";
import useUI from "../../../hooks/useUI";
import Toast from "../../ui/Toast";
import useProjects from '../../../hooks/useProjects';
import useAddProject from '../../../hooks/useAddProject';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface Link {
  icon: Icons;
  href: string;
  title: string;
}

export const mainLinks: Link[] = [
  { icon: "dashboard", href: "dashboard", title: "Dashboard" },
  { icon: "project", href: "projects", title: "Projects" },
  { icon: "report", href: "reports", title: "Reports" },
  { icon: "message", href: "messages", title: "Messages" },
];
export const minorLinks: Link[] = [
  { icon: "setting", href: "settings", title: "Setting" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { unRead: unreadMessages } = useMessages();
  const { unRead: unreadReports } = useReports();
  const { logoutHandler } = useAuth();
  const { status, toastIsVisible, message, closeToastHandler } = useUI();
  const { projects } = useProjects();
  const {sendRequest: addProject} = useAddProject(false);
  

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
                  <span role='button' aria-label='collapse-button' onClick={toggleCollapseHandler}>
                    {isCollapsed ? (
                      <ChevronDoubleRightIcon data-testid='expand' className="h-5 w-5 text-slate-500" />
                    ) : (
                      <ChevronDoubleLeftIcon data-testid='collapse' className="h-5 w-5 text-slate-500" />
                    )}
                  </span>
                </div>
                <div className="mt-5">
                  <Logo collapse={isCollapsed} />
                </div>
              </div>
              <div className="h-[calc(100vh-124px)] space-y-14 overflow-auto flex flex-col justify-between">
                <div className="flex-1">
                  <NavLink
                    className="capitalize"
                    collapsed={isCollapsed}
                    href="/dashboard"
                    icon="dashboard"
                  >
                    Dashboard
                  </NavLink>
                  <AddProjectLink
                    collapsed={isCollapsed}
                    projects={projects}
                    onAddProject={addProject}
                    href={"/dashboard/projects"}
                    icon="project"
                  >
                    Projects
                  </AddProjectLink>
                  <NavLink
                    className="capitalize"
                    collapsed={isCollapsed}
                    pillContent={unreadReports}
                    href="/dashboard/reports"
                    icon="report"
                  >
                    Reports
                  </NavLink>
                  <NavLink
                    className="capitalize"
                    collapsed={isCollapsed}
                    pillContent={unreadMessages}
                    href="/dashboard/messages"
                    icon="message"
                  >
                    Messages
                  </NavLink>
                </div>
                <div className="flex-1 flex flex-col pb-5 justify-center">
                  {minorLinks.map(({ href, title, icon }) => (
                    <NavLink
                      className="capitalize"
                      key={href}
                      collapsed={isCollapsed}
                      href={`/dashboard/${href}`}
                      icon={icon}
                    >
                      {title}
                    </NavLink>
                  ))}
                  <NavLink
                    onClick={logoutHandler}
                    className="capitalize"
                    collapsed={isCollapsed}
                    icon={"logout"}
                  >
                    Logout
                  </NavLink>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.nav>
        <motion.div
          layout
          className="md:flex-1 flex flex-col h-screen overflow-hidden"
        >
          <MobileHeader />
          <Toast
            isVisible={toastIsVisible}
            status={status}
            message={message}
            onClose={closeToastHandler}
          />
          <div className="bg-white pb-10 md:pb-0 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <main className="flex-1">{children}</main>
            <DashboardFooter />
          </div>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default DashboardLayout;
