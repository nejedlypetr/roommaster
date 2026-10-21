import { ColumnDef } from "@tanstack/react-table";
import { TRoomReservationTableRow } from "@/types/TRoomReservationTableRow";

export const columns: ColumnDef<TRoomReservationTableRow>[] = [
    {
      accessorKey: "time",
      header: () => <span className="font-bold text-primary-grey">Time</span>,
      enableSorting: false,
      cell: ({ row }) => {
        return `${row.original.time}`;
      },
    },
    {
      accessorKey: "user",
      header: () => <span className="font-bold text-primary-grey">Name</span>,
      enableSorting: false,
      cell: ({ row }) => {
        const user = row.original.user;
        if (user === 'FREE') {
          return <span className="font-bold text-green-600">{user}</span>;
        }
        return user;
      },
    },
    {
      accessorKey: "purpose",
      header: () => <span className="font-bold text-primary-grey">Purpose</span>,
      enableSorting: false,
      cell: ({ row }) => {
        return row.original.purpose
          .split('_')
          .map(word => word.charAt(0) + word.slice(1).toLowerCase())
          .join(' ');
      },
    },
];