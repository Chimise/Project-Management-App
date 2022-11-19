import React, { useState } from "react";
import cn from "classnames";
import { Transition } from "@headlessui/react";
import Badge from "../../ui/Badge";
import { icons } from "../../../utils";
import IconBox from "../IconBox";
import PrimaryCard from "../../ui/PrimaryCard";
import { ProjectSchema } from "../../../models/Project";
import { useRouter } from "next/router";
import useTasks from '../../../hooks/useTasks';

interface ProjectCardProps {
  project: ProjectSchema;
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  const {created, progress, completed, tasks} = useTasks(project.id.toString());

  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const Icon = icons["project"];
  return (
    <PrimaryCard
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("flex p-2 overflow-hidden flex-col group", className)}
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
    >
      <div className="flex-1 flex flex-col items-center justify-evenly">
        <Badge>
          <Icon className="w-5 h-5 text-white" />
        </Badge>
        <div className="truncate overflow-hidden">
          <h3 className="font-semibold text-2xl">{project.name}</h3>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-around">
        <Transition
          show={isHovering}
          enter="duration-200 ease-in"
          enterFrom="opacity-0 translate-x-full"
          enterTo="opacity-1 translate-x-0"
          leave="duration-150"
          leaveFrom="opacity-1 translate-x-0"
          leaveTo="opacity-0 translate-x-full"
        >
          <p className="text-teal-600 font-extralight">Click to open!</p>
        </Transition>
        <div className="flex-1" />
        
        {tasks && <div className="flex space-x-3 py-2">
          <IconBox
            status={0}
            value={created!.length}
            className="group-hover:text-primary"
          />
          <IconBox
            status={1}
            value={progress!.length}
            className="group-hover:text-primary"
          />
          <IconBox
            status={2}
            value={completed!.length}
            className="group-hover:text-primary"
          />
        </div>}
      </div>
    </PrimaryCard>
  );
};

export default ProjectCard;
