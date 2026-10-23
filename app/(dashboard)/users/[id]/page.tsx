"use client";

import { useParams } from "next/navigation";
import UserForm from "@/components/users/user-form";
import { getUserById } from "@/lib/users";

export default function ViewUserPage() {
  const params = useParams<{ id: string }>();
  const user = getUserById(Number(params.id));

  if (!user) {
    return <p className="p-6">User not found.</p>;
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">User Details</h1>
      <UserForm mode="view" user={user} onSubmit={() => {}} />
    </main>
  );
}
