import React, { useState } from "react";
import cn from "classnames";
import { Transition } from "@headlessui/react";
import Badge from "../../ui/Badge";
import { icons } from "../../../utils";
import IconBox from "../IconBox";
import PrimaryCard from "../../ui/PrimaryCard";
import { Project } from "../../../store/TaskContext";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({project }: ProjectCardProps) => {
  const created = project.tasks.filter((proj) => proj.status === 0).length;
  const progress = project.tasks.filter((proj) => proj.status === 1).length;
  const completed = project.tasks.filter((proj) => proj.status === 2).length;

  const [isHovering, setIsHovering] = useState(false);
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
      className={cn("flex w-64 p-2 h-48 overflow-hidden flex-col group")}
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
        <div className="flex space-x-3">
          <IconBox
            status={0}
            value={created}
            className="group-hover:text-primary"
          />
          <IconBox
            status={1}
            value={progress}
            className="group-hover:text-primary"
          />
          <IconBox
            status={2}
            value={completed}
            className="group-hover:text-primary"
          />
        </div>
      </div>
    </PrimaryCard>
  );
};

export default ProjectCard;
