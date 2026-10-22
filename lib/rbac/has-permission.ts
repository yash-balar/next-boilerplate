import type { Permission } from "./permission";
import type { Role } from "./roles";
import { rolePermissions } from "./role-permission";

export function hasPermission(
  role: Role | null | undefined,
  permission: Permission,
): boolean {
  if (!role) return false;

  return rolePermissions[role]?.includes(permission) ?? false;
}
