"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { BookOpen, Briefcase, Copy, LayoutDashboard, Package, SquarePen, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/components/navigation";
import { useVideo } from "@/services/context/video";
import { toast } from "@/components/ui/toast";
import DeleteVideo from "../../../../../components/delete";
import { useState } from "react";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Video Details Header Component
 * @description Header with breadcrumb navigation and action buttons
 */
const VideoDetailsHeader = ({ videoId }) => {
    const { navigate } = useNavigation();
    const { videoDetails } = useVideo();
    const { courseId, moduleId, lessonId } = useQueryParams();
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
            title: "Module Details",
            href: `/modules/details/${moduleId}?course=${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Lesson Details",
            href: `/lessons/details/${lessonId}?course=${courseId}&module=${moduleId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
        {
            title: "Video details",
            href: `/videos/details/${videoId}?course=${courseId}&moduleId=${moduleId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];

    const handleDuplicateVideo = () => {
        try {
            if (!videoDetails?.data?.data) {
                toast.error("Video data not available for duplication");
                return;
            }

            const data = { ...videoDetails.data.data };
            delete data.id;

            const encodedData = encodeURIComponent(JSON.stringify(data));
            navigate(`/videos/form/add?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}&initialData=${encodedData}`);
        } catch (error) {
            console.error("Error duplicating video:", error);
            toast.error("Failed to duplicate video");
        }
    };

    const handleEditVideo = () => {
        navigate(`/videos/form/${videoId}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`);
    };

    const handleDeleteVideo = () => {
        setModalType("delete");
    };
    const closeModal = () => {
        setModalType("");
    };

    const handleRefresh = () => {
        videoDetails.fetch({ dynamicRoute: videoId });
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
                                onClick={handleEditVideo}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <SquarePen className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Video</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDuplicateVideo}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate Video</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={handleDeleteVideo}
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
                            >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Video</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <DeleteVideo modalState={{ delete: modalType === "delete" }} closeModal={closeModal} videoId={videoId} setRefreshTable={handleRefresh} />
            </div>
        </div>
    );
};

export default VideoDetailsHeader;
