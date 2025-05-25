"use client";

import { useState, useEffect, useRef } from "react";
import {
    Calendar,
    Clock,
    BookOpen,
    Award,
    Tag,
    Users,
    FileText,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Play,
    CheckCircle,
    Bookmark,
    Star,
    Layers,
    Smartphone,
    Tablet,
    Monitor,
    X,
    Maximize2,
    Minimize2,
    Plus,
    ImageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import Tabs from "@/components/tab";
import ModuleFormHeader from "./components/header";
import { useParams } from "next/navigation";
import { SidebarNavigation } from "./components/sidebar";
import { EmptyState } from "@/components/emptyState";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const sampleCourseModule = {
    id: null,
    title: "Advanced React Patterns and Performance Optimization",
    shortDescription: "Master advanced React patterns and learn how to optimize your React applications for maximum performance.",
    longDescription:
        "<p>This comprehensive module dives deep into advanced React patterns that will elevate your development skills. You'll learn how to implement render props, higher-order components, compound components, and the latest React hooks patterns.</p><p>We'll also cover critical performance optimization techniques including memoization, code splitting, lazy loading, and how to effectively use React.memo, useMemo, and useCallback.</p><p>By the end of this module, you'll be able to build complex, performant React applications that scale.</p>",
    publishedAt: "2025-05-20",
    instructors: [
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
    ],
    bannerImage: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
    modulePosition: 1,
    introVideo: "https://example.com/video",
    estimatedDuration: 30,
    difficulty: ["intermediate"],
    categories: [
        { id: "1", name: "Frontend Development" },
        { id: "2", name: "React" },
    ],
    preRequisites: ["Basic React knowledge", "JavaScript fundamentals", "ES6+ features"],
    learningObjectives: [
        "Implement advanced React patterns including render props and compound components",
        "Optimize React applications for performance using memoization techniques",
        "Use React hooks effectively in complex component hierarchies",
        "Apply code splitting and lazy loading techniques for faster initial load times",
        "Debug and fix common performance bottlenecks in React applications",
    ],
    resources: [
        { title: "React Documentation", url: "https://reactjs.org", type: "Documentation" },
        { title: "Performance Optimization Guide", url: "https://example.com/guide", type: "Guide" },
        { title: "Advanced Patterns Workshop", url: "https://example.com/workshop", type: "Workshop" },
        { title: "React DevTools", url: "https://example.com/devtools", type: "Tool" },
    ],
    tags: [
        { id: "1", name: "React" },
        { id: "2", name: "Performance" },
        { id: "3", name: "Advanced" },
        { id: "4", name: "Hooks" },
        { id: "5", name: "Optimization" },
    ],
    isPublished: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 128,
    completionRate: 87,
    
};

// Add viewportWidth prop to control responsive behavior
function CourseModule() {
    const sectionRefs = useRef({});
    const [activeSection, setActiveSection] = useState("overview");

    const [showFullDescription, setShowFullDescription] = useState(false);
    const data = sampleCourseModule;
    // Determine device type based on viewport width
    const isMobile = false;
    const isTablet = false;
    const isDesktop = true;
    const { moduleDetails } = useParams();
    return (
        <div className="">
            <ModuleFormHeader moduleId={moduleDetails} />
            <div className="flex gap-6">
                <SidebarNavigation activeSection={activeSection} scrollToSection={setActiveSection} />
                {activeSection === "overview" && (
                    <div className="max-w-[1100px] ">
                        {/* Hero Banner with Parallax Effect */}
                        <div className="relative overflow-hidden group rounded-lg">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10"></div>
                            <div className="absolute inset-0 bg-orange-600/10 dark:bg-orange-400/5 mix-blend-overlay z-10"></div>
                            <img
                                src={data.bannerImage || "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg"}
                                alt={data.title}
                                className="w-full h-[200px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />

                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden opacity-30">
                                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-orange-400/30 rounded-tl-xl"></div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-orange-400/30 rounded-br-xl"></div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {data.isFeatured && (
                                        <Badge className=" border-none bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 shadow-md text-xs">
                                            Featured
                                        </Badge>
                                    )}
                                    {data.isPublished ? (
                                        <Badge variant="outline" className="bg-green-600/10 text-green-500 dark:text-green-400 border-green-600/30 backdrop-blur-sm text-xs">
                                            Published
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-yellow-700/10 text-yellow-700 dark:text-yellow-700 border-yellow-700/30 backdrop-blur-sm text-xs">
                                            Draft
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className=" border-none  text-white bg-white/10 backdrop-blur-sm text-xs">
                                        Module {data.modulePosition}
                                    </Badge>
                                </div>
                                <h1 className={`font-bold text-white mb-2 tracking-tight ${isMobile ? "text-lg" : "text-xl"}`}>{data.title}</h1>
                                <p className={`text-white/90 font-light leading-relaxed ${isMobile ? "text-xs" : "text-sm"}`}>{data.shortDescription}</p>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-white/80 text-xs">
                                    <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>{data.estimatedDuration} min</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Award className="h-3 w-3 mr-1" />
                                        <span className="capitalize">{data.difficulty.join(", ")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-4">
                            {/* Main Content - Adjust grid based on viewport width */}
                            <div className={isMobile || isTablet ? "space-y-6" : "grid grid-cols-3 gap-6"}>
                                {/* Main Content */}
                                <div className={isMobile || isTablet ? "space-y-4" : "col-span-2 space-y-6"}>
                                    {/* Description Card */}
                                    <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                        <div className="p-4">
                                            <h2 className={`font-semibold mb-3 text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                                <FileText className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                About This Module
                                            </h2>
                                            <div
                                                className={`prose prose-sm dark:prose-invert max-w-none ${showFullDescription ? "" : "line-clamp-3"} ${isMobile ? "text-xs" : "text-sm"}`}
                                                dangerouslySetInnerHTML={{ __html: data.longDescription }}
                                            />
                                            <Button
                                                variant="ghost"
                                                className="mt-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 p-0 h-auto font-medium text-xs"
                                                onClick={() => setShowFullDescription(!showFullDescription)}
                                            >
                                                {showFullDescription ? (
                                                    <span className="flex items-center">
                                                        Show Less <ChevronUp className="ml-1 h-3 w-3" />
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center">
                                                        Read More <ChevronDown className="ml-1 h-3 w-3" />
                                                    </span>
                                                )}
                                            </Button>
                                        </div>
                                    </Card>

                                    {/* Learning Objectives */}
                                    <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 border-b border-orange-100 dark:border-orange-900/20">
                                            <h2 className={`font-semibold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                                <BookOpen className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                Learning Objectives
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs">What you'll learn in this module</p>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-3">
                                                {data.learningObjectives.map((objective, index) => (
                                                    <li key={index} className="flex items-start group">
                                                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2 mt-0.5 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/40 transition-colors">
                                                            <span className="text-xs font-medium text-orange-600 dark:text-orange-400">{index + 1}</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p
                                                                className={`text-gray-800 dark:text-gray-200 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors ${
                                                                    isMobile ? "text-xs" : "text-sm"
                                                                }`}
                                                            >
                                                                {objective}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Card>

                                    {/* Prerequisites */}
                                    <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 border-b border-blue-100 dark:border-blue-900/20">
                                            <h2 className={`font-semibold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                                <Award className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                Prerequisites
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs">Knowledge required before starting</p>
                                        </div>
                                        <div className="p-4">
                                            <ul className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
                                                {data.preRequisites.map((prerequisite, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center p-2 rounded-lg border border-gray-100 dark:border-gray-800 group hover:border-blue-200 dark:hover:border-blue-800/40 transition-colors"
                                                    >
                                                        <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                                                            <CheckCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <span className={`text-gray-800 dark:text-gray-200 ${isMobile ? "text-xs" : "text-sm"}`}>{prerequisite}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Card>

                                    {/* Resources */}
                                    <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 border-b border-purple-100 dark:border-purple-900/20">
                                            <h2 className={`font-semibold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                                <ExternalLink className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                Additional Resources
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs">Helpful materials to enhance your learning</p>
                                        </div>
                                        <div className="p-4">
                                            <div className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
                                                {data.resources.map((resource, index) => (
                                                    <a
                                                        key={index}
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-start p-2 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800/40 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all group"
                                                    >
                                                        <div className="h-6 w-6 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-2 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                                                            <ExternalLink className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between flex-wrap gap-1">
                                                                <h4
                                                                    className={`font-medium text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors ${
                                                                        isMobile ? "text-xs" : "text-sm"
                                                                    }`}
                                                                >
                                                                    {resource.title}
                                                                </h4>
                                                                <Badge variant="outline" className="text-[10px] border-purple-200 dark:border-purple-800/40 text-purple-600 dark:text-purple-400 h-4">
                                                                    {resource.type}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 truncate">{resource.url}</p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Instructors - Compact Version */}
                                    <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                        <div className="bg-green-50 dark:bg-green-950/20 p-3 border-b border-green-100 dark:border-green-900/20">
                                            <h2 className={`font-semibold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                                <Users className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                                                Your Instructors
                                            </h2>
                                        </div>
                                        <div className="p-3">
                                            <div className="flex flex-wrap gap-2">
                                                {data.instructors.map((instructor, index) => {
                                                    // const instructor = sampleModulesTableData?.records[0]?.instructor[index];
                                                    return (
                                                        <div
                                                            key={instructor.id}
                                                            className="flex items-center p-2 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800/40 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all group"
                                                        >
                                                            <Avatar className="h-8 w-8 border-2 border-green-100 dark:border-green-900/30 group-hover:border-green-300 dark:group-hover:border-green-700/50 transition-colors">
                                                                <AvatarImage src={instructor.image || "/placeholder.svg"} alt={instructor.name} />
                                                                <AvatarFallback className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs">
                                                                    {instructor.name
                                                                        .split(" ")
                                                                        .map((n) => n[0])
                                                                        .join("")}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="ml-2">
                                                                <h3
                                                                    className={`font-medium text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors ${
                                                                        isMobile ? "text-xs" : "text-sm"
                                                                    }`}
                                                                >
                                                                    {instructor.name}
                                                                </h3>
                                                                <p className="text-green-600 dark:text-green-400 text-[10px]">{instructor.role}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Sidebar - Only show as sidebar in desktop view */}
                                <div className={`${isMobile || isTablet ? "space-y-6" : "space-y-6"}`}>
                                    {/* Call to Action Card */}
                                    <Card className="bg-gradient-to-br from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-600 shadow-xl border-0 rounded-xl overflow-hidden text-white">
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                        <Layers className="h-4 w-4" />
                                                    </div>
                                                    <div className="ml-2">
                                                        <h3 className="font-bold text-sm">Module {data.modulePosition}</h3>
                                                        <p className="text-white/80 text-[10px]">Start your learning journey</p>
                                                    </div>
                                                </div>
                                                <Badge className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-[10px]">{data.estimatedDuration} min</Badge>
                                            </div>

                                            <div className="space-y-3 mb-4">
                                                <div className="flex items-center">
                                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center mr-2">
                                                        <Star className="h-3 w-3 text-yellow-300" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-2 w-2 ${i < Math.floor(data.rating) ? "text-yellow-300" : "text-white/30"}`}
                                                                    fill={i < Math.floor(data.rating) ? "currentColor" : "none"}
                                                                />
                                                            ))}
                                                            <span className="ml-1 font-medium text-xs">{data.rating}</span>
                                                        </div>
                                                        <p className="text-white/80 text-[10px]">{data.reviewCount} reviews</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center">
                                                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center mr-2">
                                                        <CheckCircle className="h-3 w-3" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="w-full bg-white/20 rounded-full h-1.5">
                                                            <div className="bg-white h-1.5 rounded-full" style={{ width: `${data.completionRate}%` }}></div>
                                                        </div>
                                                        <p className="text-white/80 text-[10px] mt-1">{data.completionRate}% completion rate</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button className="w-full bg-white hover:bg-gray-100 text-orange-600 font-medium h-8 shadow-lg text-xs">Start Learning</Button>

                                            <Button variant="ghost" className="w-full mt-2 text-white hover:bg-white/10 border border-white/30 h-7 text-xs">
                                                <Bookmark className="mr-1 h-3 w-3" /> Save for Later
                                            </Button>
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
                                                        <p className="text-gray-900 dark:text-white font-medium text-xs">{data.estimatedDuration} minutes</p>
                                                    </div>
                                                </div>

                                                <Separator className="bg-gray-100 dark:bg-gray-800" />

                                                <div className="flex items-start">
                                                    <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                        <Award className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400">Difficulty</h3>
                                                        <p className="text-gray-900 dark:text-white font-medium text-xs capitalize">{data.difficulty.join(", ")}</p>
                                                    </div>
                                                </div>

                                                <Separator className="bg-gray-100 dark:bg-gray-800" />

                                                <div className="flex items-start">
                                                    <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                        <Calendar className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400">Published</h3>
                                                        <p className="text-gray-900 dark:text-white font-medium text-xs">
                                                            {new Date(data.publishedAt).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })}
                                                        </p>
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
                                                        {data.categories.map((category) => (
                                                            <Badge
                                                                key={category.id}
                                                                variant="secondary"
                                                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 px-2 py-0 text-[10px] rounded-lg h-5"
                                                            >
                                                                {category.name || "Category"}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <Separator className="bg-gray-100 dark:bg-gray-800" />

                                                <div>
                                                    <h3 className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</h3>
                                                    <div className="flex flex-wrap gap-1">
                                                        {data.tags.map((tag) => (
                                                            <Badge
                                                                key={tag.id}
                                                                variant="outline"
                                                                className="border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-2 py-0 text-[10px] rounded-lg h-5"
                                                            >
                                                                {tag.name || "Tag"}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Video Preview */}
                                    <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative group">
                                            <img
                                                src="/placeholder.svg?height=200&width=400"
                                                alt="Video thumbnail"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                            />
                                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                                <div className="h-10 w-10 rounded-full bg-orange-600/90 dark:bg-orange-500/90 flex items-center justify-center cursor-pointer hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors transform group-hover:scale-110 duration-300">
                                                    <Play className="h-5 w-5 text-white" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                                <h3 className="font-medium text-xs text-white">Introduction Video</h3>
                                                <p className="text-[12px] text-white/80">Watch a preview of this module</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "lessons" && (
                    <EmptyState
                        icon={ImageIcon}
                        title="No Lessons Found"
                        description="You haven't created any lessons yet. Start by creating your first lesson."
                        actionLabel="Create Lesson"
                        actionIcon={Plus}
                        onAction={() => console.log("add lesson call")}
                        className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30"
                    />
                )}

                {activeSection === "assignments" && (
                    <EmptyState
                        icon={BookOpen}
                        title="No Assignment Found"
                        description="You haven't created any lessons yet. Start by creating your first assignment."
                        actionLabel="Create Assignment"
                        actionIcon={Plus}
                        onAction={() => console.log("add lesson call")}
                        className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30"
                    />
                )}
                {activeSection === "quiz" && (
                    <EmptyState
                        icon={BookOpen}
                        title="No Quiz Found"
                        description="You haven't created any lessons yet. Start by creating your first quiz."
                        actionLabel="Create Quiz"
                        actionIcon={Plus}
                        onAction={() => console.log("add lesson call")}
                        className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30"
                    />
                )}
            </div>
        </div>
    );
}

export default CourseModule;
