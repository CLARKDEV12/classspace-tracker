
export type RoomStatus = 'vacant' | 'occupied' | 'scheduled';

export interface Room {
  id: string;
  name: string;
  building: string;
  floor: string;
  status: RoomStatus;
  lastUpdated: Date;
  capacity?: number;
  schedule?: string;
  reportedBy?: string;
}
