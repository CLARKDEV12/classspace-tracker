
import { create } from 'zustand';
import { Room, RoomStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface RoomStore {
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id' | 'lastUpdated'>) => void;
  updateStatus: (id: string, status: RoomStatus, reportedBy?: string) => void;
  removeRoom: (id: string) => void;
}

const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  
  addRoom: (roomData) => {
    const newRoom: Room = { 
      ...roomData, 
      id: uuidv4(), 
      lastUpdated: new Date()
    };
    
    set((state) => ({
      rooms: [...state.rooms, newRoom],
    }));
    
    toast.success(`Room ${roomData.name} added successfully`);
  },
  
  updateStatus: (id, status, reportedBy) => {
    set((state) => ({
      rooms: state.rooms.map((room) => 
        room.id === id 
          ? { 
              ...room, 
              status, 
              lastUpdated: new Date(),
              reportedBy: reportedBy || room.reportedBy
            } 
          : room
      ),
    }));
    
    toast.success(`Room status updated`);
  },
  
  removeRoom: (id) => {
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== id),
    }));
    
    toast.success(`Room removed`);
  },
}));

export default useRoomStore;
