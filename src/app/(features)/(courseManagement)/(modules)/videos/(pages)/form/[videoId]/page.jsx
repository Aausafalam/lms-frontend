"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import VideoFormBase from "..";
import { useVideo } from "@/services/context/video";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Edit Video Page Component
 * @description Page for editing existing videos
 */
const EditVideo = () => {
    const { videoId } = useParams();
    const { videoDetails } = useVideo();
    const { courseId, moduleId, lessonId } = useQueryParams();

    useEffect(() => {
        if (videoId && videoDetails.fetch) {
            videoDetails.fetch({ dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${videoId}` });
        }
    }, [videoId]);

    if (videoDetails.isLoading) {
        return (
            <div className="flex  items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading video data...</span>
            </div>
        );
    }

    if (videoDetails.error) {
        return <ErrorMessage title="Failed to load video" message={videoDetails.error || "Unable to fetch video data"} onRetry={() => videoDetails.fetch({ dynamicRoute: videoId })} />;
    }

    if (!videoDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Video data not found</p>
            </div>
        );
    }

    return <VideoFormBase initialData={videoDetails.data.data} videoId={videoId} />;
};

export default EditVideo;
