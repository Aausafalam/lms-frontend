"use client";

import React from "react";

import { useEffect, useState, useRef } from "react";
import GlobalUtils from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { cva } from "class-variance-authority";
import { Sparkles } from "lucide-react";

const statsCardVariants = cva("transition-all overflow-hidden group hover:shadow-xl dark:hover:shadow-none relative rounded-xl border backdrop-blur-sm", {
    variants: {
        variant: {
            default: "bg-white/80 dark:bg-gray-800/60 border-gray-200/70 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600",
            orange: "bg-gradient-to-br from-orange-50/90 to-white/95 dark:from-gray-800/90 dark:to-gray-800/70 border-orange-200/70 dark:border-orange-900/30 hover:border-orange-300 dark:hover:border-orange-800/50",
            purple: "bg-gradient-to-br from-purple-50/90 to-white/95 dark:from-gray-800/90 dark:to-gray-800/70 border-purple-200/70 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-800/50",
            blue: "bg-gradient-to-br from-blue-50/90 to-white/95 dark:from-gray-800/90 dark:to-gray-800/70 border-blue-200/70 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-800/50",
            green: "bg-gradient-to-br from-green-50/90 to-white/95 dark:from-gray-800/90 dark:to-gray-800/70 border-green-200/70 dark:border-green-900/30 hover:border-green-300 dark:hover:border-green-800/50",
        },
        size: {
            default: "p-6",
            sm: "p-4",
            lg: "p-8",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export function StatsCard({ title, value, description, icon, trend, variant = "default", size, showSparkline = false, className, premium = false, chartData }) {
    const [displayValue, setDisplayValue] = useState("0");
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);
    const chartRef = useRef(null);

    // Animation for counting up
    useEffect(() => {
        if (typeof value === "number") {
            setIsLoaded(false);
            const start = 0;
            const end = Number.parseInt(value.toString(), 10);
            const duration = 1500;
            const startTime = Date.now();

            const timer = setInterval(() => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const currentValue = Math.floor(progress * (end - start) + start);

                // Format with commas
                setDisplayValue(currentValue.toLocaleString());

                if (progress === 1) {
                    clearInterval(timer);
                    setIsLoaded(true);
                }
            }, 16);

            return () => clearInterval(timer);
        } else {
            setDisplayValue(value.toString());
            setIsLoaded(true);
        }
    }, [value]);

    // Generate random sparkline data if not provided
    const data = chartData || Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    // Get color based on variant
    const getColor = () => {
        switch (variant) {
            case "orange":
                return "text-orange-500 dark:text-orange-400";
            case "purple":
                return "text-purple-500 dark:text-purple-400";
            case "blue":
                return "text-blue-500 dark:text-blue-400";
            case "green":
                return "text-green-500 dark:text-green-400";
            default:
                return "text-gray-500 dark:text-gray-400";
        }
    };

    const getBgColor = () => {
        switch (variant) {
            case "orange":
                return "bg-gradient-to-br from-orange-500/20 to-orange-500/10 dark:from-orange-500/30 dark:to-orange-500/10";
            case "purple":
                return "bg-gradient-to-br from-purple-500/20 to-purple-500/10 dark:from-purple-500/30 dark:to-purple-500/10";
            case "blue":
                return "bg-gradient-to-br from-blue-500/20 to-blue-500/10 dark:from-blue-500/30 dark:to-blue-500/10";
            case "green":
                return "bg-gradient-to-br from-green-500/20 to-green-500/10 dark:from-green-500/30 dark:to-green-500/10";
            default:
                return "bg-gradient-to-br from-gray-500/10 to-gray-500/5 dark:from-gray-500/20 dark:to-gray-500/10";
        }
    };

    const getGlowColor = () => {
        switch (variant) {
            case "orange":
                return "from-orange-500/0 via-orange-500/10 to-orange-500/0 dark:from-orange-500/0 dark:via-orange-500/20 dark:to-orange-500/0";
            case "purple":
                return "from-purple-500/0 via-purple-500/10 to-purple-500/0 dark:from-purple-500/0 dark:via-purple-500/20 dark:to-purple-500/0";
            case "blue":
                return "from-blue-500/0 via-blue-500/10 to-blue-500/0 dark:from-blue-500/0 dark:via-blue-500/20 dark:to-blue-500/0";
            case "green":
                return "from-green-500/0 via-green-500/10 to-green-500/0 dark:from-green-500/0 dark:via-green-500/20 dark:to-green-500/0";
            default:
                return "from-gray-500/0 via-gray-500/5 to-gray-500/0 dark:from-gray-500/0 dark:via-gray-500/10 dark:to-gray-500/0";
        }
    };

    const getStrokeColor = () => {
        switch (variant) {
            case "orange":
                return "#f97316";
            case "purple":
                return "#a855f7";
            case "blue":
                return "#3b82f6";
            case "green":
                return "#22c55e";
            default:
                return "#6b7280";
        }
    };

    const getGradientId = () => {
        switch (variant) {
            case "orange":
                return "orangeGradient";
            case "purple":
                return "purpleGradient";
            case "blue":
                return "blueGradient";
            case "green":
                return "greenGradient";
            default:
                return "grayGradient";
        }
    };

    const getGradientColors = () => {
        switch (variant) {
            case "orange":
                return {
                    start: "#f97316",
                    end: "#fdba74",
                    darkStart: "#f97316",
                    darkEnd: "#c2410c",
                };
            case "purple":
                return {
                    start: "#a855f7",
                    end: "#d8b4fe",
                    darkStart: "#a855f7",
                    darkEnd: "#7e22ce",
                };
            case "blue":
                return {
                    start: "#3b82f6",
                    end: "#93c5fd",
                    darkStart: "#3b82f6",
                    darkEnd: "#1d4ed8",
                };
            case "green":
                return {
                    start: "#22c55e",
                    end: "#86efac",
                    darkStart: "#22c55e",
                    darkEnd: "#15803d",
                };
            default:
                return {
                    start: "#6b7280",
                    end: "#d1d5db",
                    darkStart: "#6b7280",
                    darkEnd: "#374151",
                };
        }
    };

    const handleMouseMove = (e) => {
        if (!chartRef.current || !showSparkline) return;

        const rect = chartRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const index = Math.floor((x / width) * data.length);

        if (index >= 0 && index < data.length) {
            setHoverIndex(index);
        }
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    return (
        <Card className={GlobalUtils.cn(statsCardVariants({ variant, size }), "hover:translate-y-[-2px] transition-all duration-300", className)}>
            {/* Premium glow effect */}
            {premium && <div className={GlobalUtils.cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-700", getGlowColor())} />}

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className={GlobalUtils.cn("text-sm font-medium transition-colors flex items-center gap-1", getColor())}>
                            {title}
                            {premium && <Sparkles className="inline-block w-3 h-3 animate-pulse" />}
                        </p>

                        <div className="flex items-baseline gap-2">
                            <h3 className={GlobalUtils.cn("text-2xl font-bold tracking-tight text-gray-900 dark:text-white transition-all duration-500", isLoaded ? "opacity-100" : "opacity-70")}>
                                {displayValue}
                            </h3>

                            {trend && (
                                <span
                                    className={GlobalUtils.cn(
                                        "inline-flex items-center text-xs font-medium rounded-full px-2 py-0.5 transition-all",
                                        trend.isPositive ? "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30" : "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
                                    )}
                                >
                                    {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                                </span>
                            )}
                        </div>

                        {description && <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">{description}</p>}
                    </div>

                    {icon && (
                        <div className={GlobalUtils.cn("rounded-xl p-3 transition-all duration-300 group-hover:scale-110 shadow-sm", getBgColor())}>
                            <div className={GlobalUtils.cn("text-lg", getColor())}>{icon}</div>
                        </div>
                    )}
                </div>

                {/* Enhanced Sparkline */}
                {showSparkline && (
                    <div ref={chartRef} className="mt-4 h-16 w-full relative" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                            {/* Gradient definitions */}
                            <defs>
                                <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor={getGradientColors().start} stopOpacity="0.3" className="dark:hidden" />
                                    <stop offset="100%" stopColor={getGradientColors().end} stopOpacity="0.05" className="dark:hidden" />
                                    <stop offset="0%" stopColor={getGradientColors().darkStart} stopOpacity="0.4" className="hidden dark:inline" />
                                    <stop offset="100%" stopColor={getGradientColors().darkEnd} stopOpacity="0.1" className="hidden dark:inline" />
                                </linearGradient>
                            </defs>

                            {/* Area fill */}
                            <path
                                d={`M0,${40 - ((data[0] - min) / range) * 30} ${data.map((d, i) => `L${(i / (data.length - 1)) * 100},${40 - ((d - min) / range) * 30}`).join(" ")} L100,40 L0,40 Z`}
                                fill={`url(#${getGradientId()})`}
                                className="transition-opacity duration-300"
                            />

                            {/* Line */}
                            <path
                                d={`M0,${40 - ((data[0] - min) / range) * 30} ${data.map((d, i) => `L${(i / (data.length - 1)) * 100},${40 - ((d - min) / range) * 30}`).join(" ")}`}
                                fill="none"
                                stroke={getStrokeColor()}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-70 dark:opacity-80"
                            />

                            {/* Data points */}
                            {data.map((d, i) => (
                                <circle
                                    key={i}
                                    cx={`${(i / (data.length - 1)) * 100}`}
                                    cy={`${40 - ((d - min) / range) * 30}`}
                                    r={hoverIndex === i ? "3" : "0"}
                                    fill={getStrokeColor()}
                                    className="transition-all duration-200"
                                />
                            ))}

                            {/* Last point always visible */}
                            <circle cx="100" cy={`${40 - ((data[data.length - 1] - min) / range) * 30}`} r="3" fill={getStrokeColor()} className="opacity-80 dark:opacity-90 animate-pulse" />
                        </svg>

                        {/* Tooltip */}
                        {hoverIndex !== null && (
                            <div
                                className={GlobalUtils.cn(
                                    "absolute px-2 py-1 rounded-md text-xs font-medium shadow-md transform -translate-x-1/2 -translate-y-full",
                                    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
                                    getColor()
                                )}
                                style={{
                                    left: `${(hoverIndex / (data.length - 1)) * 100}%`,
                                    top: `${40 - ((data[hoverIndex] - min) / range) * 30}%`,
                                }}
                            >
                                {data[hoverIndex]}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
}
