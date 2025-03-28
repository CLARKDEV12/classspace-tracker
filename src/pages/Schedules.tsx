
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmptyState from '@/components/EmptyState';
import { Calendar } from 'lucide-react';
import useRoomStore from '@/lib/roomStore';

interface Schedule {
  id: string;
  roomId: string;
  day: string;
  startTime: string;
  endTime: string;
  description: string;
}

const Schedules: React.FC = () => {
  const { rooms } = useRoomStore();
  
  // In the future, this will be populated with actual schedule data
  const schedules: Schedule[] = [];
  
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Room Schedules</h1>
        <p className="text-gray-500">Manage schedules for all rooms</p>
      </div>
      
      {rooms.length > 0 && schedules.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>All Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => {
                  const room = rooms.find(r => r.id === schedule.roomId);
                  return (
                    <TableRow key={schedule.id}>
                      <TableCell>{room?.name || 'Unknown Room'}</TableCell>
                      <TableCell>{schedule.day}</TableCell>
                      <TableCell>{schedule.startTime} - {schedule.endTime}</TableCell>
                      <TableCell>{schedule.description}</TableCell>
                      <TableCell>
                        {/* Actions will go here */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <EmptyState 
          icon={<Calendar className="h-12 w-12 text-gray-400" />}
          title="No Schedules Added Yet"
          description="Room schedules will appear here once added."
        />
      )}
    </div>
  );
};

export default Schedules;
