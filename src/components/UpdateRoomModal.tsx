
import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useRoomStore from '@/lib/roomStore';
import { Room, RoomStatus } from '@/types';

const formSchema = z.object({
  name: z.string().min(1, 'Room name is required'),
  building: z.string().min(1, 'Building is required'),
  floor: z.string().min(1, 'Floor is required'),
  status: z.enum(['vacant', 'occupied', 'scheduled']) as z.ZodType<RoomStatus>,
  capacity: z.string().optional(),
  schedule: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UpdateRoomModalProps {
  room: Room;
}

const UpdateRoomModal: React.FC<UpdateRoomModalProps> = ({ room }) => {
  const { updateRoom } = useRoomStore();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      building: room.building,
      floor: room.floor,
      status: room.status,
      capacity: room.capacity ? room.capacity.toString() : '',
      schedule: room.schedule || '',
    },
  });
  
  // Update form values when room prop changes
  useEffect(() => {
    form.reset({
      name: room.name,
      building: room.building,
      floor: room.floor,
      status: room.status,
      capacity: room.capacity ? room.capacity.toString() : '',
      schedule: room.schedule || '',
    });
  }, [room, form]);
  
  const onSubmit = (data: FormValues) => {
    updateRoom({
      id: room.id,
      name: data.name,
      building: data.building,
      floor: data.floor,
      status: data.status,
      capacity: data.capacity ? parseInt(data.capacity) : undefined,
      schedule: data.schedule,
      reportedBy: 'Admin',
      lastUpdated: new Date()
    });
    form.reset();
  };
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Room</DialogTitle>
        <DialogDescription>
          Update the details for "{room.name}".
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Room 101" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="building"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Science Building" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floor</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vacant">Vacant</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="scheduled">Scheduled Class</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity (optional)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mon-Fri 9AM-11AM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Update Room</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpdateRoomModal;
