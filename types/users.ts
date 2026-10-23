export type UserRole = "Admin" | "Manager" | "Employee";
export type UserStatus = "Active" | "Inactive";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type UserFormValues = Omit<User, "id">;
