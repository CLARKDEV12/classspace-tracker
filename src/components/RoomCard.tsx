
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Building, Edit, Trash2 } from 'lucide-react';
import { Room } from '@/types';
import useRoomStore from '@/lib/roomStore';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import UpdateRoomModal from './UpdateRoomModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { updateStatus, removeRoom } = useRoomStore();
  
  const statusColors = {
    vacant: 'bg-vacant text-white animate-pulse-status',
    occupied: 'bg-occupied text-white',
    scheduled: 'bg-scheduled text-white',
  };
  
  const handleStatusUpdate = (status: Room['status']) => {
    updateStatus(room.id, status, 'Student');
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">{room.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Building className="h-3 w-3 mr-1" />
              <span>{room.building} - Floor {room.floor}</span>
            </div>
          </div>
          <Badge className={statusColors[room.status]}>
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 pt-2">
        {room.capacity && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Users className="h-3 w-3 mr-1" />
            <span>Capacity: {room.capacity}</span>
          </div>
        )}
        {room.schedule && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>{room.schedule}</span>
          </div>
        )}
        <div className="text-xs text-gray-400 mt-2">
          Last updated: {formatDistanceToNow(new Date(room.lastUpdated), { addSuffix: true })}
          {room.reportedBy && ` by ${room.reportedBy}`}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className={`border-vacant text-vacant hover:bg-vacant hover:text-white ${room.status === 'vacant' ? 'bg-vacant text-white' : ''}`}
            onClick={() => handleStatusUpdate('vacant')}
          >
            Vacant
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`border-occupied text-occupied hover:bg-occupied hover:text-white ${room.status === 'occupied' ? 'bg-occupied text-white' : ''}`}
            onClick={() => handleStatusUpdate('occupied')}
          >
            Occupied
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`border-scheduled text-scheduled hover:bg-scheduled hover:text-white ${room.status === 'scheduled' ? 'bg-scheduled text-white' : ''}`}
            onClick={() => handleStatusUpdate('scheduled')}
          >
            Class
          </Button>
        </div>
        
        <div className="flex justify-end gap-2 w-full mt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <UpdateRoomModal room={room} />
          </Dialog>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Room</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{room.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => removeRoom(room.id)} 
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
