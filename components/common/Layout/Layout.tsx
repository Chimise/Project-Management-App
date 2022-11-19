import React, { Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import Toast from "../../ui/Toast";
import useUI from "../../../hooks/useUI";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { toastIsVisible, status, message, closeToastHandler } = useUI();
  return (
    <Fragment>
      <Toast
        isVisible={toastIsVisible}
        status={status}
        message={message}
        onClose={closeToastHandler}
      />
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </Fragment>
  );
};

export default Layout;
