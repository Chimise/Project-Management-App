import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Pill from "../../ui/Pill/Pill";
import {icons, Icons} from '../../../utils'
import { Transition } from "@headlessui/react";
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";



export interface NavLinkProps extends LinkProps {
  onClick?: (event: React.MouseEvent<any>) => void;
  children: React.ReactNode;
  className?: string;
  icon: Icons;
  collapsed: boolean;
  pillContent?: number;
}


const NavLink = ({
  href,
  onClick,
  children,
  icon,
  className,
  collapsed,
  pillContent,
}: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  const Icon = icons[icon];

  const clickHandler = (event: React.MouseEvent<any>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Link href={href}>
      <a
        className={cn(
          "inline-flex w-full px-3 py-3 text-lg group space-x-2 overflow-hidden font-bold transition-color text-black duration-150 text-md border-l-4 border-transparent hover:border-black items-center",
          {
            "bg-gray-100": isActive,
            "bg-white": !isActive
          },
          className
        )}
        onClick={clickHandler}
      >
        <span className={cn("inline-flex items-center relative flex-1 space-x-2", {'justify-center': collapsed})}>
            <Icon
              className={cn(
                "w-5 h-5 text-black stroke-2 shrink-0 transition-transform duration-100",
                { "rotate-90": icon === "logout", "scale-150": collapsed, "scale-100": !collapsed }
              )}
            />
          <Transition className='flex-1 flex items-center' enter='transition-transform duration-200' enterFrom="-translate-x-1" enterTo="translate-x-0" leave='transition-transform duration-200' leaveFrom="translate-x-0" leaveTo="-translate-x-1" show={!collapsed}>
                <Transition.Child as={React.Fragment} >
                <span className="flex-1">{children}</span>
                </Transition.Child>
                <Transition.Child as={React.Fragment}>
                  <Pill value={pillContent} className='shrink-0 group-hover:bg-gray-400' />
                </Transition.Child>
          </Transition>
          <Transition show={Boolean(collapsed && pillContent && pillContent !== 0)} enter='transition-all duration-300' enterFrom="translate-x-8 opacity-0" enterTo="-translate-x-4 opacity-1" leave='transition-opacity duration-200' leaveFrom="-translate-x-4 opacity-1" leaveTo="translate-x-8 opacity-0">
              <ExclamationCircleIcon className="w-5 h-5 text-orange-500 absolute -top-4" />
          </Transition>
        </span>
      </a>
    </Link>
  );
};

export default NavLink;
