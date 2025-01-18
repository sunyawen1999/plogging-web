"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
                const res = await axios.get("http://<backend-url>/me", { withCredentials: true });
                setUser(res.data.user);
            } catch {
                setUser(null); 
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
