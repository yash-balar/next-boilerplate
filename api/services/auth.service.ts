import axiosClient from "@/lib/axios";

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosClient.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
