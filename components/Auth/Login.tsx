"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    control,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("Errors:", errors); // Log the errors object to the console

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    const success = login(data.email, data.password);

    if (!success) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Login successful!");

    router.replace("/");
  };

  return (
    <>
      <Card className="relative z-10 w-full max-w-md gap-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white py-0 shadow-xl shadow-slate-200/60">
        {/* Header */}
        <CardHeader className="space-y-5 px-6 pb-6 pt-8 sm:px-9 sm:pt-10">
          <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <ShieldCheck className="size-6" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-500">
              Enter your credentials to sign in to your account.
            </CardDescription>
          </div>
        </CardHeader>

        {/* Form */}
        <CardContent className="px-6 pb-8 sm:px-9 sm:pb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Email address
              </Label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/50 pl-10 text-sm transition-all focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10"
                />
              </div>

              {errors.email && (
                <p className="text-sm font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </Label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50/50 pl-10 text-sm transition-all focus-visible:border-indigo-500 focus-visible:ring-4 focus-visible:ring-indigo-500/10"
                />
              </div>

              {errors.password && (
                <p className="text-sm font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-100 pt-5">
              <p className="text-sm text-slate-500">Don't have an account?</p>

              <Link
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Register
              </Link>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                className="h-12 flex-1 rounded-xl border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Reset form
              </Button>
              <Button
                type="submit"
                className="h-12 flex-1 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg"
              >
                Sign in
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
