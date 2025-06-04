"use client";

import { useEffect, useState } from "react";
import { FileAudio, FileVideo, FileText, ChevronDown, ChevronUp, Tag, Clock, Users, Languages, ExternalLink, Download, Paperclip } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentHeroSection } from "./hero-section";
import { ContentCard } from "./content-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useContentGetDetails } from "@/services/hooks/content";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

export function ContentDetailPreview({ initialData, viewportWidth, onDetailsPage }) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showFullTranscript, setShowFullTranscript] = useState(false);
    const { contentDetails } = useContentGetDetails();
    const data = contentDetails?.data || initialData;
    const params = useParams();
    const { moduleId, courseId, lessonId } = useQueryParams();
    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

    const getContentTypeIcon = () => {
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
            <ContentHeroSection data={data} isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />

            <div className="mx-auto mt-6 px-3">
                <div className={isMobile || isTablet ? "space-y-8" : "space-y-8"}>
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}>
                        <ContentCard subTitle={"content detailed description"} title="About This Content" icon={getContentTypeIcon()} headerColor="white" isMobile={isMobile}>
                            <div
                                className={`prose prose-lg dark:prose-invert max-w-none ${showFullDescription ? "" : "line-clamp-4"} ${isMobile ? "text-sm" : "text-sm"}`}
                                dangerouslySetInnerHTML={{
                                    __html: data.description || "<p>Content description will appear here...</p>",
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

                    {/* {isDesktop && (
                        <div className="space-y-6">
                            {data.url && data.type === "audio" && (
                                <Card className="rounded-xl shadow-lg overflow-hidden border-0 bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow">
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                            <FileAudio className="h-4 w-4 mr-2 text-orange-600 dark:text-orange-400" />
                                            Audio Player
                                        </h3>
                                    </div>
                                    <div className="p-4">
                                        <audio controls className="w-full">
                                            <source src={data.url} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                </Card>
                            )}

                            {data.url && data.type === "video" && (
                                <Card className="rounded-xl shadow-lg overflow-hidden border-0 bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow">
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                            <FileVideo className="h-4 w-4 mr-2 text-orange-600 dark:text-orange-400" />
                                            Video Player
                                        </h3>
                                    </div>
                                    <div className="aspect-video bg-black">
                                        <video controls className="w-full h-full">
                                            <source src={data.url} type="video/mp4" />
                                            Your browser does not support the video element.
                                        </video>
                                    </div>
                                </Card>
                            )}

                            {data.url && data.type === "pdf" && (
                                <Card className="rounded-xl shadow-lg overflow-hidden border-0 bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow">
                                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                            <FileText className="h-4 w-4 mr-2 text-orange-600 dark:text-orange-400" />
                                            PDF Document
                                        </h3>
                                    </div>
                                    <div className="p-4">
                                        <Button className="w-full" onClick={() => window.open(data.url, "_blank")}>
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Open PDF
                                        </Button>
                                    </div>
                                </Card>
                            )}

                            <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                <div className="p-4">
                                    <h2 className={`font-semibold mb-4 text-gray-900 dark:text-white ${isMobile ? "text-base" : "text-lg"}`}>Content Details</h2>

                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400">Duration</h3>
                                                <p className="text-gray-900 dark:text-white font-medium text-xs">{formatDuration(data.duration)}</p>
                                            </div>
                                        </div>

                                        <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>

                                        <div className="flex items-start">
                                            <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                <Languages className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400">Language</h3>
                                                <p className="text-gray-900 dark:text-white font-medium text-xs">
                                                    {data.language === "en"
                                                        ? "English"
                                                        : data.language === "es"
                                                        ? "Spanish"
                                                        : data.language === "fr"
                                                        ? "French"
                                                        : data.language === "de"
                                                        ? "German"
                                                        : data.language === "zh"
                                                        ? "Chinese"
                                                        : data.language === "ja"
                                                        ? "Japanese"
                                                        : data.language === "hi"
                                                        ? "Hindi"
                                                        : data.language || "Unknown"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                <div className="p-4">
                                    <h2 className={`font-semibold mb-4 text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                        <Tag className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                                        Tags
                                    </h2>

                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex flex-wrap gap-1">
                                                {data.tags?.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-2 py-0 text-[10px] rounded-lg h-5"
                                                    >
                                                        {tag || "Tag"}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}
