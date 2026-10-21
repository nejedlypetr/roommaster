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
import {TFloor} from "@/types/TFloor.ts";
import {useDeleteFloorMutation} from "@/hooks/useDeleteFloorMutation.ts";

export const useFloorColumnsDefinitions = () => {
  const { mutate: deleteFloor } = useDeleteFloorMutation();

  const columns: ColumnDef<TFloor>[] = [
    // {
    //   accessorKey: "id",
    //   header: () => <span className="font-bold text-primary-grey">Building Id</span>,
    //   enableSorting: true,
    //   enableGlobalFilter: true,
    // },
    {
      accessorKey: "buildingName",
      header: "Building name",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "floorNumber",
      header: "Floor number",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const floor = row.original;

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
              <DropdownMenuItem onClick={() => deleteFloor({ floorId: floor.id })} className="text-red-500" >
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