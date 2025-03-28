
import React from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DoorClosed, PlusCircle } from 'lucide-react';
import AddRoomModal from './AddRoomModal';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = <DoorClosed className="h-16 w-16 text-gray-300 mb-4" />,
  title = "No Rooms Added Yet",
  description = "Start by adding classrooms and spaces to track their availability status."
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[70vh]">
      {icon}
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mb-6">
        {description}
      </p>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="bg-scheduled hover:bg-scheduled/90">
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Your First Room
          </Button>
        </DialogTrigger>
        <AddRoomModal />
      </Dialog>
    </div>
  );
};

export default EmptyState;
