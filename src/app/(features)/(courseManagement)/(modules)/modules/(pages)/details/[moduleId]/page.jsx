"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from "./components/sidebar";
import ModuleDetailsContent from "./components/content";
import ModuleDetailsHeader from "./components/header";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Module Details Page Component
 * @description Main page component for displaying module details with tabbed navigation
 */
export default function ModuleDetailsPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const { moduleId } = useParams();

    // Check if mobile view
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // Auto-close sidebar when switching to desktop
            if (!mobile) {
                setSidebarVisible(false);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    /**
     * Toggle sidebar visibility
     */
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    /**
     * Handle tab change and close sidebar on mobile
     */
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // Close sidebar after selection on mobile
        if (isMobile) {
            setSidebarVisible(false);
        }
    };

    if (!moduleId) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Module ID is required</p>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="transition-colors duration-300">
                <ModuleDetailsHeader moduleId={moduleId} />

                {/* Mobile Navigation Toggle */}
                {isMobile && (
                    <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
                        <Button variant="outline" size="sm" onClick={toggleSidebar} className="flex items-center gap-2">
                            <Menu className="h-4 w-4" />
                            Navigation
                        </Button>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    {/* Desktop: Sidebar navigation */}
                    {!isMobile && (
                        <div className="lg:w-48 flex-shrink-0">
                            <div className="sticky top-8">
                                <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                            </div>
                        </div>
                    )}

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        <ModuleDetailsContent activeTab={activeTab} />
                    </div>
                </div>

                {/* Mobile: Sidebar Overlay */}
                {isMobile && sidebarVisible && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300">
                        <div
                            className={`
                            fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-2xl 
                            transform transition-transform duration-300 ease-out
                            ${sidebarVisible ? "translate-x-0" : "-translate-x-full"}
                            w-80 max-w-[80vw]
                        `}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold">Navigation</h3>
                                <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="overflow-auto h-[calc(100vh-80px)]">
                                <div className="p-4">
                                    <SidebarNavigation activeTab={activeTab} setActiveTab={handleTabChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
}
