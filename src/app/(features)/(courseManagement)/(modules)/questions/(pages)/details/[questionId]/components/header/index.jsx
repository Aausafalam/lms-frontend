"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { BookOpen, Briefcase, Copy, LayoutDashboard, Package, SquarePen, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/components/navigation";
import { useQuestion } from "@/services/context/question";
import { toast } from "@/components/ui/toast";
import DeleteQuestion from "../../../../../components/delete";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Question Details Header Component
 * @description Header with breadcrumb navigation and action buttons
 */
const QuestionDetailsHeader = ({ questionId }) => {
    const { navigate } = useNavigation();
    const { questionDetails } = useQuestion();
    const { courseId, examId } = useQueryParams();
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
            title: "Exam Details",
            href: `/exams/details/${examId}?courseId=${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Question details",
            href: `/questions/details/${questionId}?courseId=${courseId}&examId=${examId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];

    const handleDuplicateQuestion = () => {
        try {
            if (!questionDetails?.data?.data) {
                toast.error("Question data not available for duplication");
                return;
            }

            const data = { ...questionDetails.data.data };
            delete data.id;

            const encodedData = encodeURIComponent(JSON.stringify(data));
            navigate(`/questions/form/add?courseId=${courseId}&examId=${examId}&initialData=${encodedData}`);
        } catch (error) {
            console.error("Error duplicating question:", error);
            toast.error("Failed to duplicate question");
        }
    };

    const handleEditQuestion = () => {
        navigate(`/questions/form/${questionId}?courseId=${courseId}&examId=${examId}`);
    };

    const handleDeleteQuestion = () => {
        setModalType("delete");
    };
    const closeModal = () => {
        setModalType("");
    };

    const handleRefresh = () => {
        questionDetails.fetch({ dynamicRoute: questionId });
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
                                onClick={handleEditQuestion}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <SquarePen className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Question</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDuplicateQuestion}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate Question</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDeleteQuestion}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Question</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DeleteQuestion modalState={{ delete: modalType === "delete" }} closeModal={closeModal} questionId={questionId} setRefreshTable={handleRefresh} />
            </div>
        </div>
    );
};

export default QuestionDetailsHeader;
