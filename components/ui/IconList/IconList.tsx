import React from "react";
import Badge from "../../ui/Badge";
import { icons, Icons } from "../../../utils";
import cn from "classnames";

interface DashboardTitleProps {
  icon: Icons;
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements
}

const IconList = ({
  icon,
  children,
  className,
  as: Wrapper = 'li'
}: DashboardTitleProps) => {
  const Icon = icons[icon];
  return (
    <Wrapper className={cn("flex items-center space-x-2", className)}>
      <Badge>
        <Icon className="w-4 h-4 text-white" />
      </Badge>
      <div>
        {children}
      </div>
    </Wrapper>
  );
};

export default IconList;
