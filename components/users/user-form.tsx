"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User, UserFormValues } from "@/types/users";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const userSchema = z.object({
  name: z.string().trim().min(2, "Name must have at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  role: z.enum(["Admin", "Manager", "Employee"]),
  status: z.enum(["Active", "Inactive"]),
});

type Props = {
  mode: "create" | "edit" | "view";
  user?: User;
  onSubmit: (values: UserFormValues) => void;
};

export default function UserForm({ mode, user, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Employee",
      status: "Active",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user, reset]);

  const readOnly = mode === "view";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" {...register("name")} readOnly={readOnly} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          readOnly={readOnly}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium">
          Role
        </label>
        <select
          id="role"
          {...register("role")}
          disabled={readOnly}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        {errors.role && (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          disabled={readOnly}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => history.back()}>
          Back
        </Button>

        {!readOnly && (
          <Button type="submit" disabled={isSubmitting}>
            {mode === "create" ? "Create User" : "Save Changes"}
          </Button>
        )}
      </div>
    </form>
  );
}
