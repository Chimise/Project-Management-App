import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { icons } from "../../../utils";
import cn from "classnames";
import { Disclosure } from "@headlessui/react";
import { NavLinkProps } from "../NavLink/NavLink";
import { PlayIcon, PlusIcon } from "@heroicons/react/24/solid";
import ProjectList from './ProjectList';
import {Project} from '../../../hooks/useProject';

type AddProjectLinkProps = Omit<NavLinkProps, "pillContent"> & {
  onAddProject: (values: {name: string}) => void;
  projects: Array<Project> | undefined;
};

const AddProjectLink = ({
  href,
  onClick,
  icon,
  className,
  children,
  collapsed,
  onAddProject,
  projects
}: AddProjectLinkProps) => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const isActive = router.pathname === href;
  const Icon = icons[icon];
  

  const handleSubmit = (event: React.MouseEvent<any>) => {
    event.stopPropagation();
    if (value.length === 0) {
      return;
    }
    onAddProject({name: value});
    setValue('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleClick = (event: React.MouseEvent<any>) => {
    event.stopPropagation();
    router.push(href!);
    if(onClick) {
      onClick(event);
    }
  }

  const handleProjectClick = (event: React.MouseEvent<any>, id: number) => {
    event.stopPropagation();
    router.push({
      pathname: '/dashboard/projects/[id]',
      query: {
        id
      }
    })
  }
  

  return (
      <Disclosure
        as="div"
        className={cn(
          "inline-flex flex-col space-y-0.5 w-full text-lg group overflow-hidden transition-color duration-150 text-md",
          {
            "bg-white": !isActive,
            "bg-gray-100": isActive,
          },
          className
        )}
        defaultOpen={true}
      >
        {({ open }) => (
          <>
            <span
              className={cn(
                "inline-flex items-center py-3 border-l-4 border-transparent text-black font-bold group-hover:border-black pl-3 pr-5 relative flex-1 space-x-2",
                { "justify-center": collapsed }
              )}
              onClick={handleClick}
              data-testid='disclosure-panel'
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
                    value={value}
                    onChange={handleChange}
                    type='text'
                    autoComplete="off"
                    className="w-9/12 block self-end p-1 bg-transparent border-0 border-b-2 text-sm focus:ring-0 border-b-gray-400/60 focus:border-b-gray-400/80 focus:outline-none placeholder-gray-500 placeholder:text-sm placeholder:font-light"
                    placeholder="Add Project..."
                  />
                  <button onClick={handleSubmit} className="shrink-0 font-bold">
                    <PlusIcon className="w-4 h-4 text-black" />
                  </button>
                </div>
                {<div className="w-full space-y-1">
                    {projects && projects.map(proj => <ProjectList onClick={(event) => handleProjectClick(event, proj.id)} key={proj.id} project={proj} />)}
                </div>}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
  );
};

export default AddProjectLink;
