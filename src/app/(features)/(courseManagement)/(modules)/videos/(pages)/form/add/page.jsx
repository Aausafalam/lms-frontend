"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import VideoFormBase from "..";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Add Video Page Component
 * @description Page for creating new videos
 */
const AddVideo = () => {
    const { initialData } = useQueryParams();

    let parsedData = {};

    if (initialData) {
        try {
            parsedData = JSON.parse(decodeURIComponent(initialData));
        } catch (error) {
            console.error("Error parsing initial data:", error);
        }
    }

    return (
        <ErrorBoundary>
            <VideoFormBase initialData={parsedData} />
        </ErrorBoundary>
    );
};

export default AddVideo;
