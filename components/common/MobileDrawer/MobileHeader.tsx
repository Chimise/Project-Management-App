import React, {useState} from "react";
import MobileLogo from "./MobileLogo";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import MobileDrawer from "./MobileDrawer";
import { Router, useRouter } from "next/router";



const MobileHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openMenuHandler = () => {
    setIsVisible(true);
  };

  const closeMenuHandler = () => {
    setIsVisible(false);
  };

  const { push } = useRouter();
  return (
    <>
      <header className="md:hidden flex bg-white py-4 px-8 justify-between items-center h-[72px]">
        <span data-testid='logo' onClick={() => push("/dashboard")}>
          <MobileLogo />
        </span>
        <div>
          <Bars3BottomRightIcon
            id='open-button'
            aria-hidden='false'
            onClick={openMenuHandler}
            className="w-6 h-6 text-black"
            role="button"
            aria-label="open-button"
          />
        </div>
      </header>
      <MobileDrawer visible={isVisible} onClose={closeMenuHandler} />
    </>
  );
};

export default MobileHeader;
