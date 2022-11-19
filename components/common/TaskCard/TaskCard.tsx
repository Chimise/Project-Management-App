import React from "react";
import moment from "moment";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import PrimaryCard from "../../ui/PrimaryCard";
import {Task} from '../../../hooks/useAddTask';


interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
    task: Task,
}

const TaskCard = ({task, ...props}: TaskCardProps) => {
  
  return (
    <PrimaryCard
      as="li"
      className="flex cursor-pointer flex-col w-full h-40 p-2"
      {...props}
    >
      <div className="flex-1">
        <h5 className="font-semibold text-lg">{task.name}</h5>
        <p className="text-sm text-gray-400 mt-1">
          Botty Bot, {moment(task.created_at).format("D MMM YYYY")}
        </p>
        <p className="text-sm font-base text-gray-800 mt-2">
          {task.description}
        </p>
      </div>
      <div className="flex justify-between">
        <span className="uppercase font-medium text-sm text-yellow-600">
          {task.tag}
        </span>
        <span className="inline-flex items-center space-x-1 text-gray-500">
          <ChatBubbleLeftIcon className="w-5 h-5" />
          <span>{task.comments.length}</span>
        </span>
      </div>
    </PrimaryCard>
  );
};

export default TaskCard;
