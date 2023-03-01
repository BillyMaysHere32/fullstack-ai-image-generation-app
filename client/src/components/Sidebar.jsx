import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

const SideBar = () => {
  return (
    <div className="sticky top-0 left-0 h-screen p-6 flex flex-col
                 bg-gray-900 shadow-lg">
                    
        <SideBarIcon icon={<FaFire size="36" />} />
        <Divider />
        <SideBarIcon icon={<BsPlus size="60" />} />
        <SideBarIcon icon={<BsFillLightningFill size="36" />} />
        <SideBarIcon icon={<FaPoo size="36" />} />
        <Divider />
        <SideBarIcon icon={<BsGearFill size="36" />} />
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);


const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;