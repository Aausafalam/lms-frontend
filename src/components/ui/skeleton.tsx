import GlobalUtils from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={GlobalUtils.cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
