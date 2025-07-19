"use client";
import { QuestionHeader } from "./question-header";
import { QuestionContent } from "./question-content";
import { QuestionSidebar } from "./question-sidebar";
import { QuestionMetadata } from "./question-metadata";
import { useQuestion } from "@/services/context/question";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";
import { useNavigation } from "@/components/navigation";
import { useEffect } from "react";

const devicePresets = {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
};

export function QuestionDetailPreview({ initialData, viewPort, onDetailsPage }) {
    const { questionId } = useParams();
    const { courseId, examId } = useQueryParams();
    const { questionDetails } = useQuestion();
    const data = onDetailsPage ? { ...questionDetails.data?.data } : initialData;
    const { navigate } = useNavigation();

    // Responsive breakpoint detection
    const isMobile = devicePresets[viewPort] <= devicePresets.mobile;
    const isTablet = devicePresets[viewPort] > devicePresets.mobile && devicePresets[viewPort] <= devicePresets.tablet;
    const isDesktop = devicePresets[viewPort] > devicePresets.tablet;

    const handleBack = () => console.log("Back clicked");
    const handleEdit = () => console.log("Edit clicked");
    const handleDuplicate = () => console.log("Duplicate clicked");
    const handleDelete = () => console.log("Delete clicked");

    useEffect(() => {
        onDetailsPage && questionDetails.fetch?.({ dynamicRoute: `/${courseId}/exam/${examId}/question/${questionId}` });
    }, [questionId, examId, courseId]);

    if (onDetailsPage && questionDetails.isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading question data...</span>
            </div>
        );
    }

    if (onDetailsPage && questionDetails.error) {
        return <ErrorMessage title="Failed to load question" message={questionDetails.error || "Unable to fetch question data"} onRetry={() => questionDetails.fetch({ dynamicRoute: questionId })} />;
    }

    if (onDetailsPage && !questionDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Question data not found</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className={`${onDetailsPage ? "w-full mx-auto" : "max-h-[75vh] overflow-auto"} ${isMobile ? "p-3" : "p-6"}`}>
                {/* Header */}
                <QuestionHeader data={data} isMobile={isMobile} onBack={handleBack} onEdit={handleEdit} onDuplicate={handleDuplicate} onDelete={handleDelete} />

                {/* Main Content Grid */}
                <div className={`${isMobile ? "mt-4 space-y-4" : "mt-6"} ${isDesktop ? "grid grid-cols-3 gap-6" : "space-y-6"}`}>
                    {/* Question Content */}
                    <div className={isDesktop ? "col-span-2" : ""}>
                        <QuestionContent data={data} isMobile={isMobile} />
                    </div>

                    {/* Sidebar */}
                    <div className={isDesktop ? "col-span-1" : ""}>
                        <QuestionSidebar data={data} isMobile={isMobile} />
                    </div>
                </div>

                {/* Metadata Section */}
                {!isMobile && (
                    <div className="mt-8">
                        <QuestionMetadata data={data} isDesktop={isDesktop} />
                    </div>
                )}
            </div>
        </div>
    );
}
