"use client";

import { useState } from "react";
import {
    Calendar,
    Clock,
    BookOpen,
    Award,
    Users,
    FileText,
    ChevronDown,
    ChevronUp,
    Play,
    CheckCircle,
    Bookmark,
    Star,
    Layers,
    BadgeIcon as Certificate,
    DollarSign,
    Lightbulb,
    Smartphone,
    Tablet,
    Monitor,
    Maximize2,
    X,
    Minimize2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Tabs from "@/components/tab";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Sample data for the course preview
export const sampleCourseData = {
    id: "course-123",
    title: "Complete Web Development Bootcamp",
    shortDescription: "Learn modern web development from scratch to advanced concepts in this comprehensive bootcamp.",
    longDescription:
        "<p>This comprehensive bootcamp takes you from absolute beginner to professional web developer. You'll learn HTML, CSS, JavaScript, React, Node.js, and more through hands-on projects and real-world examples.</p><p>Our step-by-step approach ensures you build a solid foundation before moving on to more advanced topics. By the end of this course, you'll have the skills to build complete web applications and the confidence to apply for web development positions.</p>",
    publishedAt: "2025-05-15",
    instructors: ["1", "2"],
    bannerImage: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
    introVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    estimatedDuration: 120,
    preRequisites: ["Basic computer skills", "No prior programming experience required"],
    learningObjectives: [
        "Build responsive websites with HTML, CSS, and JavaScript",
        "Create dynamic web applications with React",
        "Develop backend APIs with Node.js and Express",
        "Deploy full-stack applications to production",
        "Implement authentication and database integration",
    ],
    price: {
        regularPrice: "199.99",
        salePrice: "149.99",
        discountPercentage: "25",
        saleEndDate: "2025-06-30",
        saleEndsText: "Summer special offer! Enroll now and save 25%",
    },
    certificate: {
        certificateImage: "/placeholder.svg?height=300&width=500",
        certificateDescription:
            "Earn a professional certificate upon completion of the course. This certificate verifies your proficiency in web development fundamentals and can be shared on your resume and professional profiles.",
        certificateBenefits: ["Recognized by industry professionals", "Shareable on LinkedIn and other platforms", "Verifiable through our certificate portal"],
    },
    skills: [
        {
            name: "HTML/CSS",
            level: "Advanced",
        },
        {
            name: "JavaScript",
            level: "Advanced",
        },
        {
            name: "React.js",
            level: "Intermediate",
        },
        {
            name: "Node.js",
            level: "Intermediate",
        },
    ],
    isPublished: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 256,
    completionRate: 82,
    tags: ["1", "2", "3"],
};

// Device presets with their respective widths
const devicePresets = {
    mobile: 400,
    tablet: 768,
    desktop: 1024,
};

export function CoursePreview({ data }) {
    const [showModal, setShowModal] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeTab, setActiveTab] = useState({ id: "mobile", label: "Mobile" });

    // Toggle fullscreen mode in modal
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const courseData = data || sampleCourseData;

    const tabs = [
        {
            id: "mobile",
            label: "Mobile",
            icon: <Smartphone className="h-3.5 w-3.5" />,
            content: (
                <div className="flex flex-col items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between w-full border-b border-gray-200 dark:border-gray-700">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Preview</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.mobile}px</div>
                    </div>
                    <div className="dark:bg-gray-900 border-2 border-t-0 border-white dark:border-gray-900 rounded-b-xl overflow-hidden shadow-sm w-full">
                        <div className="overflow-hidden">
                            <CourseDetail data={courseData} viewportWidth={devicePresets.mobile} />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: "tablet",
            label: "Tablet",
            icon: <Tablet className="h-3.5 w-3.5" />,
            content: (
                <div className="flex flex-col items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-md px-4 py-2 flex items-center justify-between w-full border border-gray-200 dark:border-gray-700">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Tablet Preview</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.tablet}px</div>
                    </div>
                    <div className="mt-4 w-full ml-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Click the button below to open the tablet preview</p>
                        <Button className="mt-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600" onClick={() => setShowModal(true)}>
                            <Tablet className="h-4 w-4 mr-2" />
                            Open Tablet Preview
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            id: "desktop",
            label: "Desktop",
            icon: <Monitor className="h-3.5 w-3.5" />,
            content: (
                <div className="flex flex-col items-center">
                    <div className="bg-white dark:bg-gray-800 rounded-md px-4 py-2 flex items-center justify-between w-full border border-gray-200 dark:border-gray-700">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop Preview</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.desktop}px</div>
                    </div>
                    <div className="mt-4 ml-2 w-full">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Click the button below to open the desktop preview</p>
                        <Button className="mt-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600" onClick={() => setShowModal(true)}>
                            <Monitor className="h-4 w-4 mr-2" />
                            Open Desktop Preview
                        </Button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Tabs defaultTab={activeTab} tabs={tabs} variant={"pills"} onTabChange={(tab) => setActiveTab(tab)} />
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className={`p-0 ${isFullscreen ? "max-w-full w-full h-screen m-0 rounded-none" : "max-w-[90vw] w-full"}`}>
                    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                        <DialogTitle className="flex items-center">
                            {activeTab.id === "tablet" ? (
                                <Tablet className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
                            ) : (
                                <Monitor className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
                            )}
                            {activeTab.id.charAt(0).toUpperCase() + activeTab.id.slice(1)} Preview ({devicePresets[activeTab.id]}px)
                        </DialogTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                            </Button>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    <X className="h-5 w-5" />
                                </Button>
                            </DialogClose>
                        </div>
                    </div>

                    <div
                        className="overflow-auto p-4 flex justify-center"
                        style={{
                            maxHeight: isFullscreen ? "calc(100vh - 60px)" : "80vh",
                        }}
                    >
                        <div
                            className={`bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm ${isFullscreen ? "h-full" : ""}`}
                            style={{ width: `${devicePresets[activeTab.id]}px` }}
                        >
                            <CourseDetail data={courseData} viewportWidth={devicePresets[activeTab.id]} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Course detail component for the preview
function CourseDetail({ data, viewportWidth }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Determine device type based on viewport width
    const isMobile = viewportWidth <= devicePresets.mobile;
    const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet;
    const isDesktop = viewportWidth > devicePresets.tablet;

    // Format price with currency
    const formatPrice = (price) => {
        return `$${Number.parseFloat(price).toFixed(2)}`;
    };

    // Calculate days remaining for sale
    const getDaysRemaining = () => {
        if (!data.price?.saleEndDate) return 0;
        const endDate = new Date(data.price.saleEndDate);
        const today = new Date();
        const diffTime = endDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="w-full max-h-[75vh] bg-gray-100 dark:bg-gray-950 overflow-scroll">
            {/* Hero Banner */}
            <div className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10"></div>
                <div className="absolute inset-0 bg-orange-600/10 dark:bg-orange-400/5 mix-blend-overlay z-10"></div>
                <img
                    src={data.bannerImage || "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg"}
                    alt={data.title}
                    className="w-full h-[200px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {data.isFeatured && (
                            <Badge className="border-none bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 shadow-md text-xs">
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
                    </div>
                    <h1 className={`font-bold text-white mb-2 tracking-tight ${isMobile ? "text-lg" : "text-xl"}`}>{data.title}</h1>
                    <p className={`text-white/90 font-light leading-relaxed ${isMobile ? "text-xs" : "text-sm"}`}>{data.shortDescription}</p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-white/80 text-xs">
                        <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{data.estimatedDuration} hours</span>
                        </div>
                        <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1 text-yellow-400" />
                            <span>
                                {data.rating} ({data.reviewCount} reviews)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 py-4">
                {/* Main Content */}
                <div className={isMobile || isTablet ? "space-y-6" : "grid grid-cols-3 gap-6"}>
                    {/* Main Content */}
                    <div className={isMobile || isTablet ? "space-y-4" : "col-span-2 space-y-6"}>
                        {/* Pricing Card - Shown prominently on mobile */}
                        {(isMobile || isTablet) && (
                            <Card className="bg-gradient-to-br from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-600 shadow-xl border-0 rounded-xl overflow-hidden text-white">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center">
                                            <DollarSign className="h-5 w-5 mr-2" />
                                            <div>
                                                <div className="flex items-center">
                                                    {data.price?.salePrice ? (
                                                        <>
                                                            <span className="text-lg font-bold">{formatPrice(data.price.salePrice)}</span>
                                                            <span className="ml-2 text-sm line-through text-white/70">{formatPrice(data.price.regularPrice)}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-lg font-bold">{formatPrice(data.price?.regularPrice)}</span>
                                                    )}
                                                </div>
                                                {data.price?.salePrice && (
                                                    <p className="text-xs text-white/80">
                                                        {data.price.discountPercentage}% off • {getDaysRemaining()} days left
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Button className="bg-white hover:bg-gray-100 text-orange-600 font-medium shadow-lg h-9 text-xs">Enroll Now</Button>
                                    </div>
                                    {data.price?.saleEndsText && <p className="text-xs bg-white/20 p-2 rounded-md text-center">{data.price.saleEndsText}</p>}
                                </div>
                            </Card>
                        )}

                        {/* Description Card */}
                        <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                            <div className="p-4">
                                <h2 className={`font-semibold mb-3 text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                    <FileText className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    About This Course
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

                        {/* Skills Section */}
                        <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 border-b border-blue-100 dark:border-blue-900/20">
                                <h2 className={`font-semibold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                    <Lightbulb className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    Skills You'll Gain
                                </h2>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-3">
                                    {data.skills?.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-2 rounded-lg border border-gray-100 dark:border-gray-800 group hover:border-blue-200 dark:hover:border-blue-800/40 transition-colors"
                                        >
                                            <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                                                <Lightbulb className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className={`text-gray-800 dark:text-gray-200 font-medium ${isMobile ? "text-xs" : "text-sm"}`}>{skill.name}</p>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400">{skill.level}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Learning Objectives */}
                        <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                            <div className="bg-orange-50 dark:bg-orange-950/20 p-4 border-b border-orange-100 dark:border-orange-900/20">
                                <h2 className={`font-semibold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                    <BookOpen className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    What You'll Learn
                                </h2>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-3">
                                    {data.learningObjectives?.map((objective, index) => (
                                        <li key={index} className="flex items-start group">
                                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2 mt-0.5 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/40 transition-colors">
                                                <CheckCircle className="h-3 w-3 text-orange-600 dark:text-orange-400" />
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
                            <div className="bg-purple-50 dark:bg-purple-950/20 p-4 border-b border-purple-100 dark:border-purple-900/20">
                                <h2 className={`font-semibold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                    <Award className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    Prerequisites
                                </h2>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-3">
                                    {data.preRequisites?.map((prerequisite, index) => (
                                        <li key={index} className="flex items-start group">
                                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-2 mt-0.5 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                                                <CheckCircle className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p
                                                    className={`text-gray-800 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors ${
                                                        isMobile ? "text-xs" : "text-sm"
                                                    }`}
                                                >
                                                    {prerequisite}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>

                        {/* Certificate */}
                        <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                            <div className="bg-green-50 dark:bg-green-950/20 p-4 border-b border-green-100 dark:border-green-900/20">
                                <h2 className={`font-semibold text-gray-900 dark:text-white flex items-center ${isMobile ? "text-base" : "text-lg"}`}>
                                    <Certificate className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                                    Course Certificate
                                </h2>
                            </div>
                            <div className="p-4">
                                {data.certificate?.certificateImage && (
                                    <div className="mb-4 flex justify-center">
                                        <img
                                            src={data.certificate.certificateImage || "/placeholder.svg"}
                                            alt="Certificate Preview"
                                            className="rounded-lg border border-gray-200 dark:border-gray-700 max-h-32 object-contain"
                                        />
                                    </div>
                                )}

                                <p className={`text-gray-700 dark:text-gray-300 mb-4 ${isMobile ? "text-xs" : "text-sm"}`}>{data.certificate?.certificateDescription}</p>

                                <div className="space-y-2">
                                    {data.certificate?.certificateBenefits?.map((benefit, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                                                <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                                            </div>
                                            <p className={`text-gray-800 dark:text-gray-200 ${isMobile ? "text-xs" : "text-sm"}`}>{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar - Only show as sidebar in desktop view */}
                    {isDesktop && (
                        <div className="space-y-6">
                            {/* Pricing Card */}
                            <Card className="bg-gradient-to-br from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-600 shadow-xl border-0 rounded-xl overflow-hidden text-white">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <Layers className="h-4 w-4" />
                                            </div>
                                            <div className="ml-2">
                                                <h3 className="font-bold text-sm">Course Price</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 text-center">
                                        {data.price?.salePrice ? (
                                            <>
                                                <div className="flex items-center justify-center">
                                                    <span className="text-2xl font-bold">{formatPrice(data.price.salePrice)}</span>
                                                    <span className="ml-2 text-sm line-through text-white/70">{formatPrice(data.price.regularPrice)}</span>
                                                </div>
                                                <div className="mt-1 text-xs bg-white/20 py-1 px-2 rounded-full inline-block">
                                                    {data.price.discountPercentage}% off • {getDaysRemaining()} days left
                                                </div>
                                            </>
                                        ) : (
                                            <span className="text-2xl font-bold">{formatPrice(data.price?.regularPrice)}</span>
                                        )}
                                    </div>

                                    {data.price?.saleEndsText && <p className="text-xs bg-white/20 p-2 rounded-md text-center mb-4">{data.price.saleEndsText}</p>}

                                    <Button className="w-full bg-white hover:bg-gray-100 text-orange-600 font-medium h-10 shadow-lg text-sm">Enroll Now</Button>

                                    <Button variant="ghost" className="w-full mt-2 text-white hover:bg-white/10 border border-white/30 h-9 text-xs">
                                        <Bookmark className="mr-1 h-3 w-3" /> Save for Later
                                    </Button>
                                </div>
                            </Card>

                            {/* Course Details Card */}
                            <Card className="rounded-lg shadow-sm overflow-hidden border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800">
                                <div className="p-4">
                                    <h2 className="font-semibold mb-4 text-gray-900 dark:text-white text-sm">Course Details</h2>

                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Duration</h3>
                                                <p className="text-gray-900 dark:text-white font-medium text-xs">{data.estimatedDuration} hours</p>
                                            </div>
                                        </div>

                                        <Separator className="bg-gray-100 dark:bg-gray-800" />

                                        <div className="flex items-start">
                                            <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                <Calendar className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Published</h3>
                                                <p className="text-gray-900 dark:text-white font-medium text-xs">
                                                    {new Date(data.publishedAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        <Separator className="bg-gray-100 dark:bg-gray-800" />

                                        <div className="flex items-start">
                                            <div className="h-6 w-6 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2">
                                                <Users className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Instructors</h3>
                                                <p className="text-gray-900 dark:text-white font-medium text-xs">
                                                    {data.instructors?.length || 0} instructor{data.instructors?.length !== 1 ? "s" : ""}
                                                </p>
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
                                        <h3 className="font-medium text-xs text-white">Course Preview</h3>
                                        <p className="text-[10px] text-white/80">Watch a sample of this course</p>
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
