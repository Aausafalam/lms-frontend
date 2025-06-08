import { Breadcrumb } from "@/components/Breadcrumb";
import { Copy, BookOpen, School, Trash2, Layers } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/lib/hooks/useQuery";

const ModuleDetailsHeader = ({ children, moduleId }) => {
    const { courseId } = useQueryParams();
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <School className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: `/courses/${courseId}`,
            icon: <BookOpen className="h-3.5 w-3.5" />,
        },
        {
            title: moduleId || "Module Details",
            href: `/modules/details/${moduleId}?courseId=${courseId}`,
            icon: <Layers className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex items-center gap-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate Module</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Module</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {children}
            </div>
        </div>
    );
};

export default ModuleDetailsHeader;
