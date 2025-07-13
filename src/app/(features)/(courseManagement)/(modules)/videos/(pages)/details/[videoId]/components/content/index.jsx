"use client";

import { VideoDetailPreview } from "../../../../form/components/preview/video-detail-preview";
import { sampleVideoData } from "../../../../form/utils/seeds";

/**
 * Video Details Content Component
 * @description Renders different content based on active tab
 */
const VideoDetailsContent = ({ activeTab }) => {
    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return <VideoDetailPreview initialData={sampleVideoData} onDetailsPage={true} />;
            default:
                return <VideoDetailPreview initialData={sampleVideoData} onDetailsPage={true} />;
        }
    };

    return <div className="video-details-content">{renderContent()}</div>;
};

export default VideoDetailsContent;
