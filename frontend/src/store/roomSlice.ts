import { StateCreator } from 'zustand';
import { TRoomDto } from '../types/dto/TRoomDto';
import { TRoomDetailsDto } from '../types/dto/TRoomDetailsDto';
import { TFaultDto } from '../types/dto/TFaultDto';

export interface RoomSlice {
  rooms: TRoomDto[];
  selectedRoomDetails: TRoomDetailsDto | null;
  faults: TFaultDto[];
  setRooms: (rooms: TRoomDto[]) => void;
  addRoom: (room: TRoomDto) => void;
  updateRoom: (updatedRoom: TRoomDto) => void;
  removeRoom: (roomId: number) => void;
  setSelectedRoomDetails: (roomDetails: TRoomDetailsDto | null) => void;
  setFaults: (faults: TFaultDto[]) => void;
  addFault: (fault: TFaultDto) => void;
  updateFault: (updatedFault: TFaultDto) => void;
  removeFault: (faultId: number) => void;
}

export const createRoomSlice: StateCreator<RoomSlice> = (set) => ({
  rooms: [],
  selectedRoomDetails: null,
  faults: [],
  setRooms: (rooms) => set({ rooms }),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  updateRoom: (updatedRoom) => set((state) => ({
    rooms: state.rooms.map(room => room.room_id === updatedRoom.room_id ? updatedRoom : room)
  })),
  removeRoom: (roomId) => set((state) => ({
    rooms: state.rooms.filter(room => room.room_id !== roomId)
  })),
  setSelectedRoomDetails: (roomDetails) => set({ selectedRoomDetails: roomDetails }),
  setFaults: (faults) => set({ faults }),
  addFault: (fault) => set((state) => ({ faults: [...state.faults, fault] })),
  updateFault: (updatedFault) => set((state) => ({
    faults: state.faults.map(fault => fault.fault_id === updatedFault.fault_id ? updatedFault : fault)
  })),
  removeFault: (faultId) => set((state) => ({
    faults: state.faults.filter(fault => fault.fault_id !== faultId)
  })),
});
