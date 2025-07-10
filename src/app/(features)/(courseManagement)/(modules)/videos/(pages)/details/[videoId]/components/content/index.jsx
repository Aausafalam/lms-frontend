"use client";

import { useParams } from "next/navigation";
import { VideoDetailPreview } from "../../../../form/components/preview/video-detail-preview";
import { sampleVideoData } from "../../../../form/utils/seeds";
import CourseVideos from "@/app/(features)/(courseManagement)/(modules)/videos/page";

/**
 * Video Details Content Component
 * @description Renders different content based on active tab
 */
const VideoDetailsContent = ({ activeTab }) => {
    const { videoId } = useParams();

    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <VideoDetailPreview initialData={sampleVideoData} onDetailsPage={true} />;
            case "video":
                return <CourseVideos />;
            default:
                return <VideoDetailPreview initialData={sampleVideoData} onDetailsPage={true} />;
        }
    };

    return <div className="video-details-content">{renderContent()}</div>;
};

export default VideoDetailsContent;
