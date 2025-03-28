
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarTrigger 
} from '@/components/ui/menubar';
import { Building, Calendar, DoorOpen } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Menubar className="border-b rounded-none border-gray-200 px-2 lg:px-4">
      <MenubarMenu>
        <MenubarTrigger className={`flex items-center gap-2 px-3 ${isActive('/') ? 'bg-accent text-accent-foreground' : ''}`}>
          <DoorOpen className="h-4 w-4 text-scheduled" />
          <span className="font-medium">Rooms</span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link to="/" className="cursor-pointer w-full">Rooms Dashboard</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger className={`flex items-center gap-2 px-3 ${isActive('/roadmap') ? 'bg-accent text-accent-foreground' : ''}`}>
          <Building className="h-4 w-4 text-scheduled" />
          <span className="font-medium">Roadmap</span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link to="/roadmap" className="cursor-pointer w-full">Building Overview</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger className={`flex items-center gap-2 px-3 ${isActive('/schedules') ? 'bg-accent text-accent-foreground' : ''}`}>
          <Calendar className="h-4 w-4 text-scheduled" />
          <span className="font-medium">Schedules</span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link to="/schedules" className="cursor-pointer w-full">Room Schedules</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Navigation;
