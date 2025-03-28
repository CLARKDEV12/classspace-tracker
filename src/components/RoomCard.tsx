
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Building } from 'lucide-react';
import { Room } from '@/types';
import useRoomStore from '@/lib/roomStore';
import { formatDistanceToNow } from 'date-fns';

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
      
      <CardFooter className="pt-0 flex gap-2">
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
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
