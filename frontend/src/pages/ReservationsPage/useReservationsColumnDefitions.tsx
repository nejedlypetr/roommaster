import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useReservationCancellationMutation } from '@/hooks/useReservationCancellationMutation';
import { EReservationStatus } from '@/types/enums';
import { TReservation } from '@/types/TReservation';
import { timeSlotToDate } from '@/utils/dateUtils';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';



export const useReservationsColumnDefitions = (): ColumnDef<TReservation>[] => {
  const { mutate: cancelReservation } = useReservationCancellationMutation();

  return [
    {
      accessorKey: 'reservationDate',
      header: 'Reservation Date',
      cell: ({ row }) => {
        const date = new Date(row.original.reservationDate);
        return format(date, 'dd.MM. yyyy');
      },
    },
    {
      accessorKey: 'startTimeSlot',
      header: 'Start Time',
      cell: ({ row }) => {
        const date = timeSlotToDate(row.original.startTimeSlot);
        return format(date, 'HH:mm');
      },
    },
    {
      accessorKey: 'endTimeSlot',
      header: 'End Time',
      cell: ({ row }) => {
        const date = timeSlotToDate(row.original.endTimeSlot);
        return format(date, 'HH:mm');
      },
    },
    {
      accessorKey: 'purpose',
      header: 'Purpose',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        if (row.original.status === EReservationStatus.CANCELLED) return <span className="text-red-500 text-xs font-bold">CANCELLED</span>;
        return <span className="text-green-500 text-xs font-bold">CONFIRMED</span>;
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      enableSorting: false,
      cell: ({ row }) => {
        const description = row.original.description;
        if (!description) return <span className="text-xs text-left">No description</span>;
        return <span className="text-xs text-left">{description?.length > 34 ? `${description.slice(0, 34)}..` : description}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const reservation = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => cancelReservation({ reservationId: reservation.id })} className="text-red-500">
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}