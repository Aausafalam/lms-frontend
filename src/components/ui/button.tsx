import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import GlobalUtils from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-md hover:shadow-lg focus:ring-orange-500",
                primary: "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-md hover:shadow-lg focus:ring-orange-500",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                secondary: "bg-white text-[#ff9500] shadow-md hover:shadow-lg focus:ring-gray-200 dark:bg-gray-800 dark:text-orange-400 dark:focus:ring-gray-700",
                outline: "bg-transparent border dark:border-white/30 dark:text-white  backdrop-blur-md hover:bg-white/10 focus:ring-white/20",
                ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-700",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3 text-sm",
                xs: "h-8 rounded-md px-3 text-xs",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={GlobalUtils.cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
