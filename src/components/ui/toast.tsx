"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Toast Context
const ToastContext = createContext({});

let toastId = 0;

/**
 * Toast Provider Component
 * Wrap your app with this provider to enable toast notifications
 */
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = "info", duration = 5000) => {
        const id = ++toastId;
        const toast = { id, message, type, duration };

        setToasts((prev) => [...prev, toast]);

        // Auto remove after duration
        setTimeout(() => {
            removeToast(id);
        }, duration);

        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const value = {
        toasts,
        addToast,
        removeToast,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

/**
 * Hook to use toast notifications
 */
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

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
        <div className={`transition-all duration-300 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
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
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md w-full">
            {toasts.map((toast) => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} duration={toast.duration} />
            ))}
        </div>
    );
}

// Global toast instance
let globalToastContext = null;

/**
 * Global toast object - use this for toast.error(), toast.success(), etc.
 */
export const toast = {
    success: (message, duration = 5000) => {
        if (globalToastContext) {
            return globalToastContext.addToast(message, "success", duration);
        }
        console.warn("Toast not initialized. Make sure to wrap your app with ToastProvider");
    },

    error: (message, duration = 5000) => {
        if (globalToastContext) {
            return globalToastContext.addToast(message, "error", duration);
        }
        console.warn("Toast not initialized. Make sure to wrap your app with ToastProvider");
    },

    info: (message, duration = 5000) => {
        if (globalToastContext) {
            return globalToastContext.addToast(message, "info", duration);
        }
        console.warn("Toast not initialized. Make sure to wrap your app with ToastProvider");
    },

    // Custom toast with any type
    custom: (message, type = "info", duration = 5000) => {
        if (globalToastContext) {
            return globalToastContext.addToast(message, type, duration);
        }
        console.warn("Toast not initialized. Make sure to wrap your app with ToastProvider");
    },
};

/**
 * Initialize global toast context
 * This should be called from within a component that has access to ToastContext
 */
export function initializeGlobalToast() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = useContext(ToastContext);
    globalToastContext = context;
    return context;
}

/**
 * Component to initialize global toast - place this in your app root
 */
export function ToastInitializer() {
    initializeGlobalToast();
    return null;
}
