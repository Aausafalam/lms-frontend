"use client";

import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useVideo } from "@/services/context/video";
import { toast } from "@/components/ui/toast";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Delete Video Component
 * @description Handles video deletion with confirmation
 */
const DeleteVideo = ({ modalState, videoId, setRefreshTable, closeModal }) => {
    const { videoDelete } = useVideo();
    const { lessonId: lessonIdByParams } = useParams();
    const { courseId, moduleId, lessonId: lessonIdByQuery } = useQueryParams();

    const lessonId = lessonIdByParams || lessonIdByQuery;
    useEffect(() => {
        if (modalState.delete && videoId) {
            try {
                const deletePayload = {
                    recordId: `/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${videoId}`,
                    onShowDetails: closeModal,
                    deleteAction: videoDelete,
                    toggleRefreshData: () => setRefreshTable(),
                    onSuccess: () => {
                        toast.success("Video deleted successfully");
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to delete video");
                    },
                };

                GlobalUtils.handleDelete(deletePayload);
            } catch (error) {
                console.error("Error deleting video:", error);
                toast.error("An error occurred while deleting the video");
                closeModal();
            }
        }
    }, [modalState.delete, videoId, videoDelete, closeModal, setRefreshTable]);

    return null;
};

export default DeleteVideo;
