"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Tabs({ tabs, defaultTab, className, variant = "pills", onTabChange }) {
    const [activeTab, setActiveTab] = React.useState(defaultTab.id || tabs[0]?.id);
    const [hoveredTab, setHoveredTab] = React.useState(null);

    React.useEffect(() => {
        setActiveTab(defaultTab.id);
    }, [defaultTab]);

    const getTabStyles = (tabId) => {
        const isActive = activeTab === tabId;
        const isHovered = hoveredTab === tabId;

        switch (variant) {
            case "pills":
                return {
                    container: cn(
                        "relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 min-w-[120px]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                        isActive ? "text-white shadow-lg" : "text-gray-500 hover:text-primary bg-white"
                    ),
                    indicator: "absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-[0_4px_14px_0_rgba(255,142,6,0.39)]",
                };
            case "cards":
                return {
                    container: cn(
                        "relative px-6 py-4 rounded-lg text-sm font-medium transition-all duration-300 min-w-[120px] border",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                        isActive ? "text-primary border-primary/30 bg-primary/5" : "text-gray-500 hover:text-primary border-transparent hover:bg-muted/50"
                    ),
                    indicator: null,
                };
            case "bubbles":
                return {
                    container: cn(
                        "relative px-6 py-3 text-sm font-medium transition-all duration-300 min-w-[120px] overflow-hidden",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                        isActive ? "text-primary" : "text-gray-500 hover:text-primary/90"
                    ),
                    indicator: "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_0_rgba(255,142,6,0.7)]",
                };
            case "underline":
            default:
                return {
                    container: cn(
                        "relative px-6 py-3 text-sm font-medium transition-all duration-300 min-w-[120px]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                        isActive ? "text-primary" : "text-gray-500 hover:text-primary/70"
                    ),
                    indicator: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/80 via-primary to-primary/80",
                };
        }
    };

    return (
        <div className={cn("w-full mx-auto", className)}>
            <div className="relative flex overflow-x-auto scrollbar-hide p-1">
                <div className={cn("flex w-full gap-2", variant === "underline" && "border-b dark:border-gray-900")}>
                    {tabs.map((tab) => {
                        const styles = getTabStyles(tab.id);
                        return (
                            <button
                                type="button"
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    onTabChange({ label: tab.label, id: tab.id });
                                }}
                                onMouseEnter={() => setHoveredTab(tab.id)}
                                onMouseLeave={() => setHoveredTab(null)}
                                className={`${styles.container}`}
                                aria-selected={activeTab === tab.id}
                                role="tab"
                            >
                                {activeTab === tab.id && styles.indicator && (
                                    <motion.div layoutId={`tab-indicator-${variant}`} className={styles.indicator} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                                )}
                                <span className="relative z-2 flex items-center justify-center gap-2">
                                    {tab.icon && <span className="text-lg">{tab.icon}</span>}
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="mt-1">
                <AnimatedTabContent tabs={tabs} activeTab={activeTab} />
            </div>
        </div>
    );
}

function AnimatedTabContent({ tabs, activeTab }) {
    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

    return (
        <motion.div
            key={activeTab}
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative overflow-hidden w-full"
        >
            <div className="p-2">{activeTabContent}</div>
        </motion.div>
    );
}
