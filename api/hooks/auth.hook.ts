import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) =>
      login(data),
    onSuccess: (data) => {
      // Handle successful login, e.g., store token, redirect, etc.
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/;`;
      router.push("/dashboard"); // Redirect to dashboard or another page
    },
  });
};
