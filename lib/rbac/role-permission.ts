import { PERMISSIONS as P, type Permission } from "@/lib/rbac/permission";
import { ROLES, type Role } from "./roles";

export const rolePermissions: Record<Role, Permission[]> = {
  [ROLES.ADMIN]: Object.values(P),

  [ROLES.MANAGER]: [
    P.DASHBOARD_VIEW,
    P.USERS_VIEW,
    P.USERS_CREATE,
    P.USERS_EDIT,
    P.PRODUCTS_VIEW,
    P.PRODUCTS_CREATE,
    P.PRODUCTS_EDIT,
    P.ORDERS_VIEW,
    P.ORDERS_CREATE,
    P.ORDERS_EDIT,
    P.ORDERS_APPROVE,
    P.REPORTS_VIEW,
    P.REPORTS_EXPORT,
  ],

  [ROLES.VIEWER]: [
    P.DASHBOARD_VIEW,
    P.USERS_VIEW,
    P.PRODUCTS_VIEW,
    P.ORDERS_VIEW,
    P.REPORTS_VIEW,
  ],
};
