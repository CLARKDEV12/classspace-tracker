
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RoomCard from '@/components/RoomCard';
import EmptyState from '@/components/EmptyState';
import useRoomStore from '@/lib/roomStore';
import { Search } from 'lucide-react';
import Layout from '@/components/Layout';

const Index: React.FC = () => {
  const { rooms } = useRoomStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [buildingFilter, setBuildingFilter] = useState<string>('all');

  // Extract unique buildings for filter
  const buildings = ['all', ...new Set(rooms.map(room => room.building))];

  // Filter rooms based on search query and filters
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         room.building.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesBuilding = buildingFilter === 'all' || room.building === buildingFilter;
    
    return matchesSearch && matchesStatus && matchesBuilding;
  });

  return (
    <Layout>
      {rooms.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Find Available Space</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by room name or building..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="scheduled">Scheduled Class</SelectItem>
                </SelectContent>
              </Select>
              
              {buildings.length > 1 && (
                <Select value={buildingFilter} onValueChange={setBuildingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by building" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Buildings</SelectItem>
                    {buildings.slice(1).map((building) => (
                      <SelectItem key={building} value={building}>
                        {building}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No rooms match your search criteria</p>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Index;
