import React from "react";
import MobileLogo from "./MobileLogo";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import MobileDrawer from "./MobileDrawer";

interface MobileHeaderProps {
  onOpen: () => void;
  onClose: () => void;
  isVisible: boolean;
}

const MobileHeader = ({ onOpen, onClose, isVisible }: MobileHeaderProps) => {
  return (
    <>
      <header className="md:hidden flex bg-white py-4 px-8 justify-between items-center h-[72px]">
        <MobileLogo />
        <div>
          <Bars3BottomRightIcon
            onClick={onOpen}
            className="w-6 h-6 text-black"
          />
        </div>
      </header>
      <MobileDrawer visible={isVisible} onClose={onClose} />
    </>
  );
};

export default MobileHeader;
