import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import { DataTableIntegrated } from "@/components/ui/data-table-integrated";
import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/slices/userSlice";

// Sample user data
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-05-15",
    resumeCount: 3,
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-06-22",
    resumeCount: 1,
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2023-04-10",
    resumeCount: 5,
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    role: "User",
    status: "Inactive",
    createdAt: "2023-07-05",
    resumeCount: 0,
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-08-18",
    resumeCount: 2,
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-09-01",
    resumeCount: 4,
  },
  {
    id: "7",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    role: "User",
    status: "Inactive",
    createdAt: "2023-07-12",
    resumeCount: 1,
  },
  {
    id: "8",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2023-05-20",
    resumeCount: 7,
  },
  {
    id: "9",
    name: "James Taylor",
    email: "james.taylor@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-08-05",
    resumeCount: 2,
  },
  {
    id: "10",
    name: "Patricia Anderson",
    email: "patricia.anderson@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-06-15",
    resumeCount: 3,
  },
  {
    id: "11",
    name: "Thomas White",
    email: "thomas.white@example.com",
    role: "User",
    status: "Inactive",
    createdAt: "2023-09-10",
    resumeCount: 0,
  },
  {
    id: "12",
    name: "Jessica Harris",
    email: "jessica.harris@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-07-25",
    resumeCount: 2,
  },
];

type User = (typeof users)[0];

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { users, limit, currentPage } = useSelector((state: any) => state.users);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleViewUser = (user: User) => {
    toast(`Viewing ${user.name}'s profile`, {
      description: "User details loaded successfully",
      icon: <Eye className="h-4 w-4" />,
    });
  };

  const handleEditUser = (user: User) => {
    toast(`Editing ${user.name}'s profile`, {
      description: "You can now edit this user's information",
      icon: <Pencil className="h-4 w-4" />,
    });
  };

  const handleDeleteUser = (user: User) => {
    toast.error(`${user.name} has been deleted`, {
      description: "User has been permanently removed",
      icon: <Trash2 className="h-4 w-4" />,
    });
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
      cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
      cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    },
    {
      accessorKey: "resumeCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Resumes" />,
      cell: ({ row }) => <div>{row.getValue("resumeCount")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: "View details",
              onClick: handleViewUser,
              icon: <Eye className="h-4 w-4" />,
            },
            {
              label: "Edit user",
              onClick: handleEditUser,
              icon: <Pencil className="h-4 w-4" />,
            },
            {
              label: "Delete user",
              onClick: handleDeleteUser,
              icon: <Trash2 className="h-4 w-4" />,
              className: "text-destructive",
            },
          ]}
        />
      ),
    },
  ];

  const handleAddUser = () => {
    setIsAddUserOpen(false);
    toast.success("User created successfully", {
      description: "The new user has been added to the system",
    });
  };

  console.log({ users });

  const initUserFetch = useCallback(() => {
    dispatch(fetchUsers({ limit, page: currentPage }));
  }, [dispatch, limit, currentPage]);

  useEffect(() => {
    initUserFetch();
  }, [initUserFetch]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <DataTableIntegrated
        columns={columns}
        data={users}
        filterColumn="name"
        searchPlaceholder="Search users..."
      />

      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddUser}>
              Save User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
