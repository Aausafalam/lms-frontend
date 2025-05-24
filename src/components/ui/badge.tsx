import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import GlobalUtils from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            primary: "bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105",
            secondary: "bg-white/15 backdrop-blur-md dark:text-white border dark:border-white/20 hover:bg-white/20",
            outline: "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={GlobalUtils.cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
