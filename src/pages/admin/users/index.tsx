import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Pencil, Trash2, Download, FileWarningIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import { DataTableIntegrated } from "@/components/ui/data-table-integrated";
import { ButtonGroup } from "@/components/button-group";
import { toast } from "sonner";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/store";
import {
  fetchUsers,
  makeUserDownloadable,
  blockUser,
  setCurrentPage,
  setLimit,
} from "@/slices/userSlice";

import { formatDate } from "@/lib/dateFormatter";
import { useDebounce } from "@/hooks/useDebounce";

import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

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
  const dispatch = useDispatch<AppDispatch>();
  const { users, limit, currentPage, total } = useSelector((state: any) => state.users);
  const [search, setSearch] = useState<string>("");

  const debouncedSearchTerm = useDebounce(search, 1500);

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
    dispatch(blockUser({ id: user?._id, status }));
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

  const handleDownload = async () => {
    const resultActions = await dispatch(makeUserDownloadable());
    const reports = resultActions.payload;
    if (reports.length > 0) {
      toast.success(`Report generated successfully`, {
        description: `User list is ready for download`,
        icon: <Eye className="h-4 w-4" />,
      });
      const doc = new jsPDF();
      doc.text("User Data Report", 14, 15);
      try {
        autoTable(doc, {
          startY: 20,
          head: [["ID", "Name", "Email", "Roles", "Created At"]],
          styles: {
            fontSize: 9,
          },
          body: reports.map((user: any) => [
            user?._id,
            user?.name,
            user?.email,
            Array.isArray(user?.roles) ? user?.roles.toString() : user?.roles,
            new Date(user?.createdAt).toLocaleDateString(),
          ]),
          headStyles: {
            fillColor: "#3A3A99",
            textColor: "#fff",
            halign: "center",
          },
          bodyStyles: {
            halign: "left",
          },
        });
      } catch (e) {
        console.log({ e });
      }
      doc.save("user-data.pdf");
    } else {
      toast.error(`Report generation failed`, {
        description: `No Users found`,
        icon: <FileWarningIcon className="h-4 w-4" />,
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

  const changePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const changeLimit = (value: any) => {
    dispatch(setLimit(value));
  };

  const initUserFetch = useCallback(() => {
    dispatch(fetchUsers({ limit, page: currentPage, search: debouncedSearchTerm }));
  }, [dispatch, limit, currentPage, debouncedSearchTerm]);

  useEffect(() => {
    initUserFetch();
  }, [initUserFetch]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>

        <ButtonGroup className="gap-2">
          <Button variant="destructive" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Export to PDF
          </Button>
          <Button asChild>
            <Link to="/admin/users/add">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Link>
          </Button>
        </ButtonGroup>
      </div>

      <DataTableIntegrated
        columns={columns}
        data={users}
        setLimit={changeLimit}
        setCurrentPage={changePage}
        limit={limit}
        page={currentPage}
        total={total}
        filterColumn="name"
        searchPlaceholder="Search users..."
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}
