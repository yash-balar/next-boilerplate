import type { User, UserFormValues } from "@/types/users";

let users: User[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Shah",
    email: "amit@example.com",
    role: "Employee",
    status: "Inactive",
  },
];

let nextId = 4;

export function getUsers() {
  return [...users];
}

export function getUserById(id: number) {
  return users.find((user) => user.id === id);
}

export function createUser(values: UserFormValues) {
  const user: User = { id: nextId++, ...values };
  users = [...users, user];
  return user;
}

export function updateUser(id: number, values: UserFormValues) {
  const existing = getUserById(id);

  if (!existing) return undefined;

  const updated = { ...existing, ...values };
  users = users.map((user) => (user.id === id ? updated : user));

  return updated;
}

export function deleteUser(id: number) {
  users = users.filter((user) => user.id !== id);
}
