import { useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/providers/api/index"; // 导入你配置好的 Axios 实例
import toast from "react-hot-toast";

const AuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                // 使用 apiClient 发起请求
                const res = await apiClient.get("/login/redirect", { withCredentials: true });
                
                if (res.data.user) {
                    // 保存用户信息到 localStorage 或 AuthContext
                    localStorage.setItem("user", JSON.stringify(res.data.user)); // 如果需要本地存储
                }
                router.push("/"); // 跳转到首页
            } catch (error) {
                toast.error("Google OAuth failed");
                console.error("Google OAuth failed:", error);
                router.push("/login");
            }
        };

        handleRedirect();
    }, [router]);

    return <div>Redirecting...</div>;
};

export default AuthRedirect;
