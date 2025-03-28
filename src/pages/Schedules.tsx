
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from 'lucide-react';
import useRoomStore from '@/lib/roomStore';
import Layout from '@/components/Layout';

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
    <Layout>
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
        <div className="flex flex-col items-center justify-center text-center h-[70vh]">
          <Calendar className="h-12 w-12 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">No Schedules Added Yet</h2>
          <p className="text-gray-500 max-w-md mb-6">
            Create schedules for your rooms to manage class timings and availability.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Schedules;
