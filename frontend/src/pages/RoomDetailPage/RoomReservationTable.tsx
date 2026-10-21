import { useState } from 'react';
import { DatePicker } from '@/components/DatePicker';
import { DataTable } from '@/components/DataTable';
import { useRoomBookingsQuery } from '@/hooks/useRoomBookingsQuery';
import { createRoomSchedule } from '@/utils/roomReservationsUtils';
import { columns } from './roomReservationsColumnDefinitions';

import tw from 'twin.macro';
import { TRoomReservationTableRow } from '@/types/TRoomReservationTableRow';

const SecondaryTitle = tw.h2`text-black font-bold text-lg border-b border-gray-200 pb-2 mb-0`;

type TRoomReservationTableProps = {
  roomId: number;
  openingTimeSlot: number;
  closingTimeSlot: number;
};

export const RoomReservationTable = ({
  roomId,
  openingTimeSlot,
  closingTimeSlot,
}: TRoomReservationTableProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: roomBookings, isLoading } = useRoomBookingsQuery({
    roomId,
    date: selectedDate
  });

  const onDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const getCssClass = (row: TRoomReservationTableRow) => {
    return row.user === 'FREE' ? 'bg-green-100' : '';
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between mb-4 gap-16 w-full">
        <SecondaryTitle>Select a date to see room reservations!</SecondaryTitle>
        <DatePicker 
          onSelect={onDateChange} 
          date={selectedDate}
        />
      </div>
      <DataTable
        data={createRoomSchedule(roomBookings ?? [], openingTimeSlot, closingTimeSlot)}
        columns={columns}
        filterAvailable={false}
        className="w-full"
        loading={isLoading}
        getCssClass={getCssClass}
      />
    </div>
  );
};