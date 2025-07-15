"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, Copy, LayoutDashboard, Package, SquarePen, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/components/navigation";
import { useExamPattern } from "@/services/context/exam-pattern";
import { toast } from "@/components/ui/toast";
import DeleteExamPattern from "../../../../../components/delete";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * ExamPattern Details Header Component
 * @description Header with breadcrumb navigation and action buttons
 */
const ExamPatternDetailsHeader = ({ examPatternId }) => {
    const { navigate } = useNavigation();
    const { examPatternDetails } = useExamPattern();
    const { courseId } = useQueryParams();
    const [modalType, setModalType] = useState("");
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "ExamPatterns",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "ExamPattern Details",
            href: `exam-patterns/details/${examPatternId}`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    const handleDuplicateExamPattern = () => {
        try {
            if (!examPatternDetails?.data?.data) {
                toast.error("Exam Pattern data not available for duplication");
                return;
            }

            const data = { ...examPatternDetails.data.data };
            delete data.id;

            const encodedData = encodeURIComponent(JSON.stringify(data));
            navigate(`/exam-patterns/form/add?courseId=${courseId}&initialData=${encodedData}`);
        } catch (error) {
            console.error("Error duplicating examPattern:", error);
            toast.error("Failed to duplicate examPattern");
        }
    };

    const handleEditExamPattern = () => {
        navigate(`/exam-patterns/form/${examPatternId}?courseId=${courseId}`);
    };

    const handleDeleteExamPattern = () => {
        setModalType("delete");
    };
    const closeModal = () => {
        setModalType("");
    };

    const handleRefresh = () => {
        examPatternDetails.fetch({ dynamicRoute: examPatternId });
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
                                onClick={handleEditExamPattern}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <SquarePen className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit ExamPattern</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDuplicateExamPattern}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate ExamPattern</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDeleteExamPattern}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete ExamPattern</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DeleteExamPattern modalState={{ delete: modalType === "delete" }} closeModal={closeModal} examPatternId={examPatternId} setRefreshTable={handleRefresh} />
            </div>
        </div>
    );
};

export default ExamPatternDetailsHeader;
