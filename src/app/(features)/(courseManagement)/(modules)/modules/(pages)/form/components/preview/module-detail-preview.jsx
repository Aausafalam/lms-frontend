"use client";

import { useEffect, useState } from "react";
import { Award, FileText, ChevronDown, ChevronUp, CheckCircle, GraduationCap, BadgeIcon, Paperclip, Download, Clock, Users, Tag, Calendar, Folder, Link2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useModule } from "@/services/context/module";
import { useParams } from "next/navigation";
import { ContentCard } from "@/components/contentCard";
import { useInstructorList } from "@/services/hooks/instructor";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { Header } from "@/components/header";
import { useNavigation } from "@/components/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Enhanced Module Detail Preview Component
 * Renders a premium, responsive module preview with modular components
 */

export function ModuleDetailPreview({ initialData, onDetailsPage, viewPort }) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(1024);
    const { moduleId } = useParams();
    const { courseId } = useQueryParams();
    const { moduleDetails } = useModule();
    const { instructorList } = useInstructorList();
    const data = onDetailsPage ? { ...moduleDetails.data?.data, instructorIds: moduleDetails.data?.data?.instructors?.map((item) => item.id) } : initialData;
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

    useEffect(() => {
        onDetailsPage && moduleDetails.fetch?.({ dynamicRoute: `/${courseId}/module/${moduleId}` });
        instructorList.fetch?.({ params: { responseType: "dropdown" } });
    }, [moduleId]);

    if (onDetailsPage && moduleDetails.isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading module data...</span>
            </div>
        );
    }

    if (onDetailsPage && moduleDetails.error) {
        return <ErrorMessage title="Failed to load module" message={moduleDetails.error || "Unable to fetch module data"} onRetry={() => moduleDetails.fetch({ dynamicRoute: moduleId })} />;
    }

    if (onDetailsPage && !moduleDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Module data not found</p>
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
    const handleEdit = () => navigate(`/modules/form/${params.moduleDetails}?courseId=${courseId}`);
    const handleDuplicate = () => console.log("Duplicate clicked");
    const handleDelete = () => console.log("Delete clicked");
    const instructors = instructorList.data?.data?.records?.filter((item) => data.instructorIds?.includes(item.id)) || [];

    return (
        <div className={`w-full ${(isTablet || isMobile) && !viewPort ? "" : onDetailsPage ? "max-h-[86vh] overflow-scroll" : "max-h-[75vh] overflow-scroll"} max-w-[1200px]`}>
            <Header isMobile={isMobile} data={{ ...data, number: "Module 1" }} badges={customBadges} onBack={handleBack} onEdit={handleEdit} onDuplicate={handleDuplicate} onDelete={handleDelete} />
            {/* Hero Section */}
            {/* <HeroSection instructors={instructors} data={data} isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} /> */}

            {/* Main Content */}
            <div className={`mx-auto mt-4 ${isTablet || isMobile ? "px-2" : ""}`}>
                <div className={`${isMobile || isTablet ? "space-y-6 sm:space-y-8" : "grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8"}`}>
                    {/* Main Content Column */}
                    <div className={`${isMobile || isTablet ? "space-y-4 sm:space-y-6" : "xl:col-span-2 space-y-6"}`}>
                        {/* Module Description */}
                        <ContentCard
                            subTitle="A detailed overview of what this module covers"
                            title="About This Module"
                            icon={<FileText className="w-[1.1rem] h-[1.1rem] text-orange-600" />}
                            headerColor="white"
                            isMobile={isMobile}
                        >
                            <div
                                className={`prose prose-lg dark:prose-invert max-w-none ${showFullDescription ? "" : "line-clamp-4"} ${isMobile ? "text-sm" : "text-sm"}`}
                                dangerouslySetInnerHTML={{
                                    __html: data.description || "<p>Module description will appear here...</p>",
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

                        {/* Instructors */}
                        <ContentCard title="Instructors" Icon={Users} headerColor="purple" subTitle="Meet the educators who designed and will guide the module">
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

                        {/* Learning Outcomes */}
                        {data.learningOutcomes?.length > 0 && data.learningOutcomes[0] && (
                            <ContentCard
                                title="What You'll Learn"
                                Icon={GraduationCap}
                                headerColor="purple"
                                subTitle="Key knowledge and skills you'll gain by completing the module"
                                isMobile={isMobile}
                            >
                                <div className="grid gap-0">
                                    {data.learningOutcomes
                                        .filter((outcome) => outcome.trim())
                                        .map((outcome, index) => (
                                            <div key={index} className="flex items-start group hover:bg-purple-50 dark:hover:bg-purple-950/20 p-2 sm:p-3 rounded-lg transition-colors">
                                                <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform mt-0.5">
                                                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                                </div>
                                                <p className={`text-gray-800 dark:text-gray-200 font-medium leading-relaxed ${isMobile ? "text-sm" : "text-sm"}`}>{outcome}</p>
                                            </div>
                                        ))}
                                </div>
                            </ContentCard>
                        )}

                        {/* Prerequisites */}
                        {data.prerequisites?.length > 0 && data.prerequisites[0] && (
                            <ContentCard title="Prerequisites" Icon={Award} headerColor="green" isMobile={isMobile} subTitle="Topics or knowledge you should know before taking this module">
                                <div className="space-y-0">
                                    {data.prerequisites
                                        .filter((prereq) => prereq.trim())
                                        .map((prerequisite, index) => (
                                            <div key={index} className="flex items-start group hover:bg-green-50 dark:hover:bg-green-950/20 p-2 sm:p-3 rounded-lg transition-colors">
                                                <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-2 sm:mr-3 group-hover:scale-110 transition-transform mt-0.5">
                                                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                                </div>
                                                <p className={`text-gray-800 dark:text-gray-200 font-medium leading-relaxed ${isMobile ? "text-sm" : "text-sm"}`}>{prerequisite}</p>
                                            </div>
                                        ))}
                                </div>
                            </ContentCard>
                        )}

                        {/* Attachments */}
                        {data.attachments?.length > 0 && data.attachments[0]?.title && (
                            <ContentCard title="Module Resources" Icon={Paperclip} headerColor="green" isMobile={isMobile} subTitle="Downloadable files and additional module materials">
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

                        {data.resources?.length > 0 && data.resources[0]?.title && (
                            <ContentCard title="External Resources" subTitle="Helpful links and references to supplement your learning" Icon={Link2} headerColor="violet" isMobile={isMobile}>
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
                                                        <p className={`text-gray-800 dark:text-gray-200 font-semibold ${isMobile ? "text-sm" : "text-md"}`}>{resource.title}</p>
                                                        {resource.link && (
                                                            <p title={resource.link} className="text-gray-600 dark:text-gray-400 text-sm mt-1 truncate max-w-44 break-words">
                                                                {resource.link}
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
                    </div>

                    {/* Sidebar - Desktop and Tablet Only */}
                    {(isDesktop || (isTablet && !isMobile)) && (
                        <div className="space-y-4 sm:space-y-6">
                            {/* Video Preview */}
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
                                                title="Module Preview"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full"
                                            ></iframe>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </ContentCard>
                            )}

                            {/* Module Details */}
                            <ContentCard
                                headerColor="gray"
                                title="Module Details"
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

                            {/* Categories */}
                            <ContentCard
                                headerColor="blue"
                                title="Categories"
                                subTitle="Module categories and classification"
                                Icon={Folder}
                                className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800"
                            >
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {(data.categories || data.categoryIds)?.map((category) => (
                                        <Badge
                                            key={typeof category === "string" ? category : category?.name}
                                            variant="outline"
                                            className="border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full capitalize"
                                        >
                                            {typeof category === "string" ? category : category?.name}
                                        </Badge>
                                    ))}
                                </div>
                            </ContentCard>

                            {/* Tags */}
                            <ContentCard
                                headerColor="orange"
                                title="Topic Tags"
                                subTitle="Keywords and tags for this module"
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
                        {/* Video Preview for Mobile */}
                        {((data.introVideo && typeof data.introVideo === "string" && getYoutubeVideoId(data.introVideo)) || data.introVideoPreview) && (
                            <ContentCard isHideHeader={true} className="rounded-xl shadow-lg overflow-hidden border-0 bg-white dark:bg-gray-900" contentClassName="px-0 py-0">
                                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                                    {data.introVideoPreview ? (
                                        <video controls className="w-full h-full object-cover" src={data.introVideoPreview}>
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYoutubeVideoId(data.introVideo)}`}
                                            title="Module Preview"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    )}
                                </div>
                            </ContentCard>
                        )}

                        {/* Module Details for Mobile */}
                        <ContentCard
                            headerColor="gray"
                            title="Module Details"
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
                            <ContentCard
                                headerColor="blue"
                                title="Categories"
                                Icon={Folder}
                                className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {(data.categories || data.categoryIds)?.map((category) => (
                                        <Badge
                                            key={typeof category === "string" ? category : category?.name}
                                            variant="outline"
                                            className="border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 text-xs rounded-full capitalize"
                                        >
                                            {typeof category === "string" ? category : category?.name}
                                        </Badge>
                                    ))}
                                </div>
                            </ContentCard>

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
