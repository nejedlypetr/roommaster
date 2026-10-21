import { ColumnDef } from "@tanstack/react-table";
import { TRoom } from "@/types/TRoom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/mainButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const useColumnsDefinitions = ({ onDetailsClick }: { onDetailsClick: (id: number) => void }) => {
  const columns: ColumnDef<TRoom>[] = [
    {
      accessorKey: "roomNumber",
      header: () => <span className="font-bold text-primary-grey ">Room Number</span>,
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const roomNumber = row.original.roomNumber;
        return <span className="cursor-pointer hover:underline" onClick={() => onDetailsClick(row.original.id)}>{roomNumber}</span>;
      },
    },
    {
      accessorKey: "roomType",
      header: () => <span className="font-bold text-primary-grey">Room Type</span>,
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const roomType = row.original.roomType
          .split('_')
          .map(word => word.charAt(0) + word.slice(1).toLowerCase())
          .join(' ');
        return roomType;
      },
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "floor.floorNumber",
      header: "Floor",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => `Floor ${row.original.floor.floorNumber}`,
    },
    {
      accessorKey: "building.name",
      header: "Building Name",
      enableSorting: false,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "building.street",
      header: "Street",
      enableSorting: false,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "building.city",
      header: "City",
      enableSorting: false,
      enableGlobalFilter: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const room = row.original;

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
              <DropdownMenuItem onClick={() => onDetailsClick(room.id)}>
                View details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};