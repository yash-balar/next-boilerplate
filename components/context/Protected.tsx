"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/components/context/AuthProvider";
import { hasPermission } from "@/lib/rbac/has-permission";
import { protectedRoutes } from "@/routes/index";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const matchedRoute = [...protectedRoutes]
    .sort((a, b) => b.path.length - a.path.length)
    .find(
      (route) =>
        pathname === route.path || pathname.startsWith(`${route.path}/`),
    );

  const allowed =
    !!user &&
    !!matchedRoute &&
    hasPermission(user.role, matchedRoute.permission);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
    } else if (!allowed) {
      router.replace("/access-denied");
    }
  }, [user, isLoading, allowed, router]);

  if (isLoading || !user || !allowed) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        Checking permissions...
      </div>
    );
  }

  return <>{children}</>;
}
