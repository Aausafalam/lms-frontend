"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, User, LogOut, X } from "lucide-react";
import { lmsMenuItems, ICON } from "../../config/menu";
import { useAuth } from "@/services/context/auth";

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen, sidebarCollapsed, setSidebarCollapsed, activeMenu, expandedMenus, toggleSubmenu, setActiveAndExpand, pathname, router }) {
    const { authenticate } = useAuth();
    const currentUser = authenticate.data;
    // Check if a path is active
    const isPathActive = (path) => {
        return pathname === path;
    };

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out lg:relative ${
                sidebarCollapsed ? "w-[70px]" : "w-[280px]"
            } ${mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0 lg:shadow-md"}`}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center">{ICON.LMS}</div>
                    {!sidebarCollapsed && (
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-900 dark:text-white text-md tracking-tight">LMS Portal</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Learning Management</span>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="hidden lg:flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
                    aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="lg:hidden h-8 w-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors"
                    aria-label="Close sidebar"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <ul className="space-y-1.5">
                    {lmsMenuItems.map((item) => (
                        <li key={item.id} className="space-y-1">
                            <button
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                    activeMenu === item.id
                                        ? "bg-gradient-to-r from-orange-500/10 to-orange-500/5 text-orange-600 dark:from-orange-500/20 dark:to-orange-500/10 dark:text-orange-400 shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80"
                                }`}
                                onClick={() => {
                                    if (item.subMenus?.length > 0) {
                                        toggleSubmenu(item.id);
                                        setActiveAndExpand(item.id);
                                    } else {
                                        router.push(item.path);
                                        setActiveAndExpand(item.id);
                                    }
                                }}
                            >
                                <div className="flex items-center">
                                    <div className={`${sidebarCollapsed ? "mx-auto" : "mr-3"} relative`}>
                                        <item.icon className={`h-5 w-5 ${activeMenu === item.id ? "text-orange-600 dark:text-orange-400" : "text-gray-500 dark:text-gray-400"}`} />
                                    </div>
                                    {!sidebarCollapsed && <span>{item.label}</span>}
                                </div>
                                {!sidebarCollapsed &&
                                    item.subMenus?.length > 0 &&
                                    (expandedMenus[item.id] ? (
                                        <ChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform" />
                                    ))}
                            </button>

                            {/* Submenu */}
                            {!sidebarCollapsed && item.subMenus?.length > 0 && (
                                <ul className={`mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus[item.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                    {item.subMenus?.map((subItem) => (
                                        <li key={subItem.id}>
                                            <Link
                                                href={subItem.path}
                                                className={`flex items-center justify-between rounded-lg pl-11 pr-3 py-2 text-sm font-medium transition-all ${
                                                    isPathActive(subItem.path)
                                                        ? "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80"
                                                }`}
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                <span>{subItem.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-4">
                <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"} mb-4`}>
                    {!sidebarCollapsed && (
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.name || "Admin User"}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.role || "Administrator"}</span>
                        </div>
                    )}
                    <div
                        className={`relative h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-white dark:ring-gray-900 ${
                            sidebarCollapsed ? "" : "ml-auto"
                        }`}
                    >
                        <User className="h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                    </div>
                </div>
                <Link
                    href="/auth/logout"
                    className={`flex ${
                        sidebarCollapsed ? "justify-center" : "w-full"
                    } items-center rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-800/80 transition-colors`}
                >
                    <LogOut className={`${sidebarCollapsed ? "" : "mr-3"} h-5 w-5`} />
                    {!sidebarCollapsed && <span>Logout</span>}
                </Link>
            </div>
        </aside>
    );
}
