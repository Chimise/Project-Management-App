import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

interface MobileLogoProps {
  collapsed?: boolean;
}

const MobileLogo = ({ collapsed = false }: MobileLogoProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="inline-flex items-center justify-center rounded-full bg-primary p-2">
        <Square3Stack3DIcon className="w-5 h-5 text-white" />
      </div>
      {!collapsed && (<div className="text-primary font-bold text-2xl font-sans">
        taskr
      </div>)}
    </div>
  );
};

export default MobileLogo;
