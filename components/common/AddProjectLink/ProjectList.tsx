import React from "react";
import {
  DocumentIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import type { ProjectSchema } from "../../../models/Project";

interface ProjectListProps {
  project: ProjectSchema;
  onClick: (event: React.MouseEvent<any>) => void;
}

const ProjectList = ({ project, onClick }: ProjectListProps) => {
    
  return (
    <span onClick={onClick} className="flex w-full items-center pr-6 pl-5 text-sm font-medium py-2 text-gray-600 hover:bg-black hover:text-white">
      <div className="flex-1 inline-flex items-center flex-nowrap space-x-1">
        <DocumentIcon className="w-4 h-4" />
        <span className="truncate">{project.name}</span>
      </div>
      <EllipsisHorizontalIcon className="w-4 h-4" />
    </span>
  );
};

export default ProjectList;
