"use client";

import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface UserData 
{
    username: string;
    role: string;
    pfp: string;
}

export default function User() 
{
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Load user data from localStorage on component mount
    useEffect(() => 
    {
        const storedUser = localStorage.getItem("user");
        if (storedUser) 
        {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => 
    {
        // Clear user data from localStorage
        localStorage.removeItem("user");
        // Clear session cookie by making a request to logout endpoint
        fetch("/api/logout.php", 
        {
            method: "POST",
            credentials: "include"
        })
        .finally(() => 
        {
            // Reset user data state
            setUserData(null);
            // Redirect to root URL
            window.location.href = "/";
        });
    };

    return (
        <div className="flex h-16 items-center border-b border-border px-2">
            <div 
                className="relative flex w-full items-center justify-between rounded-md px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div className="flex items-center">
                    {/* Display user's profile picture or default */}
                    <Image
                        src={userData?.pfp || "/committee0.png"}
                        alt={userData?.username || "Guest"}
                        className="mr-2 rounded-full"
                        width={36}
                        height={36}
                    />
                    <div className="flex flex-col">
                        {/* Display username or "Please login" */}
                        <span className="text-sm font-medium">
                            {userData?.username || "Please login"}
                        </span>
                        {/* Display role or "Guest" */}
                        <span className="text-xs text-muted-foreground">
                            {userData?.role || "Guest"}
                        </span>
                    </div>
                </div>
                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                
                {/* Dropdown menu */}
                {isDropdownOpen && userData && (
                    <div className="absolute right-0 top-full mt-1 w-full rounded-md border border-border bg-background shadow-lg">
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={(e) => 
                            {
                                e.stopPropagation();
                                handleLogout();
                            }}
                        >
                            <LogOut size={16} className="mr-2" />
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
