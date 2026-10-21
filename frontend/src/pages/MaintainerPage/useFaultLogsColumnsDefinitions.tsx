import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/mainButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {arrayToDate} from "@/utils/dateUtils.ts";
import {TFaultLogSimple} from "@/types/TFaultLogSimple.ts";
import {useResolveFaultLogMutation} from "@/hooks/useResolveFaultLogMutation.ts";

export const useFaultLogsColumnsDefinitions = ({ onDetailsClick }: { onDetailsClick: (id: number) => void }) => {
  // TODO: add resolve functionality (based on reservation)
  const { mutate: resolveFaultLog } = useResolveFaultLogMutation();

  const columns: ColumnDef<
      TFaultLogSimple & {
    room?: { roomNumber: number; floor: number };
    floor?: { id: number; buildingId: number; floorNumber: number};
    building?: { name: string };
  }
  >[] = [
    // {
    //   accessorKey: "id",
    //   header: () => <span className="font-bold text-primary-grey">Fault log Id</span>,
    //   enableSorting: true,
    //   enableGlobalFilter: true,
    // },
    {
      accessorKey: "created",
      header: "Created",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        // TODO: change to include time
        const createdDate = arrayToDate(row.original.created);
        return createdDate.toLocaleDateString();
      },
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
      accessorKey: "cause",
      header: "Cause",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      enableSorting: false,
      cell: ({ row }) => {
        const description = row.original.description;
        if (!description) return <span className="text-xs text-left">No description</span>;
        return <span className="text-xs text-left">{description?.length > 50 ? `${description.slice(0, 50)}..` : description}</span>;
      },
    },

    {
      accessorKey: "resolved",
      header: "Resolved",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const isResolved = row.original.resolved; // Assuming resolved is a boolean
        return isResolved ? <span className="text-green-500 text-xs font-bold">RESOLVED</span> : <span className="text-red-500 text-xs font-bold">UNRESOLVED</span>; // Render "Yes" or "No"
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const faultLog = row.original;

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
                <DropdownMenuItem onClick={() => resolveFaultLog({ faultLogId: faultLog.id, roomId: faultLog.roomId })} className="text-red-500">
                  Resolve
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};