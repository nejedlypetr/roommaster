import { ColumnDef } from "@tanstack/react-table";
import { TUser } from "@/types/TUser.ts";


export const useColumnsDefinitions = () => {
  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "id",
      header: () => <span className="font-bold text-primary-grey ">User Id</span>,
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "firstName",
      header: () => "First Name",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) =>
          row.original.role.charAt(0).toUpperCase() + row.original.role.slice(1).toLowerCase(),
    },
    {
      accessorKey: "department",
      header: "Department",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) =>
          row.original.department
              .replace(/_/g, " ") // Replace underscores with spaces
              .split(" ") // Split into words
              .map(word =>
                  word.length === 2 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              ) // Keep two-letter words uppercase, capitalize others
              .join(" "), // Join words back with spaces
    },
    {
      accessorKey: "isHeadOfDepartment",
      header: "Head of Department",
      enableSorting: true,
      enableGlobalFilter: true,
      cell: ({ row }) => (row.original.isHeadOfDepartment ? "Yes" : "No"),
    },

    // {
    //   id: "actions",
    //   cell: ({ row }) => {
    //     const room = row.original;
    //
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem onClick={() => onDetailsClick(room.id)}>
    //             View details
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];

  return columns;
};