"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Toast Notification Component
 * Displays success, error, and info messages
 */
export function Toast({ message, type = "info", onClose, duration = 5000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Allow fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-600" />,
        error: <AlertCircle className="h-5 w-5 text-red-600" />,
        info: <Info className="h-5 w-5 text-blue-600" />,
    };

    const bgColors = {
        success: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/30",
        error: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/30",
        info: "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/30",
    };

    const textColors = {
        success: "text-green-800 dark:text-green-400",
        error: "text-red-800 dark:text-red-400",
        info: "text-blue-800 dark:text-blue-400",
    };

    return (
        <div className={`fixed top-4 right-4 z-50 max-w-md w-full transition-all duration-300 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
            <div className={`p-4 rounded-lg border shadow-lg ${bgColors[type]}`}>
                <div className="flex items-start">
                    <div className="flex-shrink-0">{icons[type]}</div>
                    <div className="ml-3 flex-1">
                        <p className={`text-sm font-medium ${textColors[type]}`}>{message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setIsVisible(false);
                                setTimeout(onClose, 300);
                            }}
                            className={`${textColors[type]} hover:bg-white/50 dark:hover:bg-gray-800/50`}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Toast Container Component
 * Manages multiple toast notifications
 */
export function ToastContainer({ toasts, removeToast }) {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} duration={toast.duration} />
            ))}
        </div>
    );
}
