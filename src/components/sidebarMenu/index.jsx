"use client";
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import GlobalUtils from "@/lib/utils";

const SidebarMenu = ({ navigationItems, className, onClick, activeSection }) => {
    const tab = activeSection || navigationItems[0]?.id;

    const handleTabClick = (id) => {
        onClick?.(id);
    };

    // useEffect(() => {
    //     if (activeSection && activeSection !== tab) {
    //         const params = new URLSearchParams(searchParams);
    //         params.set("tab", activeSection);
    //         router.push(`?${params.toString()}`);
    //     }
    // }, [activeSection, tab, searchParams, router]);

    return (
        <Card className={`overflow-hidden border-0 bg-white dark:bg-gray-900 dark:border-gray-800 ${className}`}>
            <CardContent className="p-2">
                <nav className="space-y-1">
                    {navigationItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={GlobalUtils.cn(
                                "w-full justify-start text-left mb-1 font-normal transition-all px-2",
                                tab === item.id ? "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                            )}
                            onClick={() => handleTabClick(item.id)}
                        >
                            <div
                                className={GlobalUtils.cn(
                                    "mr-2 p-1 rounded-md transition-all",
                                    tab === item.id ? "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                )}
                            >
                                {item.icon}
                            </div>
                            <span>{item.label}</span>
                        </Button>
                    ))}
                </nav>
            </CardContent>
        </Card>
    );
};

export default SidebarMenu;
