"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { cva } from "class-variance-authority";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import GlobalUtils from "@/lib/utils";

const breadcrumbVariants = cva(
    "inline-flex items-center rounded-lg px-2.5 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                default: "bg-transparent hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/20",
                ghost: "hover:bg-muted/50 hover:text-muted-foreground dark:hover:bg-muted/20",
                current:
                    "bg-gradient-to-r from-orange-500/20 to-orange-400/10 text-orange-600 dark:from-orange-400/30 dark:to-orange-500/20 dark:text-orange-300 dark:shadow-[0_0_10px_rgba(249,115,22,0.1)] backdrop-blur-sm hover:shadow-md hover:from-orange-500/30 hover:to-orange-400/20 dark:hover:from-orange-400/40 dark:hover:to-orange-500/30",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export function Breadcrumb({ items, separator = <ChevronRight className="h-4 w-4 text-muted-foreground/70" />, truncate = true, truncateLength = 3, homeHref = "/", className, ...props }) {
    const displayItems = truncate && items.length > truncateLength ? [...items.slice(0, 1), { title: "...", href: "" }, ...items.slice(-truncateLength + 1)] : items;

    return (
        <nav
            className={GlobalUtils.cn(
                "relative flex flex-wrap items-center gap-1.5 p-1.5 rounded-lg backdrop-blur-[2px]",
                "bg-white/100 dark:bg-gray-900  dark:shadow-md dark:shadow-orange-950/5",
                "border border-gray-100 dark:border-gray-800/50 w-fit",
                className
            )}
            aria-label="Breadcrumb"
            {...props}
        >
            <div className="inline-flex items-center">
                <Link
                    href={homeHref}
                    className={GlobalUtils.cn(breadcrumbVariants({ variant: "ghost" }), "group rounded-full p-1.5 text-muted-foreground transition-all hover:scale-110 dark:text-gray-400")}
                    aria-label="Home"
                >
                    <Home className="h-4 w-4 transition-all group-hover:text-orange-500 dark:group-hover:text-orange-400 dark:group-hover:drop-shadow-[0_0_3px_rgba(249,115,22,0.5)]" />
                </Link>
                <span className="mx-1 select-none text-muted-foreground/50 dark:text-gray-600">{separator}</span>
            </div>

            {displayItems.map((item, index) => {
                const isLast = index === displayItems.length - 1;
                const isTruncated = item.title === "..." && item.href === "";

                if (isTruncated) {
                    const hiddenItems = items.slice(1, -truncateLength + 1);

                    return (
                        <div key="truncated" className="flex items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={GlobalUtils.cn(breadcrumbVariants({ variant: "ghost" }), "group flex items-center gap-1 hover:scale-105 transition-transform")}>
                                        <MoreHorizontal className="h-3.5 w-3.5" />
                                        <span className="sr-only">More pages</span>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48 border-orange-100/50 dark:border-orange-900/20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
                                    {hiddenItems.map((hiddenItem) => (
                                        <DropdownMenuItem key={hiddenItem.href} asChild>
                                            <Link href={hiddenItem.href} className="flex items-center gap-2 hover:text-orange-500 dark:hover:text-orange-400">
                                                {hiddenItem.icon}
                                                <span>{hiddenItem.title}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <span className="mx-1 select-none text-muted-foreground/50 dark:text-gray-600">{separator}</span>
                        </div>
                    );
                }

                return (
                    <div key={item.href} className="flex items-center">
                        {isLast ? (
                            <span
                                className={GlobalUtils.cn(
                                    breadcrumbVariants({ variant: "current" }),
                                    "font-semibold transition-all animate-in fade-in-50 slide-in-from-right-1 duration-300 shadow-sm dark:shadow-orange-500/10"
                                )}
                                aria-current="page"
                            >
                                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                                {item.title}
                            </span>
                        ) : (
                            <>
                                <Link
                                    href={item.href}
                                    className={GlobalUtils.cn(
                                        breadcrumbVariants({ variant: "default" }),
                                        "text-muted-foreground hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 hover:scale-105 transition-all"
                                    )}
                                >
                                    {item.icon && <span className="mr-1.5 opacity-70 group-hover:opacity-100">{item.icon}</span>}
                                    {item.title}
                                </Link>
                                <span className="mx-1 select-none text-muted-foreground/50 dark:text-gray-600">{separator}</span>
                            </>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
