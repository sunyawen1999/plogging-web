"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/providers/api/index"; // 使用配置好的 Axios 实例

interface AuthContextType {
    user: { name: string; email: string } | null;
    setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string } | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // 使用 apiClient 获取当前用户信息
                const res = await apiClient.get("/me");
                setUser(res.data.user); // 设置用户状态
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null); // 如果请求失败，将用户状态设置为 null
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
