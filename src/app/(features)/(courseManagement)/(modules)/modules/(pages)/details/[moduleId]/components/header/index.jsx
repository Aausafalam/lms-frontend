"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, Copy, LayoutDashboard, Package, SquarePen, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/components/navigation";
import { useModule } from "@/services/context/module";
import { toast } from "@/components/ui/toast";
import DeleteModule from "../../../../../components/delete";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Module Details Header Component
 * @description Header with breadcrumb navigation and action buttons
 */
const ModuleDetailsHeader = ({ moduleId }) => {
    const { navigate } = useNavigation();
    const { moduleDetails } = useModule();
    const { courseId } = useQueryParams();
    const [modalType, setModalType] = useState("");
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Module Details",
            href: `modules/details/${moduleId}`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    const handleDuplicateModule = () => {
        try {
            if (!moduleDetails?.data?.data) {
                toast.error("Module data not available for duplication");
                return;
            }

            const data = { ...moduleDetails.data.data };
            delete data.id;

            const encodedData = encodeURIComponent(JSON.stringify(data));
            navigate(`/modules/form/add?courseId=${courseId}&initialData=${encodedData}`);
        } catch (error) {
            console.error("Error duplicating module:", error);
            toast.error("Failed to duplicate module");
        }
    };

    const handleEditModule = () => {
        navigate(`/modules/form/${moduleId}?courseId=${courseId}`);
    };

    const handleDeleteModule = () => {
        setModalType("delete");
    };
    const closeModal = () => {
        setModalType("");
    };

    const handleRefresh = () => {
        moduleDetails.fetch({ dynamicRoute: moduleId });
    };

    return (
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center justify-between mb-4 gap-4 px-4 sm:px-0 ">
            <div className="flex-1 min-w-0">
                <Breadcrumb items={breadcrumbItems} />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleEditModule}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <SquarePen className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Module</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDuplicateModule}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate Module</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDeleteModule}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Module</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DeleteModule modalState={{ delete: modalType === "delete" }} closeModal={closeModal} moduleId={moduleId} setRefreshTable={handleRefresh} />
            </div>
        </div>
    );
};

export default ModuleDetailsHeader;
