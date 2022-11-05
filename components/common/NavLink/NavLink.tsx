import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Pill from "../../ui/Pill/Pill";
import {icons, Icons} from '../../../utils'



interface NavLinkProps extends LinkProps {
  onClick?: (event: React.MouseEvent<any>) => void;
  children: React.ReactNode;
  className?: string;
  icon: Icons;
  collapsed: boolean;
  pillContent?: any;
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
          "inline-flex w-full px-3 py-3 text-lg group space-x-2 overflow-hidden font-bold transition-color text-black duration-150 text-md border-l-4 border-transparent hover:border-black hover:bg-gray-100 items-center",
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
                "w-5 h-5 text-black shrink-0 transition-transform duration-100",
                { "rotate-90": icon === "logout", "scale-150": collapsed, "scale-100": !collapsed }
              )}
            />
          
          {!collapsed && <span className="flex-1">{children}</span>}
          
          {pillContent && (
            <Pill collapsed={collapsed} className={cn("shrink-0", {'group-hover:bg-gray-400': !collapsed})}>
              {pillContent}
            </Pill>
          )}
        </span>
      </a>
    </Link>
  );
};

export default NavLink;
