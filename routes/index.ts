import { Permission } from "@/lib/rbac/permission";

export const privateRoutes = ["/", "/profile"];
export const publicRoutes = ["/login", "/register", "/access-denied"];

export const protectedRoutes: {
  path: string;
  title: string;
  permission: Permission;
}[] = [
  {
    path: "/",
    title: "Dashboard",
    permission: "dashboard.view",
  },
  {
    path: "/users",
    title: "Users",
    permission: "users.view",
  },
  {
    path: "/settings",
    title: "Settings",
    permission: "settings.view",
  },
  {
    path: "/profile",
    title: "Profile",
    permission: "profile.view",
  },
];
