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
import {TBuilding} from "@/types/TBuilding.ts";
import {useDeleteBuildingMutation} from "@/hooks/useDeleteBuildingMutation.ts";

export const useBuildingColumnsDefinitions = () => {
  const { mutate: deleteBuilding } = useDeleteBuildingMutation();

  const columns: ColumnDef<TBuilding>[] = [
    // {
    //   accessorKey: "id",
    //   header: () => <span className="font-bold text-primary-grey">Building Id</span>,
    //   enableSorting: true,
    //   enableGlobalFilter: true,
    // },
    {
      accessorKey: "name",
      header: "Building Name",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "street",
      header: "Street",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "city",
      header: "City",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const building = row.original;

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
              <DropdownMenuItem onClick={() => deleteBuilding({ buildingId: building.id })} className="text-red-500" >
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