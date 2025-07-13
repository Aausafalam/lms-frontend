"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { BookOpen, Briefcase, Copy, LayoutDashboard, Package, SquarePen, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/components/navigation";
import { useLesson } from "@/services/context/lesson";
import { toast } from "@/components/ui/toast";
import DeleteLesson from "../../../../../components/delete";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Lesson Details Header Component
 * @description Header with breadcrumb navigation and action buttons
 */
const LessonDetailsHeader = ({ lessonId }) => {
    const { navigate } = useNavigation();
    const { lessonDetails } = useLesson();
    const { courseId, moduleId } = useQueryParams();
    const [modalType, setModalType] = useState("");
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Course Details",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Module Details",
            href: `/modules/details/${moduleId}?courseId=${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Lesson details",
            href: `/lessons/details/${lessonId}?courseId=${courseId}&moduleId=${moduleId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];

    const handleDuplicateLesson = () => {
        try {
            if (!lessonDetails?.data?.data) {
                toast.error("Lesson data not available for duplication");
                return;
            }

            const data = { ...lessonDetails.data.data };
            delete data.id;

            const encodedData = encodeURIComponent(JSON.stringify(data));
            navigate(`/lessons/form/add?courseId=${courseId}&moduleId=${moduleId}&initialData=${encodedData}`);
        } catch (error) {
            console.error("Error duplicating lesson:", error);
            toast.error("Failed to duplicate lesson");
        }
    };

    const handleEditLesson = () => {
        navigate(`/lessons/form/${lessonId}?courseId=${courseId}&moduleId=${moduleId}`);
    };

    const handleDeleteLesson = () => {
        setModalType("delete");
    };
    const closeModal = () => {
        setModalType("");
    };

    const handleRefresh = () => {
        lessonDetails.fetch({ dynamicRoute: lessonId });
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
                                onClick={handleEditLesson}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <SquarePen className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Lesson</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDuplicateLesson}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate Lesson</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDeleteLesson}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Lesson</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DeleteLesson modalState={{ delete: modalType === "delete" }} closeModal={closeModal} lessonId={lessonId} setRefreshTable={handleRefresh} />
            </div>
        </div>
    );
};

export default LessonDetailsHeader;
