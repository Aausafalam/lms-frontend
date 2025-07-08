"use client";

import { useEffect, useState } from "react";
import { Award, FileText, ChevronDown, ChevronUp, CheckCircle, GraduationCap, Paperclip, Download, Users, Tag, Link2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLessonGetDetails } from "@/services/hooks/lesson";
import { useQueryParams } from "@/lib/hooks/useQuery";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { ContentCard } from "@/components/contentCard";

const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

export function LessonDetailPreview({ initialData, viewportWidth, onDetailsPage }) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { lessonDetails } = useLessonGetDetails();

    const data = lessonDetails?.data || initialData;
    const { moduleId, courseId } = useQueryParams();
    const params = useParams();

    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

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

    useEffect(() => {
        if (moduleId && params?.lessonDetails && courseId) {
            lessonDetails.fetch?.({
                dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${params.lessonDetails}`,
            });
        }
    }, [moduleId, params?.lessonDetails, courseId]);

    const handleBack = () => console.log("Back clicked");
    const handleEdit = () => console.log("Edit clicked");
    const handleDuplicate = () => console.log("Duplicate clicked");
    const handleDelete = () => console.log("Delete clicked");

    const customBadges = [
        {
            key: "category",
            label: "JavaScript",
            variant: "outline",
            className: "bg-blue-50 text-blue-700 border-blue-200",
        },
    ];

    return (
        <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : ""}`}>
            <Header isMobile={isMobile} badges={customBadges} onBack={handleBack} onEdit={handleEdit} onDuplicate={handleDuplicate} onDelete={handleDelete} data={{ ...data, number: "Lesson 1" }} />

            <div className="mx-auto mt-4">
                <div className={isMobile || isTablet ? "space-y-8" : "grid grid-cols-3 gap-8"}>
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6 h-[77vh] overflow-scroll pr-2"}>
                        <ContentCard
                            subTitle="Lesson overview and learning goals"
                            title="About This Lesson"
                            icon={<FileText className="w-[1.1rem] h-[1.1rem] text-orange-600" />}
                            headerColor="white"
                            isMobile={isMobile}
                        >
                            <div
                                className={`prose prose-lg dark:prose-invert max-w-none ${showFullDescription ? "" : "line-clamp-4"} ${isMobile ? "text-sm" : "text-sm"}`}
                                dangerouslySetInnerHTML={{
                                    __html: data?.description || "<p>Lesson description will appear here...</p>",
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

                        {data.instructors?.length > 0 && (
                            <ContentCard title="Meet Your Instructors" Icon={Users} headerColor="blue" subTitle="Expert instructors guiding the lesson">
                                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
                                    {data.instructors.map((instructor, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-2 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group"
                                        >
                                            <Avatar className="h-8 w-8 border-2 border-blue-100 dark:border-blue-900/30 group-hover:border-blue-300 dark:group-hover:border-blue-700/50 transition-colors">
                                                <AvatarImage src={instructor.image || "/placeholder.svg"} alt={instructor.name} />
                                                <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs">
                                                    {instructor.name
                                                        ?.split(" ")
                                                        ?.map((n) => n[0])
                                                        ?.join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="ml-2">
                                                <h3
                                                    className={`font-medium text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors ${
                                                        isMobile ? "text-xs" : "text-sm"
                                                    }`}
                                                >
                                                    {instructor.name}
                                                </h3>
                                                <p className="text-blue-600 dark:text-blue-400 text-[10px]">Instructor</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ContentCard>
                        )}

                        {data.learningOutcomes?.length > 0 && data.learningOutcomes[0] && (
                            <ContentCard title="Learning Outcomes" subTitle="Skills and insights gained" Icon={GraduationCap} headerColor="emerald" isMobile={isMobile}>
                                <div className="grid gap-0">
                                    {data.learningOutcomes
                                        .filter((outcome) => outcome.trim())
                                        .map((outcome, index) => (
                                            <div key={index} className="flex items-start group hover:bg-emerald-50 dark:hover:bg-emerald-950/20 p-3 rounded-lg transition-colors">
                                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                                                    <CheckCircle className="h-4 w-4 text-white" />
                                                </div>
                                                <p className={`text-gray-800 dark:text-gray-200 font-medium leading-relaxed ${isMobile ? "text-sm" : "text-sm"}`}>{outcome}</p>
                                            </div>
                                        ))}
                                </div>
                            </ContentCard>
                        )}

                        {data.prerequisites?.length > 0 && data.prerequisites[0] && (
                            <ContentCard title="Prerequisites" subTitle="Prerequisites and prior knowledge" Icon={Award} headerColor="orange" isMobile={isMobile}>
                                <div className="space-y-0">
                                    {data.prerequisites
                                        .filter((pre) => pre.trim())
                                        .map((prerequisite, index) => (
                                            <div key={index} className="flex items-start group hover:bg-orange-50 dark:hover:bg-orange-950/20 p-3 rounded-lg transition-colors">
                                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                                                    <CheckCircle className="h-4 w-4 text-white" />
                                                </div>
                                                <p className={`text-gray-800 dark:text-gray-200 font-medium leading-relaxed ${isMobile ? "text-sm" : "text-sm"}`}>{prerequisite}</p>
                                            </div>
                                        ))}
                                </div>
                            </ContentCard>
                        )}

                        {data.resources?.length > 0 && data.resources[0]?.title && (
                            <ContentCard title="External Resources" subTitle="Supplementary resources and references" Icon={Link2} headerColor="violet" isMobile={isMobile}>
                                <div className="grid gap-4">
                                    {data.resources
                                        .filter((resource) => resource.title.trim())
                                        .map((resource, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between p-4 rounded-xl border border-violet-100 dark:border-violet-900/30 hover:border-violet-200 dark:hover:border-violet-800/40 transition-all duration-300 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 hover:shadow-lg transform hover:-translate-y-1"
                                            >
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <ExternalLink className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className={`text-gray-800 dark:text-gray-200 font-bold ${isMobile ? "text-sm" : "text-base"}`}>{resource.title}</p>
                                                        {resource.url && (
                                                            <p title={resource.url} className="text-gray-600 dark:text-gray-400 text-sm mt-1 truncate max-w-44 break-words">
                                                                {resource.url}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/30 group-hover:scale-110 transition-transform"
                                                    onClick={() => window.open(resource.url, "_blank")}
                                                >
                                                    <ExternalLink className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        ))}
                                </div>
                            </ContentCard>
                        )}

                        {data.attachments?.length > 0 && data.attachments[0]?.title && (
                            <ContentCard title="Downloadable Resources" subTitle="Files and documents for hands-on practice" Icon={Paperclip} headerColor="teal" isMobile={isMobile}>
                                <div className="grid gap-4">
                                    {data.attachments
                                        .filter((attachment) => attachment.title.trim())
                                        .map((attachment, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between p-4 rounded-xl border border-teal-100 dark:border-teal-900/30 hover:border-teal-200 dark:hover:border-teal-800/40 transition-all duration-300 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 hover:shadow-lg transform hover:-translate-y-1"
                                            >
                                                <div className="flex">
                                                    <div className="h-8 min-w-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <Paperclip className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className={`text-gray-800 dark:text-gray-200 font-bold ${isMobile ? "text-sm" : "text-base"}`}>{attachment.title}</p>
                                                        {attachment.url && <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{attachment.type?.toUpperCase()} Resource</p>}
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/30 group-hover:scale-110 transition-transform"
                                                >
                                                    <Download className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        ))}
                                </div>
                            </ContentCard>
                        )}
                    </div>

                    {isDesktop && (
                        <div className="space-y-6">
                            {((data.introVideo && typeof data.introVideo === "string" && getYoutubeVideoId(data.introVideo)) || data.introVideoPreview) && (
                                <ContentCard
                                    isHideHeader={true}
                                    className="rounded-xl shadow-lg overflow-hidden border-0 bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow"
                                    contentClassName="px-0 py-0"
                                >
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative group">
                                        {data.introVideoPreview ? (
                                            <video controls className="w-full h-full object-cover" src={data.introVideoPreview}>
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${getYoutubeVideoId(data.introVideo)}`}
                                                title="Lesson Preview"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full"
                                            ></iframe>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </ContentCard>
                            )}

                            <ContentCard
                                headerColor="orange"
                                title="Topic Tags"
                                subTitle="Keywords and categories for this lesson"
                                Icon={Tag}
                                className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800"
                            >
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex flex-wrap gap-1">
                                            {data.tags?.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-3 py-1.5 text-[0.8rem] rounded-full capitalize"
                                                >
                                                    {tag || "Tag"}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ContentCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
