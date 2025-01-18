import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const AuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const handleRedirect = async () => {
            try {
                const res = await axios.get("http://<backend-url>/login/redirect", { withCredentials: true });
                if (res.data.user) {
                    // 保存用户信息到 AuthProvider
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

