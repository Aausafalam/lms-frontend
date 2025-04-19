export function PremiumBadge({ className, children, variant = "primary" }) {
    const baseClasses = `inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${className}`;

    const variantClasses = {
        primary: "bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105",
        secondary: "bg-white/15 backdrop-blur-md dark:text-white border dark:border-white/20 hover:bg-white/20",
        outline: "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
    };

    return <span className={`${baseClasses} ${variantClasses[variant]}`}>{children}</span>;
}
