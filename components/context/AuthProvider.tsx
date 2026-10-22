"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Role } from "@/lib/rbac/roles";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
};

type AuthUser = Omit<DemoUser, "password">;

const demoUsers: DemoUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@gmail.com",
    password: "manager123",
    role: "manager",
  },
  {
    id: "3",
    name: "Viewer User",
    email: "viewer@gmail.com",
    password: "viewer123",
    role: "viewer",
  },
];

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "rbac-demo-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log("stored::::::::::", stored);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (
          typeof parsed === "object" &&
          parsed !== null &&
          "id" in parsed &&
          "email" in parsed &&
          "role" in parsed
        ) {
          const saved = parsed as {
            id: string;
            email: string;
            role: Role;
          };

          // Restore only a matching static demo account.
          const found = demoUsers.find(
            (item) =>
              item.id === saved.id &&
              item.email === saved.email &&
              item.role === saved.role,
          );

          if (found) {
            const { password: _password, ...safeUser } = found;
            setUser(safeUser);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      // Restoration has finished, whether successful or not.
      setIsLoading(false);
    }
  }, []);

  function login(email: string, password: string): boolean {
    const found = demoUsers.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password,
    );

    console.log("found::::::::::::", found);
    if (!found) return false;
    const { password: _password, ...safeUser } = found;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    setUser(safeUser);

    return true;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
