"use client";

import { useState } from "react";
import { Award, FileText, ChevronDown, ChevronUp, CheckCircle, GraduationCap, Paperclip, Download, Clock, Users, Bookmark, Tag, Link2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeroSection } from "./hero-section";
import { ModuleContentCard } from "./module-content-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Device presets for responsive design
const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

/**
 * Enhanced Module Detail Preview Component
 * Renders a premium, responsive module preview with modular components
 */

export function ModuleDetailPreview({ data, viewportWidth, onDetailsPage }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Determine device type based on viewport width
    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

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

    const instructor = [
        {
            id: "1",
            name: "Sarah Johnson",
            profileImage: "/placeholder.svg?height=100&width=100",
            role: "Senior React Developer",
            bio: "10+ years of experience building scalable React applications",
        },
        {
            id: "2",
            name: "Michael Chen",
            profileImage: "/placeholder.svg?height=100&width=100",
            role: "Performance Optimization Expert",
            bio: "Author of 'React at Scale' and performance consultant",
        },
    ];

    return (
        <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : "max-h-[75vh]  overflow-scroll"} `}>
            {/* Hero Section */}
            <HeroSection data={data} isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />

            {/* Main Content */}
            <div className="mx-auto mt-6 px-3">
                <div className={isMobile || isTablet ? "space-y-8" : "grid grid-cols-3 gap-8"}>
                    {/* Main Content Column */}
                    <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}>
                        {/* Module Description */}
                        <ModuleContentCard
                            subTitle={"module detailed description"}
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
                        </ModuleContentCard>

                        {/* Learning Outcomes */}
                        {data.learningOutcomes?.length > 0 && data.learningOutcomes[0] && (
                            <ModuleContentCard title="What You'll Learn" Icon={GraduationCap} headerColor="purple" isMobile={isMobile}>
                                <div className="grid gap-0">
                                    {data.learningOutcomes
                                        .filter((outcome) => outcome.trim())
                                        .map((outcome, index) => (
                                            <div key={index} className="flex items-start group hover:bg-purple-50 dark:hover:bg-purple-950/20 p-3 rounded-lg transition-colors">
                                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                                                    <CheckCircle className="h-4 w-4 text-white" />
                                                </div>
                                                <p className={`text-gray-800 dark:text-gray-200 font-medium leading-relaxed ${isMobile ? "text-sm" : "text-sm"}`}>{outcome}</p>
                                            </div>
                                        ))}
                                </div>
                            </ModuleContentCard>
                        )}

                        {/* Prerequisites */}
                        {data.preRequisites?.length > 0 && data.preRequisites[0] && (
                            <ModuleContentCard title="Prerequisites" Icon={Award} headerColor="green" isMobile={isMobile}>
                                <div className="space-y-0">
                                    {data.preRequisites
                                        .filter((pre) => pre.trim())
                                        .map((prerequisite, index) => (
                                            <div key={index} className="flex items-start group hover:bg-green-50 dark:hover:bg-green-950/20 p-3 rounded-lg transition-colors">
                                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3  group-hover:scale-110 transition-transform">
                                                    <CheckCircle className="h-4 w-4 text-white" />
                                                </div>
                                                <p className={`text-gray-800 dark:text-gray-200 font-medium leading-relaxed ${isMobile ? "text-sm" : "text-sm"}`}>{prerequisite}</p>
                                            </div>
                                        ))}
                                </div>
                            </ModuleContentCard>
                        )}

                        {/* Additional Resources */}
                        {data.resources?.length > 0 && data.resources[0]?.title && (
                            <ModuleContentCard title="Additional Resources" Icon={Link2} headerColor="indigo" isMobile={isMobile}>
                                <div className="grid gap-4">
                                    {data.resources
                                        .filter((resource) => resource.title.trim())
                                        .map((resource, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-800/40 transition-all duration-300 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 hover:shadow-lg transform hover:-translate-y-1"
                                            >
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
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
                                                    className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 group-hover:scale-110 transition-transform"
                                                    onClick={() => window.open(resource.url, "_blank")}
                                                >
                                                    <ExternalLink className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        ))}
                                </div>
                            </ModuleContentCard>
                        )}

                        {/* Attachments */}
                        {data.attachments?.length > 0 && data.attachments[0]?.title && (
                            <ModuleContentCard title="Module Resources" Icon={Paperclip} headerColor="green" isMobile={isMobile}>
                                <div className="grid gap-4">
                                    {data.attachments
                                        .filter((attachment) => attachment.title.trim())
                                        .map((attachment, index) => (
                                            <div
                                                key={index}
                                                className="group flex items-center justify-between p-4 rounded-xl border border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/40 transition-all duration-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:shadow-lg transform hover:-translate-y-1"
                                            >
                                                <div className="flex">
                                                    <div className="h-8 min-w-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <Paperclip className="h-4 w-4 text-white" />
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
                            </ModuleContentCard>
                        )}

                        <ModuleContentCard title="Instructors" Icon={Users} headerColor="purple">
                            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
                                {instructor.map((instructor) => (
                                    <div
                                        key={instructor.id}
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
                                            <p className="text-purple-600 dark:text-purple-400 text-[10px]">{instructor.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ModuleContentCard>
                    </div>

                    {/* Sidebar - Desktop Only */}
                    {isDesktop && (
                        <div className="space-y-6">
                            {/* Video Preview */}
                            {((data.introVideo && typeof data.introVideo === "string" && getYoutubeVideoId(data.introVideo)) || data.introVideoPreview) && (
                                <Card className="rounded-xl shadow-lg overflow-hidden border-0 bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow">
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
                                </Card>
                            )}

                            {/* Action Buttons */}
                            <Card className="rounded-xl shadow-lg overflow-hidden border-0 bg-gradient-to-br from-orange-500 to-purple-500 text-white">
                                <div className="p-6 space-y-4">
                                    <div className="text-center">
                                        <h3 className="font-bold text-xl mb-2">Ready to Start?</h3>
                                        <p className="text-white/90 text-sm">Begin this module now</p>
                                    </div>

                                    <Button className="w-full bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                        Start Module
                                    </Button>

                                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 font-semibold">
                                        <Bookmark className="mr-2 h-4 w-4" />
                                        Save for Later
                                    </Button>

                                    <div className="text-center text-white/80 text-xs">
                                        <p>✓ Interactive content</p>
                                        <p>✓ Downloadable resources</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Module Details Card */}
                            <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                <div className="p-4">
                                    <h2 className={`font-semibold mb-4 text-gray-900 dark:text-white ${isMobile ? "text-base" : "text-lg"}`}>Module Details</h2>

                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400">Duration</h3>
                                                <p className="text-gray-900 dark:text-white font-medium text-xs">{data.duration} minutes</p>
                                            </div>
                                        </div>

                                        <Separator className="bg-gray-100 dark:bg-gray-800" />

                                        <div className="flex items-start">
                                            <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                <Award className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400">Module Order</h3>
                                                <p className="text-gray-900 dark:text-white font-medium text-xs">Module {data.moduleOrder}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Categories & Tags */}
                            <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                <div className="p-4">
                                    <h2 className={`font-semibold mb-4 text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                        <Tag className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                                        Categories & Tags
                                    </h2>

                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-2">Categories</h3>
                                            <div className="flex flex-wrap gap-1">
                                                {data.categoryIds?.map((category) => (
                                                    <Badge
                                                        key={category}
                                                        variant="secondary"
                                                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 px-2 py-0 text-[10px] rounded-lg h-5"
                                                    >
                                                        {"Category"}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator className="bg-gray-100 dark:bg-gray-800" />

                                        <div>
                                            <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</h3>
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
                    )}
                </div>
            </div>
        </div>
    );
}
