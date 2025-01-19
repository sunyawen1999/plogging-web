"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHistory, FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import axios from "axios";
import LoginDialog from "./LoginDialog";

import Button from "./Button";
import { useAuth } from "@/providers/AuthProvider";


interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const { user, setUser } = useAuth();
    const router = useRouter();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleMockLogin = (email: string, password: string) => {
        const mockName = "Mia";
        console.log("Mock Login:", { email, password });
        setUser({ name: mockName, email });
        setDialogOpen(false);
        toast.success("Logged in successfully!");
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

                        <Button
                          className="
                            bg-transparent
                            text-neutral-300
                            font-medium
                          "
                        >
                          Sign up
                        </Button>

                                <Button onClick={() => setUser(null)} className="bg-white px-6 py-2">Logout</Button>
                                <Button className="bg-white">
                                    <FaUserAlt />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button onClick={() => setDialogOpen(true)} className="bg-white px-6 py-2">
                                    Log in
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                {children}
            </div>
            {/* Mock Login Dialog */}
            <LoginDialog
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                onLogin={handleMockLogin}
            />
        </>
    );
};

export default Header;