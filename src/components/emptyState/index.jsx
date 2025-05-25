"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import GlobalUtils from "@/lib/utils";

export function EmptyState({ icon: Icon, title, description, actionLabel, actionIcon: ActionIcon, onAction, className, children }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={GlobalUtils.cn(
                "relative overflow-hidden  w-full rounded-xl border border-dashed p-8 text-center",
                "bg-gradient-to-b from-orange-50/80 to-orange-100/30 dark:from-orange-950/20 dark:to-orange-900/5",
                "shadow-[inset_0_0_40px_rgba(249,115,22,0.05)]",
                className
            )}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-orange-200/20 dark:bg-orange-700/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-orange-200/20 dark:bg-orange-700/10 blur-3xl" />
                <div className="absolute top-1/4 left-12 w-1 h-1 rounded-full bg-orange-300 dark:bg-orange-600 opacity-70" />
                <div className="absolute top-1/3 right-12 w-2 h-2 rounded-full bg-orange-300 dark:bg-orange-600 opacity-70" />
                <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-orange-300 dark:bg-orange-600 opacity-70" />
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-orange-300 dark:bg-orange-600 opacity-70" />
            </div>

            <div className="relative flex flex-col items-center justify-center h-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {Icon && (
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-orange-400/20 dark:bg-orange-500/20 blur-xl animate-pulse" />
                            <div className="relative rounded-full bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/60 dark:to-orange-950/60 p-5 shadow-lg shadow-orange-200/20 dark:shadow-orange-900/10 border border-orange-200/50 dark:border-orange-800/30">
                                <Icon className="h-12 w-12 text-orange-600 dark:text-orange-500" aria-hidden="true" />
                            </div>
                            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-orange-300/20 to-transparent dark:from-orange-500/20 blur animate-pulse" />
                        </div>
                    )}

                    <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isVisible ? 0 : 20, opacity: isVisible ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="mt-6 text-lg font-semibold bg-gradient-to-r from-orange-700 to-orange-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent"
                    >
                        {title}
                    </motion.h3>

                    {description && (
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: isVisible ? 0 : 20, opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                            className="mt-3 text-[0.8rem] text-orange-700/70 dark:text-orange-300/70 max-w-sm font-medium"
                        >
                            {description}
                        </motion.p>
                    )}

                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: isVisible ? 0 : 20, opacity: isVisible ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}>
                        {children}
                    </motion.div>

                    {actionLabel && onAction && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: isVisible ? 0 : 20, opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8"
                        >
                            <Button onClick={onAction}>
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {ActionIcon && <ActionIcon className="h-5 w-5" />}
                                {actionLabel}
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
