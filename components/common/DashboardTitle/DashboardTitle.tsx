import React from "react";
import Badge from "../../ui/Badge";
import { icons, Icons } from "../../../utils";
import cn from "classnames";

interface DashboardTitleProps {
  icon: Icons;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const DashboardTitle = ({
  icon,
  title,
  children,
  className,
}: DashboardTitleProps) => {
  const Icon = icons[icon];
  return (
    <div className={cn("flex space-x-4", {'items-center': !children, 'items-start': children}, className)}>
      <Badge>
        <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
      </Badge>
      <div>
        <h2 className="text-2xl sm:text-4xl font-semibold tracking-wide text-slate-800">
          {title}
        </h2>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default DashboardTitle;
