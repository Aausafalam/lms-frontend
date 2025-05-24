"use client";

import { useState } from "react";
import { Calendar, Clock, BookOpen, Award, Tag, Users, FileText, ExternalLink, ChevronDown, ChevronUp, Play, CheckCircle, ArrowRight, Bookmark, Star, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Sample data
const courseModule = {
    id: null,
    title: "Advanced React Patterns and Performance Optimization",
    shortDescription: "Master advanced React patterns and learn how to optimize your React applications for maximum performance.",
    longDescription:
        "<p>This comprehensive module dives deep into advanced React patterns that will elevate your development skills. You'll learn how to implement render props, higher-order components, compound components, and the latest React hooks patterns.</p><p>We'll also cover critical performance optimization techniques including memoization, code splitting, lazy loading, and how to effectively use React.memo, useMemo, and useCallback.</p><p>By the end of this module, you'll be able to build complex, performant React applications that scale.</p>",
    publishedAt: new Date(),
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
    bannerImage: "/placeholder.svg?height=400&width=800",
    modulePosition: 1,
    introVideo: "https://example.com/video",
    estimatedDuration: 30,
    difficulty: ["intermediate"],
    categories: [
        { id: "1", name: "Frontend Development" },
        { id: "2", name: "React" },
    ],
    prerequisites: ["Basic React knowledge", "JavaScript fundamentals", "ES6+ features"],
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

export default function CourseModulePage() {
    return (
        <div>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12">
                <CourseModule data={courseModule} />
            </div>
        </div>
    );
}

function CourseModule({ data }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Banner with Parallax Effect */}
            <div className="relative rounded-xl overflow-hidden mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10"></div>
                <div className="absolute inset-0 bg-orange-600/10 dark:bg-orange-400/5 mix-blend-overlay z-10"></div>
                <img
                    src={data.bannerImage || "/placeholder.svg?height=400&width=1200"}
                    alt={data.title}
                    className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden opacity-30">
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-orange-400/30 rounded-tl-xl"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-orange-400/30 rounded-br-xl"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {data.isFeatured && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 shadow-md">
                                Featured
                            </Badge>
                        )}
                        {data.isPublished ? (
                            <Badge variant="outline" className="bg-green-600/10 text-green-700 dark:text-green-400 border-green-600/30 backdrop-blur-sm">
                                Published
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="bg-yellow-600/10 text-yellow-700 dark:text-yellow-400 border-yellow-600/30 backdrop-blur-sm">
                                Draft
                            </Badge>
                        )}
                        <Badge variant="outline" className="bg-white/10 backdrop-blur-sm">
                            Module {data.modulePosition}
                        </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 tracking-tight">{data.title}</h1>
                    <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-3xl font-light leading-relaxed">{data.shortDescription}</p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-white/80 text-sm">
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5" />
                            <span>{data.estimatedDuration} minutes</span>
                        </div>
                        <div className="flex items-center">
                            <Award className="h-4 w-4 mr-1.5" />
                            <span className="capitalize">{data.difficulty.join(", ")}</span>
                        </div>
                        <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1.5 text-yellow-400" />
                            <span>
                                {data.rating} ({data.reviewCount} reviews)
                            </span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1.5 text-green-400" />
                            <span>{data.completionRate}% completion rate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-50 md:hidden">
                <Button size="lg" className="rounded-full h-14 w-14 shadow-lg bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
                    <Play className="h-6 w-6" />
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description Card */}
                    <Card className="overflow-hidden bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl">
                        <div className="p-6 md:p-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
                                About This Module
                            </h2>
                            <div className={`prose dark:prose-invert max-w-none ${showFullDescription ? "" : "line-clamp-4"}`} dangerouslySetInnerHTML={{ __html: data.longDescription }} />
                            <Button
                                variant="ghost"
                                className="mt-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 p-0 h-auto font-medium"
                                onClick={() => setShowFullDescription(!showFullDescription)}
                            >
                                {showFullDescription ? (
                                    <span className="flex items-center">
                                        Show Less <ChevronUp className="ml-1 h-4 w-4" />
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        Read More <ChevronDown className="ml-1 h-4 w-4" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </Card>

                    {/* Learning Objectives */}
                    <Card className="bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden">
                        <div className="bg-orange-50 dark:bg-orange-950/20 p-6 md:p-8 border-b border-orange-100 dark:border-orange-900/20">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                <BookOpen className="mr-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
                                Learning Objectives
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">What you'll learn in this module</p>
                        </div>
                        <div className="p-6 md:p-8">
                            <ul className="space-y-4">
                                {data.learningObjectives.map((objective, index) => (
                                    <li key={index} className="flex items-start group">
                                        <div className="flex-shrink-0 h-7 w-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/40 transition-colors">
                                            <span className="text-xs font-medium text-orange-600 dark:text-orange-400">{index + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-800 dark:text-gray-200 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">{objective}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>

                    {/* Prerequisites */}
                    <Card className="bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden">
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-6 md:p-8 border-b border-blue-100 dark:border-blue-900/20">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                <Award className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                                Prerequisites
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Knowledge required before starting</p>
                        </div>
                        <div className="p-6 md:p-8">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.prerequisites.map((prerequisite, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 group hover:border-blue-200 dark:hover:border-blue-800/40 transition-colors"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                                            <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <span className="text-gray-800 dark:text-gray-200">{prerequisite}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>

                    {/* Resources */}
                    <Card className="bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden">
                        <div className="bg-purple-50 dark:bg-purple-950/20 p-6 md:p-8 border-b border-purple-100 dark:border-purple-900/20">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                <ExternalLink className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                                Additional Resources
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Helpful materials to enhance your learning</p>
                        </div>
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.resources.map((resource, index) => (
                                    <a
                                        key={index}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800/40 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all group"
                                    >
                                        <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                                            <ExternalLink className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                                                    {resource.title}
                                                </h4>
                                                <Badge variant="outline" className="ml-2 text-xs border-purple-200 dark:border-purple-800/40 text-purple-600 dark:text-purple-400">
                                                    {resource.type}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{resource.url}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Instructors */}
                    <Card className="bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden">
                        <div className="bg-green-50 dark:bg-green-950/20 p-6 md:p-8 border-b border-green-100 dark:border-green-900/20">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                <Users className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                                Your Instructors
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Expert guides for your learning journey</p>
                        </div>
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 gap-6">
                                {data.instructors.map((instructor) => (
                                    <div
                                        key={instructor.id}
                                        className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800/40 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all group"
                                    >
                                        <Avatar className="h-20 w-20 border-2 border-green-100 dark:border-green-900/30 group-hover:border-green-300 dark:group-hover:border-green-700/50 transition-colors">
                                            <AvatarImage src={instructor.profileImage || "/placeholder.svg"} alt={instructor.name} />
                                            <AvatarFallback className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                                {instructor.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="font-medium text-lg text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                                                {instructor.name}
                                            </h3>
                                            <p className="text-green-600 dark:text-green-400 font-medium text-sm">{instructor.role}</p>
                                            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{instructor.bio}</p>
                                            <Button
                                                variant="outline"
                                                className="mt-3 border-green-200 dark:border-green-800/40 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300"
                                            >
                                                View Profile
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-6 self-start">
                    {/* Call to Action Card */}
                    <Card className="bg-gradient-to-br from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-600 shadow-xl border-0 rounded-xl overflow-hidden text-white">
                        <div className="p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <Layers className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold text-xl">Module {data.modulePosition}</h3>
                                        <p className="text-white/80 text-sm">Start your learning journey</p>
                                    </div>
                                </div>
                                <Badge className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">{data.estimatedDuration} min</Badge>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                                        <Star className="h-5 w-5 text-yellow-300" />
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < Math.floor(data.rating) ? "text-yellow-300" : "text-white/30"}`}
                                                    fill={i < Math.floor(data.rating) ? "currentColor" : "none"}
                                                />
                                            ))}
                                            <span className="ml-2 font-medium">{data.rating}</span>
                                        </div>
                                        <p className="text-white/80 text-sm">{data.reviewCount} reviews</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                                        <CheckCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="w-full bg-white/20 rounded-full h-2.5">
                                            <div className="bg-white h-2.5 rounded-full" style={{ width: `${data.completionRate}%` }}></div>
                                        </div>
                                        <p className="text-white/80 text-sm mt-1">{data.completionRate}% completion rate</p>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full bg-white hover:bg-gray-100 text-orange-600 font-medium text-lg h-12 shadow-lg">Start Learning</Button>

                            <Button variant="ghost" className="w-full mt-3 text-white hover:bg-white/10 border border-white/30">
                                <Bookmark className="mr-2 h-5 w-5" /> Save for Later
                            </Button>
                        </div>
                    </Card>

                    {/* Module Details Card */}
                    <Card className="bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Module Details</h2>

                            <div className="space-y-5">
                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
                                        <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h3>
                                        <p className="text-gray-900 dark:text-white font-medium">{data.estimatedDuration} minutes</p>
                                    </div>
                                </div>

                                <Separator className="bg-gray-100 dark:bg-gray-800" />

                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
                                        <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Difficulty</h3>
                                        <p className="text-gray-900 dark:text-white font-medium capitalize">{data.difficulty.join(", ")}</p>
                                    </div>
                                </div>

                                <Separator className="bg-gray-100 dark:bg-gray-800" />

                                <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
                                        <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Published</h3>
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            {data.publishedAt.toLocaleDateString("en-US", {
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
                    <Card className="bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
                                <Tag className="mr-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
                                Categories & Tags
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Categories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {data.categories.map((category) => (
                                            <Badge
                                                key={category.id}
                                                variant="secondary"
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-lg"
                                            >
                                                {category.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="bg-gray-100 dark:bg-gray-800" />

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map((tag) => (
                                            <Badge
                                                key={tag.id}
                                                variant="outline"
                                                className="border-orange-200 dark:border-orange-800/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-3 py-1 rounded-lg"
                                            >
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Video Preview */}
                    <Card className="bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative group">
                            <img
                                src="/placeholder.svg?height=200&width=400"
                                alt="Video thumbnail"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <div className="h-16 w-16 rounded-full bg-orange-600/90 dark:bg-orange-500/90 flex items-center justify-center cursor-pointer hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors transform group-hover:scale-110 duration-300">
                                    <Play className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="font-medium text-white">Introduction Video</h3>
                                <p className="text-sm text-white/80">Watch a preview of this module</p>
                            </div>
                        </div>
                    </Card>

                    {/* Next Module Preview */}
                    <Card className="bg-white dark:bg-gray-900 shadow-md border-0 rounded-xl overflow-hidden">
                        <div className="p-6">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Continue Learning</h3>
                            <div className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-800/40 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all group cursor-pointer">
                                <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-800/40 transition-colors">
                                    <ArrowRight className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Next Module</p>
                                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">React State Management</h4>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
