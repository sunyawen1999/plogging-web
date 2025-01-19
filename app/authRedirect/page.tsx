"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";

const AuthRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuth();

  const code = searchParams.get("code"); // 从 URL 中提取授权码

  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (!code) {
        toast.error("Authorization code is missing");
        return router.push("/");
      }

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/redirect`,
          { params: { code } }
        );

        // 保存 Token 和用户信息
        localStorage.setItem("token", data.token);
        setUser(data.user); // 设置全局用户状态

        toast.success("Login successful!");
        router.push("/"); // 跳转到主页
      } catch (error) {
        console.error("Failed to complete Google login:", error);
        toast.error("Login failed. Please try again.");
        router.push("/");
      }
    };

    handleAuthRedirect();
  }, [code, router, setUser]);

  return <div>Authenticating...</div>;
};

export default AuthRedirect;
