"use client";

import { useEffect, useState } from "react";
import { Award, FileText, ChevronDown, ChevronUp, CheckCircle, GraduationCap, Paperclip, Download, Clock, Users, Tag, Calendar, Folder, Link2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useVideo } from "@/services/context/video";
import { useParams } from "next/navigation";
import { ContentCard } from "@/components/contentCard";
import { useInstructorList } from "@/services/hooks/instructor";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { Header } from "@/components/header";
import { useNavigation } from "@/components/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";
import { VideoHeroSection } from "./hero-section";

/**
 * Enhanced Video Detail Preview Component
 * Renders a premium, responsive video preview with modular components
 */

export function VideoDetailPreview({ initialData, onDetailsPage, viewPort }) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showFullTranscript, setShowFullTranscript] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(1024);
    const { videoId } = useParams();
    const { courseId, moduleId, lessonId } = useQueryParams();
    const { videoDetails } = useVideo();
    const { instructorList } = useInstructorList();
    const data = onDetailsPage ? { ...videoDetails.data?.data, instructorIds: videoDetails.data?.data?.instructors?.map((item) => item.id) } : initialData;
    const { navigate } = useNavigation();
    // Responsive breakpoints
    useEffect(() => {
        const updateViewport = () => {
            setViewportWidth(window.innerWidth);
        };

        updateViewport();
        window.addEventListener("resize", updateViewport);
        return () => window.removeEventListener("resize", updateViewport);
    }, []);

    // Determine device type based on viewport width
    const isMobile = viewPort ? viewPort === "mobile" : viewportWidth <= 768;

    const isTablet = viewPort ? viewPort === "tablet" : viewportWidth > 768 && viewportWidth <= 1024;

    const isDesktop = viewPort ? viewPort === "desktop" : viewportWidth > 1024;

    // Get YouTube video ID for embedding
    const getYoutubeVideoId = (url) => {
        try {
            const parsedUrl = new URL(url);
            if (url.includes("youtube.com")) {
                return parsedUrl.searchParams.get("v");
            } else if (url.includes("youtu.be")) {
                return parsedUrl.pathname.substring(1);
            }
            return null;
        } catch (e) {
            return null;
        }
    };
    const getVideoTypeIcon = () => {
        switch (data.type) {
            case "audio":
                return <FileAudio className="w-[1.1rem] h-[1.1rem] text-orange-600" />;
            case "video":
                return <FileVideo className="w-[1.1rem] h-[1.1rem] text-orange-600" />;
            case "pdf":
                return <FileText className="w-[1.1rem] h-[1.1rem] text-orange-600" />;
            default:
                return <FileText className="w-[1.1rem] h-[1.1rem] text-orange-600" />;
        }
    };
    useEffect(() => {
        onDetailsPage && videoDetails.fetch?.({ dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${videoId}` });
        instructorList.fetch?.({ params: { responseType: "dropdown" } });
    }, [videoId]);

    if (onDetailsPage && videoDetails.isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading video data...</span>
            </div>
        );
    }

    if (onDetailsPage && videoDetails.error) {
        return <ErrorMessage title="Failed to load video" message={videoDetails.error || "Unable to fetch video data"} onRetry={() => videoDetails.fetch({ dynamicRoute: videoId })} />;
    }

    if (onDetailsPage && !videoDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Video data not found</p>
            </div>
        );
    }
    const customBadges = [
        {
            key: "category",
            label: "Science",
            variant: "outline",
            className: "bg-blue-50 text-blue-700 border-blue-200",
        },
    ];
    const handleBack = () => navigate(`/courses/details/${courseId}`);
    const handleEdit = () => navigate(`/videos/form/${params.videoDetails}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`);
    const handleDuplicate = () => console.log("Duplicate clicked");
    const handleDelete = () => console.log("Delete clicked");
    const instructors = instructorList.data?.data?.records?.filter((item) => data.instructorIds?.includes(item.id)) || [];

    return (
        <div className={`w-full ${(isTablet || isMobile) && !viewPort ? "" : onDetailsPage ? "max-h-[86vh] overflow-scroll" : "max-h-[75vh] overflow-scroll"} max-w-[1200px]`}>
            <Header isMobile={isMobile} data={{ ...data, number: "Video 1" }} badges={customBadges} onBack={handleBack} onEdit={handleEdit} onDuplicate={handleDuplicate} onDelete={handleDelete} />
            {/* Hero Section */}
            <VideoHeroSection data={data} isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />

            {/* Main Content */}
            <div className={`mx-auto mt-4 ${isTablet || isMobile ? "px-2" : ""}`}>
                <div className={`${isMobile || isTablet ? "space-y-6 sm:space-y-8" : "grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8"}`}>
                    {/* Main Content Column */}
                    <div className={`${isMobile || isTablet ? "space-y-4 sm:space-y-6" : "xl:col-span-2 space-y-6"}`}>
                        {/* Video Description */}
                        <ContentCard subTitle="A detailed overview of what this video covers" title="About This Video" icon={getVideoTypeIcon()} headerColor="white" isMobile={isMobile}>
                            <div
                                className={`prose prose-lg dark:prose-invert max-w-none ${showFullDescription ? "" : "line-clamp-4"} ${isMobile ? "text-sm" : "text-sm"}`}
                                dangerouslySetInnerHTML={{
                                    __html: data.description || "<p>Video description will appear here...</p>",
                                }}
                            />
                            <Button
                                variant="ghost"
                                className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 p-0 h-auto font-semibold text-sm"
                                onClick={() => setShowFullDescription(!showFullDescription)}
                            >
                                {showFullDescription ? (
                                    <span className="flex items-center">
                                        Show Less <ChevronUp className="ml-2 h-4 w-4" />
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        Read More <ChevronDown className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </ContentCard>

                        {data.transcript && (
                            <ContentCard title="Transcript" Icon={FileText} headerColor="indigo" isMobile={isMobile} subTitle={"video transcription is here "}>
                                <div className={`prose prose-lg dark:prose-invert max-w-none ${showFullTranscript ? "" : "line-clamp-6"} ${isMobile ? "text-sm" : "text-sm"}`}>{data.transcript}</div>
                                <Button
                                    variant="ghost"
                                    className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 p-0 h-auto font-semibold text-sm"
                                    onClick={() => setShowFullTranscript(!showFullTranscript)}
                                >
                                    {showFullTranscript ? (
                                        <span className="flex items-center">
                                            Show Less <ChevronUp className="ml-2 h-4 w-4" />
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            View Full Transcript <ChevronDown className="ml-2 h-4 w-4" />
                                        </span>
                                    )}
                                </Button>
                            </ContentCard>
                        )}

                        {/* Instructors */}
                        <ContentCard title="Instructors" Icon={Users} headerColor="purple" subTitle="Meet the educators who designed and will guide the video">
                            <div className={`grid ${isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-2"} gap-3 sm:gap-4`}>
                                {instructors?.map((instructor) => (
                                    <div
                                        key={instructor.id}
                                        className="flex items-center p-2 sm:p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800/40 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all group"
                                    >
                                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-purple-100 dark:border-purple-900/30 group-hover:border-purple-300 dark:group-hover:border-purple-700/50 transition-colors flex-shrink-0">
                                            <AvatarImage src={instructor.image || "/placeholder.svg"} alt={instructor.name} />
                                            <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs">
                                                {instructor.name
                                                    ?.split(" ")
                                                    ?.map((n) => n[0])
                                                    ?.join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2 sm:ml-3 min-w-0 flex-1">
                                            <h3
                                                className={`font-medium text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors truncate ${
                                                    isMobile ? "text-xs" : "text-sm"
                                                }`}
                                            >
                                                {instructor.name}
                                            </h3>
                                            <p className="text-purple-600 dark:text-purple-400 text-[10px] sm:text-xs truncate">{instructor.designation || instructor.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ContentCard>

                        {/* Attachments */}
                        {data.attachments?.length > 0 && data.attachments[0]?.title && (
                            <ContentCard title="Video Resources" Icon={Paperclip} headerColor="green" isMobile={isMobile} subTitle="Downloadable files and additional video materials">
                                <div className="grid gap-3 sm:gap-4">
                                    {data.attachments
                                        .filter((attachment) => attachment.title.trim())
                                        .map((attachment, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between p-3 sm:p-4 rounded-xl border border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/40 transition-all duration-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:shadow-lg transform hover:-translate-y-1"
                                            >
                                                <div className="flex items-center min-w-0 flex-1">
                                                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
                                                        <Paperclip className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className={`text-gray-800 dark:text-gray-200 font-bold truncate ${isMobile ? "text-sm" : "text-base"}`}>{attachment.title}</p>
                                                        {attachment.description && <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">{attachment.description}</p>}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 group-hover:scale-110 transition-transform flex-shrink-0 ml-2"
                                                >
                                                    <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                                                </Button>
                                            </div>
                                        ))}
                                </div>
                            </ContentCard>
                        )}
                    </div>

                    {/* Sidebar - Desktop and Tablet Only */}
                    {(isDesktop || (isTablet && !isMobile)) && (
                        <div className="space-y-4 sm:space-y-6">
                            {/* Video Details */}
                            <ContentCard
                                headerColor="gray"
                                title="Video Details"
                                subTitle="Duration, Difficulty and Published Date"
                                Icon={Clock}
                                className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800"
                            >
                                <div className="space-y-3">
                                    {/* Duration */}
                                    <div className="flex items-start">
                                        <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2 flex-shrink-0">
                                            <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h3>
                                            <p className="text-gray-900 dark:text-white font-medium text-sm">{data.duration} hours</p>
                                        </div>
                                    </div>

                                    <Separator className="bg-gray-100 dark:bg-gray-800" />

                                    {/* Published */}
                                    <div className="flex items-start">
                                        <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2 flex-shrink-0">
                                            <Calendar className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Published</h3>
                                            <p className="text-gray-900 dark:text-white font-medium text-sm">
                                                {new Date(data.publishedAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ContentCard>

                            {/* Tags */}
                            <ContentCard
                                headerColor="orange"
                                title="Topic Tags"
                                subTitle="Keywords and tags for this video"
                                Icon={Tag}
                                className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800"
                            >
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {data.tags?.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full capitalize"
                                        >
                                            {tag || "Tag"}
                                        </Badge>
                                    ))}
                                </div>
                            </ContentCard>
                        </div>
                    )}
                </div>

                {/* Mobile: Show sidebar content at bottom */}
                {isMobile && (
                    <div className="mt-6 space-y-4">
                        {/* Video Details for Mobile */}
                        <ContentCard
                            headerColor="gray"
                            title="Video Details"
                            subTitle="Duration, Difficulty and Published Date"
                            Icon={Clock}
                            className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800"
                        >
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400 mr-2" />
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{data.duration} hours</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400 mr-2" />
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Published</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                        {new Date(data.publishedAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </ContentCard>

                        {/* Categories and Tags for Mobile */}
                        <div className="grid grid-cols-1 gap-4">
                            <ContentCard headerColor="orange" title="Tags" Icon={Tag} className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                <div className="flex flex-wrap gap-2">
                                    {data.tags?.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="outline"
                                            className="border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-3 py-1.5 text-xs rounded-full capitalize"
                                        >
                                            {tag || "Tag"}
                                        </Badge>
                                    ))}
                                </div>
                            </ContentCard>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
