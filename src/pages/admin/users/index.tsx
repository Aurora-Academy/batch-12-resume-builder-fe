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

import { formatDate } from "@/lib/dateFormatter";

// type User = (typeof users)[0];
type User = {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  roles: [string];
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

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

  const handleBlockUser = (user: User) => {
    const status = user?.isBlocked ? "unblocked" : "blocked";
    if (status === "blocked") {
      toast.error(`${user.name} has been ${status}`, {
        description: `User has been ${status}`,
        icon: <Trash2 className="h-4 w-4" />,
      });
    } else {
      toast.success(`${user.name} has been ${status}`, {
        description: `User has been ${status}`,
        icon: <Trash2 className="h-4 w-4" />,
      });
    }
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Roles" />,
      accessorKey: "roles",
      cell: ({ row }) => {
        const roles: any = row.getValue("roles");
        return <div>{roles.toString()}</div>;
      },
    },
    {
      accessorKey: "isBlocked",
      header: ({ column }) => <DataTableColumnHeader column={column} title="is blocked?" />,
      cell: ({ row }) => {
        const status = row.getValue("isBlocked");
        return <Badge variant={status ? "destructive" : "default"}>{status ? "Yes" : "No"}</Badge>;
      },
    },
    {
      accessorKey: "isEmailVerified",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email Status" />,
      cell: ({ row }) => {
        const status = row.getValue("isEmailVerified");
        return <Badge variant={status ? "default" : "destructive"}>{status ? "Yes" : "No"}</Badge>;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
      cell: ({ row }) => {
        const date = formatDate(row.getValue("createdAt"));
        return <div>{date}</div>;
      },
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
              label: "Block user",
              onClick: handleBlockUser,
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

      {/* <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
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
      </Dialog> */}
    </div>
  );
}
