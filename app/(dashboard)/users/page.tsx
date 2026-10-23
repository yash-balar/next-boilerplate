"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/common/data-table";
import { ConfirmDialog } from "@/components/common/confirm-dialog";

import { getUsers, deleteUser } from "@/lib/users";
import type { User } from "@/types/users";

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);

  // Load users when the page mounts
  useEffect(() => {
    setUsers(getUsers());
  }, []);

  // Delete user after confirmation
  function handleDelete(id: number) {
    deleteUser(id);
    setUsers(getUsers());
  }

  // Table columns
  const columns: Column<User>[] = [
    {
      key: "id",
      header: "ID",
      render: (user) => user.id,
    },
    {
      key: "name",
      header: "Name",
      render: (user) => <span className="font-medium">{user.name}</span>,
    },
    {
      key: "email",
      header: "Email",
      render: (user) => user.email,
    },
    {
      key: "role",
      header: "Role",
      render: (user) => user.role,
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            user.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {user.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user) => (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/users/${user.id}`)}
          >
            View
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/users/${user.id}/edit`)}
          >
            Edit
          </Button>

          <ConfirmDialog
            title="Delete user?"
            description={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
            onConfirm={() => handleDelete(user.id)}
            trigger={
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            }
          />
        </div>
      ),
    },
  ];

  return (
    <main className="container mx-auto space-y-6 p-4 md:p-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage users, roles, and account status.
          </p>
        </div>

        <Button onClick={() => router.push("/users/new")}>+ Add User</Button>
      </div>

      {/* Search, table, and pagination */}
      <DataTable
        data={users}
        columns={columns}
        getSearchValue={(user) =>
          `${user.name} ${user.email} ${user.role} ${user.status}`
        }
        searchPlaceholder="Search by name, email, or role..."
        pageSize={5}
      />
    </main>
  );
}
