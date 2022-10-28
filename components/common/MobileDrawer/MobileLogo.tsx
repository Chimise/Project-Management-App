import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Badge from '../../ui/Badge';

interface MobileLogoProps {
  collapsed?: boolean;
}

const MobileLogo = ({ collapsed = false }: MobileLogoProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Badge>
        <Square3Stack3DIcon className="w-5 h-5 text-white" />
      </Badge>
      {!collapsed && (<div className="text-primary font-bold text-2xl font-sans">
        taskr
      </div>)}
    </div>
  );
};

export default MobileLogo;
