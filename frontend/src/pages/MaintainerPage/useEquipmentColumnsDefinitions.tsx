import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/mainButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useDeleteEquipmentMutation} from "@/hooks/useDeleteEquipmentMutation.ts";
import {TEquipment} from "@/types/TEquipment.ts";

export const useEquipmentColumnsDefinitions = ({ onDetailsClick }: { onDetailsClick: (id: number) => void }) => {
  const { mutate: deleteEquipment } = useDeleteEquipmentMutation();

  const columns: ColumnDef<
      TEquipment & {
    room?: { roomNumber: number; floor: number };
    floor?: { id: number; buildingId: number; floorNumber: number};
    building?: { name: string };
  }
  >[] = [
    // {
    //   accessorKey: "id",
    //   header: () => <span className="font-bold text-primary-grey">Building Id</span>,
    //   enableSorting: true,
    //   enableGlobalFilter: true,
    // },
    {
      accessorKey: "equipmentType",
      header: "Equipment Type",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        return row.original.equipmentType
            .split('_')
            .map(word => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "roomId",
      header: "Location",
      enableSorting: false,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const room = row.original.room;
        const floor = row.original.floor;
        const building = row.original.building;
        const location_room = room ? `Room ${room.roomNumber}`: "Unknown Room";
        const location_rest = `${building ? ` of ${building.name}` : ""}${floor ? ` on floor ${floor.floorNumber}` : ""}`;

        return (<><span className="cursor-pointer underline" onClick={() => onDetailsClick(row.original.roomId)}>{location_room}</span>{location_rest}</>);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const equipment = row.original;

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
              <DropdownMenuItem onClick={() => deleteEquipment({ equipmentId: equipment.id })} className="text-red-500" >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};