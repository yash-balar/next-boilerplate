"use client";

import { useParams, useRouter } from "next/navigation";
import UserForm from "@/components/users/user-form";
import { getUserById, updateUser } from "@/lib/users";

export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const user = getUserById(id);

  if (!user) {
    return <p className="p-6">User not found.</p>;
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Edit User</h1>

      <UserForm
        mode="edit"
        user={user}
        onSubmit={(values) => {
          const updated = updateUser(id, values);

          if (updated) {
            router.push("/users");
          }
        }}
      />
    </main>
  );
}
