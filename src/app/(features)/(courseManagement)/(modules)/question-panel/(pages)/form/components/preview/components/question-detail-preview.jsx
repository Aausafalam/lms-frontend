"use client";
import { QuestionHeader } from "./question-header";
import { QuestionContent } from "./question-content";
import { QuestionSidebar } from "./question-sidebar";
import { QuestionMetadata } from "./question-metadata";

const devicePresets = {
    mobile: 768,
    tablet: 1024,
    desktop: 1200,
};

export function QuestionDetailPreview({ initialData, viewportWidth, onDetailsPage }) {
    const data = initialData || {};

    // Responsive breakpoint detection
    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

    const handleBack = () => console.log("Back clicked");
    const handleEdit = () => console.log("Edit clicked");
    const handleDuplicate = () => console.log("Duplicate clicked");
    const handleDelete = () => console.log("Delete clicked");

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
