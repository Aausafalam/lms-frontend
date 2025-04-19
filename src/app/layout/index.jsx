"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { lmsMenuItems } from "./config/menu";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("sidebarCollapsed");
            return saved ? JSON.parse(saved) : false;
        }
        return false;
    });

    // Initialize activeMenu state from localStorage or default to "dashboard"
    const [activeMenu, setActiveMenu] = React.useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("activeMenu");
            return saved || "dashboard";
        }
        return "dashboard";
    });

    // Initialize expandedMenus from localStorage or default with dashboard expanded
    const [expandedMenus, setExpandedMenus] = React.useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("expandedMenus");
            return saved ? JSON.parse(saved) : { dashboard: true };
        }
        return { dashboard: true };
    });

    // Save sidebar state to localStorage when it changes
    React.useEffect(() => {
        localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
    }, [sidebarCollapsed]);

    // Save activeMenu to localStorage when it changes
    React.useEffect(() => {
        localStorage.setItem("activeMenu", activeMenu);
    }, [activeMenu]);

    // Save expandedMenus to localStorage when they change
    React.useEffect(() => {
        localStorage.setItem("expandedMenus", JSON.stringify(expandedMenus));
    }, [expandedMenus]);

    // Find active menu based on current path
    React.useEffect(() => {
        if (!pathname) return;

        // Check main menu items
        for (const item of lmsMenuItems) {
            if (pathname === item.path) {
                setActiveMenu(item.id);
                setExpandedMenus((prev) => ({
                    ...prev,
                    [item.id]: true,
                }));
                return;
            }
            if (item?.subMenus) {
                for (const subItem of item?.subMenus) {
                    if (pathname === subItem.path) {
                        setActiveMenu(item.id);
                        setExpandedMenus((prev) => ({
                            ...prev,
                            [item.id]: true,
                        }));
                        return;
                    }
                }
            }
        }
    }, [pathname]);

    // Toggle submenu
    const toggleSubmenu = (id) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Set active menu and ensure its submenu is expanded
    const setActiveAndExpand = (id) => {
        setActiveMenu(id);

        // Find the parent menu if this is a submenu
        const parentMenu = lmsMenuItems.find((item) => item.subMenus?.some((subItem) => subItem.id === id));

        if (parentMenu) {
            setActiveMenu(parentMenu.id);
            setExpandedMenus((prev) => ({
                ...prev,
                [parentMenu.id]: true,
            }));
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Mobile sidebar backdrop */}
            {mobileMenuOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)} />}

            <Sidebar
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
                activeMenu={activeMenu}
                expandedMenus={expandedMenus}
                toggleSubmenu={toggleSubmenu}
                setActiveAndExpand={setActiveAndExpand}
                pathname={pathname}
                router={router}
            />

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header setMobileMenuOpen={setMobileMenuOpen} sidebarCollapsed={sidebarCollapsed} />

                {/* Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-950">{children}</main>
            </div>
        </div>
    );
}
