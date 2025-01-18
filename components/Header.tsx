"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHistory, FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import axios from "axios";

import Button from "./Button";
import { useAuth } from "@/providers/AuthProvider";


interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const { user, setUser } = useAuth();
    const router = useRouter();

    const handleLogout = () => {

        setUser(null); // 清除用户状态
        toast.success("Logged out");
        router.refresh();
    };

    const handleGoogleLogin = async () => {
        try {
            const { data } = await axios.get("http://<backend-url>/login", { withCredentials: true });
            if (data.url) {
                window.location.href = data.url; // Redirect to Google login page
            } else {
                throw new Error("Google login URL not provided");
            }
        } catch (error) {
            toast.error("Failed to initiate Google login");
            console.error("Error fetching Google login URL:", error);
        }
    };
    
    

    return (
        <>
            <div className={twMerge(`h-fit bg-gradient-to-b from-green-900 p-6`, className)}>
                <div className="w-full mb-4 flex items-center justify-between">
                    <div className="hidden md:flex gap-x-2 items-center"></div>
                    <div className="flex md:hidden gap-x-2 items-center">
                        <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                            <HiHome className="text-black" size={20} />
                        </button>
                        <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                            <FaHistory className="text-black" size={20} />
                        </button>
                    </div>
                    <div className="flex justify-between items-center gap-x-4">
                        {user ? (
                            <div className="flex gap-x-4 items-center">
                                <Button onClick={handleLogout} className="bg-white px-6 py-2">Logout</Button>
                                <Button onClick={() => router.push('/authRedirect')} className="bg-white">
                                    <FaUserAlt />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button onClick={handleGoogleLogin} className="bg-white px-6 py-2">
                                    Log in with Google
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                {children}
            </div>
        </>
    );
};

export default Header;
