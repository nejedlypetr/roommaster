import {ColumnDef} from "@tanstack/react-table";
import {TRoom} from "@/types/TRoom";
import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/mainButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useDeleteRoomMutation} from "@/hooks/useDeleteRoomMutation.ts";

export const useRoomsColumnsDefinitions = ({ onDetailsClick }: { onDetailsClick: (id: number) => void }) => {
  const { mutate: deleteRoom } = useDeleteRoomMutation();

  const columns: ColumnDef<TRoom>[] = [
    // {
    //   accessorKey: "id",
    //   header: () => <span className="font-bold text-primary-grey">Room Id</span>,
    //   enableSorting: true,
    //   enableGlobalFilter: true,
    //   cell: ({ row }) => {
    //     const roomId = row.original.id;
    //     return <span className="cursor-pointer hover:underline" onClick={() => onDetailsClick(row.original.id)}>{roomId}</span>;
    //   },
    // },
    {
      accessorKey: "roomNumber",
      header: "Room Number",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const roomNumber = row.original.roomNumber;
        return <span className="cursor-pointer underline" onClick={() => onDetailsClick(row.original.id)}>{roomNumber}</span>;
      },
    },
    {
      accessorKey: "roomType",
      header: "Room Type",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        return row.original.roomType
            .split('_')
            .map(word => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
      },
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "department",
      header: "Department",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const department = row.original.department
          .split('_')
          .map(word => word.charAt(0) + word.slice(1).toLowerCase())
          .join(' ');
        return department;
      },
    },
    {
      accessorKey: "floor.floorNumber", // Keeps the accessor for sorting/filtering purposes
      header: "Location",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const floorNumber = row.original.floor?.floorNumber;
        const buildingName = row.original.building?.name;
        return `Floor ${floorNumber} of ${buildingName ? ` ${buildingName}` : "Unknown Building"}`;
      },
    },
    // {
    //   accessorKey: "floor.floorNumber",
    //   header: "Floor of building",
    //   enableSorting: true,
    //   enableGlobalFilter: true,
    //   cell: ({ row }) => `Floor ${row.original.floor.floorNumber}`,
    // },
    // {
    //   accessorKey: "building.name",
    //   header: "Building Name",
    //   enableSorting: false,
    //   enableGlobalFilter: true,
    // },
    // {
    //   accessorKey: "building.street",
    //   header: "Street",
    //   enableSorting: false,
    //   enableGlobalFilter: true,
    // },
    // {
    //   accessorKey: "building.city",
    //   header: "City",
    //   enableSorting: false,
    //   enableGlobalFilter: true,
    // },
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
              <DropdownMenuItem onClick={() => deleteRoom({ roomId: room.id })} className="text-red-500" >
                Delete
              </DropdownMenuItem>
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