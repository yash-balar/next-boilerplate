"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/components/context/AuthProvider";
import { hasPermission } from "@/lib/rbac/has-permission";
import { protectedRoutes } from "@/routes/index";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();

  if (isLoading || !user) return null;

  const visibleRoutes = protectedRoutes.filter((route) =>
    hasPermission(user.role, route.permission),
  );

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white p-4">
      <h2 className="mb-6 text-xl font-bold">My Application</h2>

      <nav className="flex-1 space-y-2">
        {visibleRoutes.map((route) => {
          const isActive =
            pathname === route.path || pathname.startsWith(`${route.path}/`);

          return (
            <Link
              key={route.path}
              href={route.path}
              className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {route.title}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="rounded-lg px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </aside>
  );
}
