import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { icons } from "../../../utils";
import cn from "classnames";
import { Disclosure } from "@headlessui/react";
import { NavLinkProps } from "../NavLink/NavLink";
import { PlayIcon, PlusIcon } from "@heroicons/react/24/solid";
import useProjects from "../../../hooks/useProjects";
import ProjectList from './ProjectList';

type AddProjectLinkProps = Omit<NavLinkProps, "pillContent">;

const AddProjectLink = ({
  href,
  onClick,
  icon,
  className,
  children,
  collapsed,
}: AddProjectLinkProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isActive = router.pathname === href;
  const Icon = icons[icon];
  const { addProject, projects } = useProjects();

  const clickHandler = (event: React.MouseEvent<any>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleSubmit = (event: React.MouseEvent<any>) => {
    if (!inputRef.current || inputRef.current.value.length === 0) {
      return;
    }
    console.log(inputRef.current.value);
    addProject(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <Link href={href} passHref>
      <Disclosure
        as="a"
        className={cn(
          "inline-flex flex-col space-y-0.5 w-full text-lg group overflow-hidden transition-color duration-150 text-md",
          {
            "bg-white": !isActive,
            "bg-gray-100": isActive,
          },
          className
        )}
        defaultOpen={isActive}
        onClick={clickHandler}
      >
        {({ open }) => (
          <>
            <span
              className={cn(
                "inline-flex items-center py-3 border-l-4 border-transparent text-black font-bold group-hover:border-black pl-3 pr-5 relative flex-1 space-x-2",
                { "justify-center": collapsed }
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 text-black shrink-0 transition-transform duration-100",
                  {
                    "rotate-90": icon === "logout",
                    "scale-150": collapsed,
                    "scale-100": !collapsed,
                  }
                )}
              />
              {!collapsed && <span className="flex-1">{children}</span>}
              {!collapsed && (
                <Disclosure.Button className="focus-visible:outline-none shrink-0">
                  <PlayIcon
                    className={cn(
                      "w-4 h-4 font-bold text-black transition-transform duration-150",
                      { "rotate-90": open, "-rotate-90": !open }
                    )}
                  />
                </Disclosure.Button>
              )}
            </span>
            <Disclosure.Panel
              className={cn("w-full", { hidden: collapsed, block: !collapsed })}
            >
              <div className="border-0 w-[90%] border-l-[3px] border-gray-400/60 space-y-2 ml-auto">
                <div
                  className="flex w-full justify-end pr-5 space-x-2"
                >
                  <input
                    ref={inputRef}
                    type='text'
                    autoComplete="off"
                    className="w-9/12 block self-end p-1 bg-transparent border-0 border-b-2 text-sm focus:ring-0 border-b-gray-400/60 focus:border-b-gray-400/80 focus:outline-none placeholder-gray-500 placeholder:text-sm placeholder:font-light"
                    placeholder="Add Project..."
                  />
                  <button onClick={handleSubmit} className="shrink-0 font-bold">
                    <PlusIcon className="w-4 h-4 text-black" />
                  </button>
                </div>
                <div className="w-full space-y-1">
                    {projects.map(proj => <ProjectList key={proj.id} project={proj} />)}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </Link>
  );
};

export default AddProjectLink;
