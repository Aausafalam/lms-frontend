"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, FileText, Download, Clock, Award, CheckCircle, ShoppingCart, Play, Heart, Share2 } from "lucide-react";
import { useDevice, devicePresets } from "./device-context";
import type { CourseType } from "./course-data";

interface CourseSidebarProps {
    course: CourseType;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
    const { previewWidth } = useDevice();

    // Determine device type based on viewport width
    const isDesktop = previewWidth > devicePresets.tablet;

    // Format price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    // Calculate discount percentage
    const discountPercentage = Math.round(((course.price - course.discountPrice) / course.price) * 100);

    // Only show sidebar on desktop
    if (!isDesktop) return null;

    return (
        <div className="w-1/3">
            <div className="sticky top-8">
                <Card className="overflow-hidden bg-white dark:bg-gray-900 shadow-xl border-0 rounded-2xl">
                    <div className="p-6 space-y-6">
                        {/* Price Section */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatPrice(course.discountPrice)}</span>
                                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">{formatPrice(course.price)}</span>
                                </div>
                                <Badge className="bg-orange-600 hover:bg-orange-700 text-white">{discountPercentage}% off</Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium text-orange-600 dark:text-orange-400">Sale ends in</span>{" "}
                                {Math.ceil((course.discountEnds.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-3">
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg border-0 h-12 text-base">
                                <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                            </Button>
                            <Button variant="outline" className="w-full h-12 text-base">
                                <Play className="mr-2 h-5 w-5" /> Preview Course
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                    <Heart className="mr-2 h-4 w-4" /> Wishlist
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </Button>
                            </div>
                        </div>

                        {/* Course Info */}
                        <div className="space-y-4 pt-2">
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">This course includes:</h3>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">{course.duration} hours on-demand video</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">{course.lectureCount} lectures</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">{course.articleCount} articles</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Download className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">{course.downloadableResources} downloadable resources</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-gray-900 dark:text-white font-medium">{course.accessType} access</p>
                                    </div>
                                </div>
                                {course.certificationAvailable && (
                                    <div className="flex items-start">
                                        <Award className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">Certificate of completion</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Money Back Guarantee */}
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30">
                            <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-900 dark:text-white font-medium">30-Day Money-Back Guarantee</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Not satisfied with the course? Get a full refund within 30 days of purchase.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
