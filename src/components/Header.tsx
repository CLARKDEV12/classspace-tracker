
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DoorOpen, PlusCircle } from 'lucide-react';
import AddRoomModal from './AddRoomModal';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DoorOpen className="h-6 w-6 text-scheduled" />
          <h1 className="text-xl font-bold">ClassSpace Tracker</h1>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-scheduled hover:bg-scheduled/90">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <AddRoomModal />
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
