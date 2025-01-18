"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHistory } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";


interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    children,
}) => {
    const pathname = usePathname();

    const routes = useMemo(()=> [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/history',
            href: '/',
        },
        {
            icon: FaHistory,
            label: 'history',
            active: pathname == '/history',
            href: '/history',
        }
    ], [pathname])

    return ( 
        <div className="flex h-full">
            <div className="
              hidden
              md:flex
              flex-col
              gap-y-2
              bg-black
              h-full
              w-[300px]
              p-2
              "
            >
                <Box>
                    <div className="
                        flex
                        flex-col
                        gap-y-4
                        px-5
                        py-5"
                    >
                        {routes.map((item)=>(
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />)
                        )}
                    </div>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}
 
export default Sidebar;