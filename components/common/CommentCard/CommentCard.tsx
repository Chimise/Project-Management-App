import React from "react";
import cn from "classnames";
import moment from "moment";
import { Status } from "../../../utils";
import { Comment } from "../../../store/TaskContext/TaskContext";
import { ChatBubbleLeftIcon, StarIcon, TrashIcon, HeartIcon } from "@heroicons/react/24/solid";

interface CommentCardProps {
  status: Status;
  comment: Comment;
  onAddFavourite: () => void;
  onRemove: () => void;
  onLike: () => void;
}

const CommentCard = ({ status, comment, onAddFavourite, onLike, onRemove }: CommentCardProps) => {
    const {message, like, favourite, createdAt} = comment;
  return (
    <li
      className={cn("flex transition-all hover:-translate-x-1 duration-300 divide-x-4 py-2", {
        "divide-primary": status === 0,
        "divide-progress": status === 1,
        "divide-completed": status === 2,
      }, {
        'hover:bg-primary/20': status === 0,
        'hover:bg-progress/20': status === 1,
        'hover:bg-completed/20': status === 2
      })}
    >
      <div className="shrink-0 w-16 flex items-center justify-center">
        <ChatBubbleLeftIcon
          className={cn("w-10 h-10", {
            "text-primary": status === 0,
            "text-progress": status === 1,
            "text-completed": status === 2,
          })}
        />
      </div>
      <div className="flex-1 flex items-center space-x-1.5 lg:space-x-2 px-3 lg:px-4">
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-900">Botty Bot</h4>
          <div className="block font-light text-sm text-gray-700 mt-0.5">
            {moment(createdAt).format("dddd D MMMM, YYYY")} |{" "}
            <time>{moment(createdAt).format("H:ss")}</time>
          </div>
          <p className="text-gray-700 text-base mt-1">{message}</p>
        </div>
        <div className={cn("shrink-0 flex items-center space-x-2")}>
          <StarIcon onClick={onLike} className={cn("w-5 h-5 cursor-pointer transition-transform duration-200 hover:scale-125 lg:w-7 lg:h-7", {'text-primary': status === 0, 'text-progress': status === 1, 'text-completed': status === 2}, {'opacity-100': like, 'opacity-50': !like})} />
          <HeartIcon onClick={onAddFavourite} className={cn("w-5 h-5 cursor-pointer transition-transform duration-200 hover:scale-125 lg:w-7 lg:h-7", {'text-primary': status === 0 , 'text-progress': status === 1, 'text-completed': status === 2}, {'opacity-100': favourite, 'opacity-50': !favourite})} />
          <TrashIcon onClick={onRemove} className={cn("w-5 h-5 cursor-pointer transition-transform duration-200 hover:scale-125 lg:w-7 opacity-50 lg:h-7", {'text-primary': status === 0, 'text-progress': status === 1, 'text-completed': status === 2 }, )} />
        </div>
      </div>
    </li>
  );
};

export default CommentCard;
