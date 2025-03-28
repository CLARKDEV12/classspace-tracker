
import { create } from 'zustand';
import { Room, RoomStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface RoomStore {
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id' | 'lastUpdated'>) => void;
  updateRoom: (room: Room) => void;
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
  
  updateRoom: (updatedRoom) => {
    set((state) => ({
      rooms: state.rooms.map((room) => 
        room.id === updatedRoom.id 
          ? { ...updatedRoom, lastUpdated: new Date() }
          : room
      ),
    }));
    
    toast.success(`Room ${updatedRoom.name} updated successfully`);
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
    // Get the room name before removing it
    let roomName = "";
    set((state) => {
      const roomToRemove = state.rooms.find(room => room.id === id);
      if (roomToRemove) {
        roomName = roomToRemove.name;
      }
      return {
        rooms: state.rooms.filter((room) => room.id !== id),
      };
    });
    
    toast.success(`Room ${roomName} removed successfully`);
  },
}));

export default useRoomStore;
