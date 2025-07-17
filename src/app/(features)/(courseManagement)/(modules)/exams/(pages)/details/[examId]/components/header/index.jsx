"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, Copy, LayoutDashboard, Package, SquarePen, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/components/navigation";
import { useExam } from "@/services/context/exam";
import { toast } from "@/components/ui/toast";
import DeleteExam from "../../../../../components/delete";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Exam Details Header Component
 * @description Header with breadcrumb navigation and action buttons
 */
const ExamDetailsHeader = ({ examId }) => {
    const { navigate } = useNavigation();
    const { examDetails } = useExam();
    const { courseId } = useQueryParams();
    const [modalType, setModalType] = useState("");
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Exams",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Exam Details",
            href: `exams/details/${examId}`,
            icon: <Briefcase className="h-3.5 w-3.5" />,
        },
    ];

    const handleDuplicateExam = () => {
        try {
            if (!examDetails?.data?.data) {
                toast.error("Exam data not available for duplication");
                return;
            }

            const data = { ...examDetails.data.data };
            delete data.id;

            const encodedData = encodeURIComponent(JSON.stringify(data));
            navigate(`/exams/form/add?courseId=${courseId}&initialData=${encodedData}`);
        } catch (error) {
            console.error("Error duplicating exam:", error);
            toast.error("Failed to duplicate exam");
        }
    };

    const handleEditExam = () => {
        navigate(`/exams/form/${examId}?courseId=${courseId}`);
    };

    const handleDeleteExam = () => {
        setModalType("delete");
    };
    const closeModal = () => {
        setModalType("");
    };

    const handleRefresh = () => {
        examDetails.fetch({ dynamicRoute: examId });
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
                                onClick={handleEditExam}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <SquarePen className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Exam</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDuplicateExam}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate Exam</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDeleteExam}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Exam</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DeleteExam modalState={{ delete: modalType === "delete" }} closeModal={closeModal} examId={examId} setRefreshTable={handleRefresh} />
            </div>
        </div>
    );
};

export default ExamDetailsHeader;
