
import React from 'react';
import { Button } from '@/components/ui/button';
import { DoorOpen, LogOut } from 'lucide-react';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DoorOpen className="h-6 w-6 text-scheduled" />
          <h1 className="text-xl font-bold">ClassSpace Tracker</h1>
        </div>
        
        <Button variant="outline" className="text-gray-700 hover:text-gray-900">
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
      
      <Navigation />
    </header>
  );
};

export default Header;
