import { Briefcase, FileText, LayoutDashboard, Settings, Users } from "lucide-react";
import { Breadcrumb } from ".";

export default function BreadcrumbSample() {
    // Example breadcrumb items with icons
    const breadcrumbItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Projects",
            href: "/dashboard/projects",
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
        {
            title: "Marketing Campaign",
            href: "/dashboard/projects/marketing",
            icon: <FileText className="h-3.5 w-3.5" />,
        },
        {
            title: "Team Members",
            href: "/dashboard/projects/marketing/team",
            icon: <Users className="h-3.5 w-3.5" />,
        },
        {
            title: "Settings",
            href: "/dashboard/projects/marketing/team/settings",
            icon: <Settings className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50 dark:bg-gray-950">
            <div className="mb-8 rounded-xl border bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 shadow-md dark:border-gray-800 dark:shadow-orange-950/5">
                <h1 className="mb-4 text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-orange-500">Breadcrumb Examples</h1>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Default Breadcrumb (with truncation)</h2>
                        <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-4 shadow-sm">
                            <Breadcrumb items={breadcrumbItems} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Full Breadcrumb (no truncation)</h2>
                        <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-4 shadow-sm">
                            <Breadcrumb items={breadcrumbItems} truncate={false} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Custom Separator</h2>
                        <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 p-4 shadow-sm">
                            <Breadcrumb items={breadcrumbItems} separator={<span className="text-orange-500 dark:text-orange-400 font-bold mx-0.5 text-xs opacity-70">/</span>} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Breadcrumb with Orange Theme</h2>
                        <div className="rounded-lg border border-orange-100 dark:border-orange-900/30 bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 p-4 shadow-sm">
                            <Breadcrumb items={breadcrumbItems.slice(0, 3)} className="font-medium" separator={<span className="text-orange-300 dark:text-orange-700">•</span>} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Glassmorphism Style</h2>
                        <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-white/80 to-orange-50/50 dark:from-gray-900/80 dark:to-orange-950/30 p-8 shadow-md relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-gray-100/[0.03] bg-[size:20px_20px]"></div>
                            <div className="absolute h-40 w-40 rounded-full bg-orange-400/10 dark:bg-orange-500/10 blur-3xl -top-10 -right-10"></div>
                            <div className="absolute h-20 w-20 rounded-full bg-orange-300/20 dark:bg-orange-400/20 blur-2xl bottom-10 left-10"></div>
                            <div className="relative">
                                <Breadcrumb items={breadcrumbItems.slice(0, 4)} className="font-medium" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
