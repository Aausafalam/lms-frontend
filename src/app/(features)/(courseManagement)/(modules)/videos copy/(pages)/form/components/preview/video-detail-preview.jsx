"use client";

import { useState } from "react";
import { FileAudio, FileVideo, FileText, ChevronDown, ChevronUp, Tag, Clock, Users, Languages, ExternalLink, Download, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoHeroSection } from "./hero-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useVideoGetDetails } from "@/services/hooks/video";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";
import { ContentCard } from "@/components/contentCard";

const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

export function VideoDetailPreview({ initialData, viewportWidth, onDetailsPage }) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showFullTranscript, setShowFullTranscript] = useState(false);
    const { contentDetails } = useVideoGetDetails();
    const data = contentDetails?.data || initialData || {};
    const params = useParams();
    const { moduleId, courseId, lessonId } = useQueryParams();
    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

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

    // useEffect(() => {
    //     moduleId && params?.contentId && courseId && lessonId && contentDetails.fetch?.({ dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${lessonId}/video/${params.contentId}` });
    // }, [moduleId, params?.contentId, courseId, lessonId]);

    return (
        <div className={`w-full ${onDetailsPage ? "max-w-[1025px]" : "max-h-[75vh] overflow-scroll"} `}>
            <VideoHeroSection data={data} isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />

            <div className="mx-auto mt-6 px-3">
                <div className={isMobile || isTablet ? "space-y-8" : "space-y-8"}>
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}>
                        <ContentCard subTitle={"content detailed description"} title="About This Video" icon={getVideoTypeIcon()} headerColor="white" isMobile={isMobile}>
                            <div
                                className={`prose prose-lg dark:prose-invert max-w-none ${showFullDescription ? "" : "line-clamp-4"} ${isMobile ? "text-sm" : "text-sm"}`}
                                dangerouslySetInnerHTML={{
                                    __html: data.description || "<p>Video description will appear here...</p>",
                                }}
                            />
                            <Button
                                variant="ghost"
                                className="mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 p-0 h-auto font-semibold text-sm"
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

                        {/* Attachments */}
                        {data.attachments?.length > 0 && data.attachments[0]?.title && (
                            <ContentCard title="Video Attachments" subTitle={"Helpful video materials to support your learning journey"} Icon={Paperclip} headerColor="green" isMobile={isMobile}>
                                <div className="grid gap-4">
                                    {data.attachments
                                        .filter((attachment) => attachment.title.trim())
                                        .map((attachment, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between p-4 rounded-xl border border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/40 transition-all duration-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:shadow-lg transform hover:-translate-y-1"
                                            >
                                                <div className="flex items-center">
                                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <Paperclip className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className={`text-gray-800 dark:text-gray-200 font-bold ${isMobile ? "text-sm" : "text-base"}`}>{attachment.title}</p>
                                                        {attachment.description && <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{attachment.description}</p>}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 group-hover:scale-110 transition-transform"
                                                >
                                                    <Download className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        ))}
                                </div>
                            </ContentCard>
                        )}

                        <ContentCard title="Instructors" Icon={Users} subTitle={"What you'll learn in this video"} headerColor="purple">
                            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
                                {(data.instructors || data?.instructorIds)?.map((instructor, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center p-2 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800/40 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all group"
                                    >
                                        <Avatar className="h-8 w-8 border-2 border-purple-100 dark:border-purple-900/30 group-hover:border-purple-300 dark:group-hover:border-purple-700/50 transition-colors">
                                            <AvatarImage src={instructor.image || "/placeholder.svg"} alt={instructor.name} />
                                            <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs">
                                                {instructor.name
                                                    ?.split(" ")
                                                    ?.map((n) => n[0])
                                                    ?.join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2">
                                            <h3
                                                className={`font-medium text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors ${
                                                    isMobile ? "text-xs" : "text-sm"
                                                }`}
                                            >
                                                {instructor.name}
                                            </h3>
                                            <p className="text-purple-600 dark:text-purple-400 text-[10px]">Instructor</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ContentCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
