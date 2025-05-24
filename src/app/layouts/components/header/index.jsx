// app/components/dashboard/Header.jsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, Search, User, Sun, Moon, ChevronDown } from "lucide-react";
import { useAuth } from "@/services/context/auth";
import { useTheme } from "@/services/context/theme";

export default function Header({ setMobileMenuOpen }) {
    const router = useRouter();
    const { darkMode, toggleTheme } = useTheme();
    const { authenticate } = useAuth();
    const [searchText, setSearchText] = React.useState("");
    const [searchOpen, setSearchOpen] = React.useState(false);
    const currentUser = authenticate.data;
    const handleSearch = (event) => {
        event.preventDefault();
        // Simple search routing logic
        const query = searchText.toLowerCase();
        if (query.includes("course")) {
            router.push("/courses");
        } else if (query.includes("user")) {
            router.push("/users");
        } else if (query.includes("instructor")) {
            router.push("/instructors");
        } else {
            router.push(`/search?q=${encodeURIComponent(searchText)}`);
        }
    };

    useEffect(() => {
        authenticate.execute({});
    }, []);

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Open sidebar"
                >
                    <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>

                <div className={`relative ${searchOpen ? "w-64" : "w-9 lg:w-64"} transition-all duration-200`}>
                    {searchOpen || (typeof window !== "undefined" && window.innerWidth >= 1024) ? (
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                            <input
                                type="text"
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                                placeholder="Search courses, users..."
                                className="h-9 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-orange-500 transition-colors"
                            />
                        </form>
                    ) : (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Open search"
                        >
                            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative overflow-hidden group"
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    <Sun className={`h-5 w-5 text-amber-500 absolute transition-all duration-300 ${darkMode ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"}`} />
                    <Moon className={`h-5 w-5 text-blue-500 absolute transition-all duration-300 ${darkMode ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`} />
                </button>

                <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Notifications">
                    <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
                </button>

                <div className="relative">
                    <button className="flex items-center gap-2 rounded-lg hover:bg-gray-100 p-1.5 dark:hover:bg-gray-800 transition-colors" aria-label="User menu">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-white dark:ring-gray-900 shadow-lg">
                            <User className="h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                        </div>
                        <div className="hidden lg:block text-left">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.name || "Admin User"}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.role || "Administrator"}</div>
                        </div>
                        <ChevronDown className="hidden lg:block h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
            </div>
        </header>
    );
}
