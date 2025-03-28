
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building, Calendar, DoorOpen, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinkClass = "flex items-center gap-2 px-5 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground";
  const activeNavLinkClass = "flex items-center gap-2 px-5 py-2 font-medium bg-accent text-accent-foreground";
  
  return (
    <div className="border-b border-gray-200 bg-background">
      <div className="container mx-auto flex overflow-auto">
        <Link 
          to="/" 
          className={isActive('/') ? activeNavLinkClass : navLinkClass}
        >
          <DoorOpen className="h-4 w-4 text-scheduled" />
          <span>Rooms</span>
        </Link>
        
        <Link 
          to="/roadmap" 
          className={isActive('/roadmap') ? activeNavLinkClass : navLinkClass}
        >
          <Building className="h-4 w-4 text-scheduled" />
          <span>Roadmap</span>
        </Link>
        
        <Link 
          to="/schedules" 
          className={isActive('/schedules') ? activeNavLinkClass : navLinkClass}
        >
          <Calendar className="h-4 w-4 text-scheduled" />
          <span>Schedules</span>
        </Link>
        
        <Link 
          to="/settings" 
          className={isActive('/settings') ? activeNavLinkClass : navLinkClass}
        >
          <Settings className="h-4 w-4 text-scheduled" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
