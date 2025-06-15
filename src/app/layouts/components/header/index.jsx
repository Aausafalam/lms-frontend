// app/components/dashboard/Header.jsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, Search, User, Sun, Moon, ChevronDown, Shield, UserCircle, LogOut } from "lucide-react";
import { useAuth } from "@/services/context/auth";
import { useTheme } from "@/services/context/theme";
import ApiUtils from "@/services/utils";

export default function Header({ setMobileMenuOpen }) {
    const router = useRouter();
    const { darkMode, toggleTheme } = useTheme();
    const { authenticate } = useAuth();
    const [searchText, setSearchText] = React.useState("");
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(false);
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

    const profileClickHandler = () => {
        setShowProfile((prev) => !prev);
    };

    const handleLogout = () => {
        ApiUtils.deleteAuthToken();
        router.push("/auth/login");
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProfile && !event.target.closest(".profile-dropdown")) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showProfile]);

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

                <div onClick={profileClickHandler} className="relative profile-dropdown">
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
                    {showProfile && (
                        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-50 animate-in slide-in-from-top-2 duration-200">
                            {/* User Info Section */}
                            <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-blue-100 dark:ring-blue-900 shadow-lg">
                                        <User className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900 dark:text-white">{currentUser?.name}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email}</span>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 w-fit mt-1">
                                            <Shield className="h-3 w-3 mr-1" />
                                            {currentUser?.role || "Administrator"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                    <UserCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    Profile Settings
                                </button>

                                {/* <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                    <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    Account Settings
                                </button> */}

                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                                    <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    Notifications
                                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">3</span>
                                </button>
                            </div>

                            {/* Separator */}
                            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                            {/* Logout */}
                            <a
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium cursor-pointer"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
