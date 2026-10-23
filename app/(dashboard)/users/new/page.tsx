"use client";

import { useRouter } from "next/navigation";
import UserForm from "@/components/users/user-form";
import { createUser } from "@/lib/users";

export default function CreateUserPage() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Add User</h1>

      <UserForm
        mode="create"
        onSubmit={(values) => {
          createUser(values);
          router.push("/users");
        }}
      />
    </main>
  );
}
