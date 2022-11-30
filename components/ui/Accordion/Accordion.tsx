import React, { useState } from "react";
import cn from 'classnames';
import { Disclosure, Transition } from "@headlessui/react";

type IconProps = React.ComponentProps<"svg"> & {
  title?: string;
  titleId?: string;
};

interface AccordionProps {
  openIcon: React.JSXElementConstructor<IconProps>;
  closeIcon?: React.JSXElementConstructor<IconProps>;
  title: string;
  children: React.ReactNode;
  onView: () => void;
  viewed: boolean;
}

const Accordion = ({
  openIcon: OpenIcon,
  closeIcon: CloseIcon,
  title,
  children,
  onView,
  viewed
}: AccordionProps) => {
  const Icon = CloseIcon || OpenIcon;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Disclosure data-viewed={viewed} as="div" className="w-full transition-all duration-200 hover:-translate-x-1 hover:bg-primary/10">
      {({ open }) => (
        <>
          <Disclosure.Button
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onClick={onView}
            className="flex items-center p-3 overflow-hidden w-full"
          >
            <div className="w-10 flex justify-center text-primary items-center">
              {viewed ? (
                <OpenIcon className="w-7 h-7 text-primary opacity-50" />
              ) : (
                <Icon className="w-7 h-7 text-primary" />
              )}
            </div>
            <div className="flex flex-1 px-3 items-center justify-between">
            <h6 className={cn('text-base md:text-lg text-black', {'font-medium': !viewed, 'font-normal': viewed})}>{title}</h6>
              <Transition
                show={isVisible}
                enter="transition-all duration-200"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-1 translate-x-0"
                leave="transition-all duration-200"
                leaveFrom="opacity-1 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <div  className="text-primary text-sm">Click to {open ? "Close" : "Open"}</div>
              </Transition>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full flex min-h-[40px] px-3 pb-3">
            <div className="w-10 flex justify-center items-stretch">
              <span className={cn("h-full w-1 bg-primary", {'opacity-50': viewed, 'opacity-100': !viewed})} />
            </div>
            <div className="flex-1 px-3">{children}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
