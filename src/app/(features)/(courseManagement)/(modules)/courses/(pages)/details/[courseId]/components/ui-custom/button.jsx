"use client";

export function PremiumButton({ children, variant = "primary", size = "md", onClick, className = "", disabled = false, type = "button" }) {
    const baseClasses =
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses = {
        primary: "bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] text-white shadow-md hover:shadow-lg focus:ring-orange-500",
        secondary: "bg-white text-[#ff9500] shadow-md hover:shadow-lg focus:ring-gray-200 dark:bg-gray-800 dark:text-orange-400 dark:focus:ring-gray-700",
        outline: "bg-transparent border dark:border-white/30 dark:text-white  backdrop-blur-md hover:bg-white/10 focus:ring-white/20",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-700",
    };

    const sizeClasses = {
        sm: "text-sm px-3 py-1.5 rounded-full",
        md: "text-base px-4 py-2 rounded-full",
        lg: "text-lg px-6 py-3 rounded-full",
    };

    return (
        <button type={type} className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
