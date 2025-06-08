"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import GlobalUtils from "@/lib/utils";

/**
 * Enhanced Reusable Content Card Component
 *
 * Features:
 * - Multiple header color themes
 * - Collapsible functionality with smooth animations
 * - Loading and error states
 * - Action buttons and badges
 * - Responsive design
 * - Accessibility support
 * - Custom header content
 * - Progress indicators
 */
export function ContentCard({
    // Content props
    title,
    subTitle,
    description,
    children,

    // Icon props
    icon,
    Icon,
    iconSize = "w-5 h-5",

    // Visual props
    headerColor = "orange",
    variant = "default", // default, outlined, filled, minimal
    size = "default", // sm, default, lg

    // Behavior props
    collapsible = false,
    defaultExpanded = true,
    disabled = false,
    loading = false,

    // State props
    status, // success, warning, error, info
    progress, // 0-100 for progress bar

    // Action props
    actions = [], // Array of action buttons
    badges = [], // Array of badges
    onToggle,
    onHeaderClick,

    // Responsive props
    isMobile = false,
    responsive = true,

    // Custom props
    headerContent, // Custom header content
    footerContent, // Custom footer content
    className = "",
    headerClassName = "",
    contentClassName = "",

    // Accessibility props
    ariaLabel,
    ariaDescribedBy,

    ...props
}) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    // Enhanced color system with more options
    const colorClasses = useMemo(
        () => ({
            // Primary colors
            blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30 text-blue-700 dark:text-blue-300",
            purple: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/30 text-purple-700 dark:text-purple-300",
            orange: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800/30 text-orange-700 dark:text-orange-300",
            green: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-300",
            indigo: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/30 text-indigo-700 dark:text-indigo-300",
            red: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-300",
            yellow: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800/30 text-yellow-700 dark:text-yellow-300",

            // Secondary colors
            teal: "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800/30 text-teal-700 dark:text-teal-300",
            cyan: "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800/30 text-cyan-700 dark:text-cyan-300",
            pink: "bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800/30 text-pink-700 dark:text-pink-300",
            rose: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/30 text-rose-700 dark:text-rose-300",
            emerald: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-300",
            sky: "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800/30 text-sky-700 dark:text-sky-300",
            violet: "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800/30 text-violet-700 dark:text-violet-300",

            // Neutral colors
            gray: "bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800/30 text-gray-700 dark:text-gray-300",
            slate: "bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800/30 text-slate-700 dark:text-slate-300",
            zinc: "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800/30 text-zinc-700 dark:text-zinc-300",
            stone: "bg-stone-50 dark:bg-stone-950/20 border-stone-200 dark:border-stone-800/30 text-stone-700 dark:text-stone-300",

            // Special colors
            white: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100",
            transparent: "bg-transparent border-transparent text-current",
        }),
        []
    );

    // Status colors for different states
    const statusColors = useMemo(
        () => ({
            success: "green",
            warning: "yellow",
            error: "red",
            info: "blue",
        }),
        []
    );

    // Status icons
    const statusIcons = useMemo(
        () => ({
            success: CheckCircle,
            warning: AlertCircle,
            error: XCircle,
            info: Info,
        }),
        []
    );

    // Size variants
    const sizeClasses = useMemo(
        () => ({
            sm: {
                header: "p-3",
                content: "p-3",
                title: "text-sm",
                subtitle: "text-xs",
                icon: "w-3 h-3",
            },
            default: {
                header: "p-4 pb-3",
                content: "p-4",
                title: isMobile ? "text-base" : "text-base",
                subtitle: "text-[0.8rem]",
                icon: "w-[1.1rem] h-[1.1rem]",
            },
            lg: {
                header: "p-6",
                content: "p-6",
                title: isMobile ? "text-lg" : "text-xl",
                subtitle: "text-base",
                icon: "w-6 h-6",
            },
        }),
        [isMobile]
    );

    // Variant styles
    const variantClasses = useMemo(
        () => ({
            default: "border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800",
            outlined: "border-2 bg-transparent",
            filled: "border-0 shadow-md",
            minimal: "border-0 shadow-none bg-transparent",
        }),
        []
    );

    const handleToggle = useCallback(() => {
        const newExpanded = !isExpanded;
        setIsExpanded(newExpanded);
        onToggle?.(newExpanded);
    }, [isExpanded, onToggle]);

    const handleHeaderClick = useCallback(
        (e) => {
            if (collapsible && !disabled) {
                handleToggle();
            }
            onHeaderClick?.(e);
        },
        [collapsible, disabled, handleToggle, onHeaderClick]
    );

    // Determine final header color
    const finalHeaderColor = status ? statusColors[status] : headerColor;
    const StatusIcon = status ? statusIcons[status] : null;
    const FinalIcon = StatusIcon || Icon;

    // Build class names
    const cardClasses = `
    overflow-hidden
    ${variantClasses[variant]} 
    ${disabled ? "opacity-60 cursor-not-allowed" : ""}
    ${loading ? "animate-pulse" : ""}
    ${className}
  `.trim();

    const headerClasses = `
    ${sizeClasses[size].header} 
    border-b 
    ${colorClasses[finalHeaderColor]} 
    ${collapsible && !disabled ? "cursor-pointer hover:bg-opacity-80 transition-colors" : ""}
    ${headerClassName}
  `.trim();

    const contentClasses = `
    ${sizeClasses[size].content} 
    ${contentClassName}
  `.trim();

    return (
        <Card className={cardClasses} aria-label={ariaLabel} aria-describedby={ariaDescribedBy} {...props}>
            {/* Header */}
            {!props.isHideHeader && (
                <div className={headerClasses} onClick={handleHeaderClick}>
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`p-2 rounded-full bg-${headerColor === "white" ? "orange" : headerColor}-100 dark:bg-${
                                        headerColor === "white" ? "orange" : headerColor
                                    }-900/30  dark:text-${headerColor === "white" ? "orange" : headerColor}-400`}
                                >
                                    {(icon || FinalIcon) && <span className="flex-shrink-0">{icon || <FinalIcon className={iconSize || sizeClasses[size].icon} />}</span>}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0">
                                        <CardTitle className={`${sizeClasses[size].title}`}>{title}</CardTitle>
                                        {/* Badges */}
                                        {badges.length > 0 && (
                                            <div className="flex gap-1 flex-wrap">
                                                {badges.map((badge, index) => (
                                                    <Badge key={index} variant={badge.variant || "secondary"} className={badge.className}>
                                                        {badge.icon && <badge.icon className="w-3 h-3 mr-1" />}
                                                        {badge.label}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {subTitle && <CardDescription className={`mt-0 ${sizeClasses[size].subtitle}`}>{subTitle}</CardDescription>}
                                </div>
                            </div>

                            {/*  Description */}
                            {description && <div className="space-y-1">{description && <p className="text-gray-500 dark:text-gray-500 text-xs">{description}</p>}</div>}

                            {/* Progress Bar */}
                            {progress !== undefined && (
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-current h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
                                </div>
                            )}

                            {/* Custom Header Content */}
                            {headerContent && <div className="mt-2">{headerContent}</div>}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2 ml-4">
                            {/* Action Buttons */}
                            {actions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant={action.variant || "ghost"}
                                    size={action.size || "sm"}
                                    onClick={action.onClick}
                                    disabled={disabled || action.disabled}
                                    className={action.className}
                                    title={action.tooltip}
                                >
                                    {action.icon && <action.icon className="w-4 h-4" />}
                                    {action.label && <span className="ml-1">{action.label}</span>}
                                </Button>
                            ))}

                            {/* Collapse Toggle */}
                            {collapsible && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleToggle}
                                    disabled={disabled}
                                    className="hover:bg-white/50 dark:hover:bg-gray-800/50 p-1"
                                    aria-label={isExpanded ? "Collapse" : "Expand"}
                                >
                                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            {(!collapsible || isExpanded) && (
                <div className={contentClasses}>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            )}

            {/* Footer */}
            {footerContent && <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">{footerContent}</div>}
        </Card>
    );
}

// Example usage component
const ExampleUsage = () => {
    const [progress, setProgress] = useState(65);

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold mb-6">Enhanced ContentCard Examples</h1>

            {/* Basic Example */}
            <ContentCard title="Basic Card" subTitle="Simple content card" icon="📚" headerColor="blue">
                <p>This is a basic content card with minimal configuration.</p>
            </ContentCard>

            {/* Advanced Example */}
            <ContentCard
                title="Advanced Learning Module"
                subTitle="Interactive content with progress tracking"
                description="This module covers advanced React concepts and patterns"
                Icon={Info}
                headerColor="purple"
                status="info"
                progress={progress}
                collapsible={true}
                badges={[
                    { label: "Advanced", variant: "destructive" },
                    { label: "Interactive", variant: "secondary" },
                ]}
                actions={[
                    {
                        icon: ChevronUp,
                        onClick: () => setProgress(Math.min(100, progress + 10)),
                        tooltip: "Increase progress",
                    },
                ]}
                headerContent={<div className="text-xs text-gray-500">Last updated: 2 hours ago</div>}
                footerContent={<div className="text-xs text-gray-500">Module duration: 45 minutes</div>}
            >
                <div className="space-y-4">
                    <p>This is an advanced content card with multiple features:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Progress tracking</li>
                        <li>Status indicators</li>
                        <li>Action buttons</li>
                        <li>Custom header and footer content</li>
                        <li>Badges and labels</li>
                    </ul>
                </div>
            </ContentCard>

            {/* Status Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ContentCard title="Success State" subTitle="Task completed successfully" status="success" headerColor="green" size="sm" badges={[{ label: "Complete", variant: "default" }]}>
                    <p className="text-sm">All tasks have been completed successfully!</p>
                </ContentCard>

                <ContentCard title="Error State" subTitle="Something went wrong" status="error" headerColor="red" size="sm" badges={[{ label: "Failed", variant: "destructive" }]}>
                    <p className="text-sm">Please check your configuration and try again.</p>
                </ContentCard>
            </div>

            {/* Color Variations */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["teal", "pink", "violet", "emerald"].map((color) => (
                    <ContentCard key={color} title={`${color.charAt(0).toUpperCase() + color.slice(1)} Theme`} subTitle="Color variation" headerColor={color} size="sm" variant="filled">
                        <p className="text-xs">Content with {color} theme</p>
                    </ContentCard>
                ))}
            </div>
        </div>
    );
};

export default ExampleUsage;
