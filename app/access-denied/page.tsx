"use client";

import Link from "next/link";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

import { useAuth } from "@/components/context/AuthProvider";

export default function AccessDeniedPage() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <ShieldX className="h-10 w-10 text-red-600" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-red-600">
          Error 403
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Access Denied
        </h1>

        <p className="mt-4 text-sm leading-6 text-gray-600">
          Sorry{user?.name ? `, ${user.name}` : ""}, you don't have permission
          to access this page. Please contact your administrator if you think
          this is a mistake.
        </p>

        {user && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4 text-left">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Current account
            </p>
            <p className="mt-1 font-medium text-gray-900">{user.email}</p>
            <p className="mt-1 text-sm capitalize text-gray-500">
              Role: {user.role}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}
