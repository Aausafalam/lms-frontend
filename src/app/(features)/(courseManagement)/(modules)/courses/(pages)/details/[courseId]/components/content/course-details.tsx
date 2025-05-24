"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, ChevronUp, FileText, List, MessageCircle, Target, Users } from "lucide-react";
import { useDevice, devicePresets } from "./device-context";
import type { CourseType } from "./course-data";
import { CourseSection } from "./course-section";
import { LearningObjective } from "./learning-objective";
import { RequirementItem } from "./requirement-item";
import { SkillCard } from "./skill-card";
import { InstructorCard } from "./instructor-card";
import { TestimonialCard } from "./testimonial-card";

interface CourseDetailsProps {
    course: CourseType;
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

export function CourseDetails({ course }: CourseDetailsProps) {
    const { previewWidth } = useDevice();
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Determine device type based on viewport width
    const isMobile = previewWidth <= devicePresets.mobile;
    const isTablet = previewWidth > devicePresets.mobile && previewWidth <= devicePresets.tablet;
    const isDesktop = previewWidth > devicePresets.tablet;

    return (
        <div className={isDesktop ? "w-2/3" : "w-full"}>
            <div className="space-y-8">
                {/* About This Course */}
                <CourseSection title="About This Course" icon={<FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />} iconBgClass="bg-orange-100 dark:bg-orange-900/30">
                    <div
                        className={`prose prose-sm md:prose-base dark:prose-invert max-w-none ${showFullDescription ? "" : "line-clamp-4"}`}
                        dangerouslySetInnerHTML={{ __html: course.description }}
                    />
                    <Button
                        variant="ghost"
                        className="mt-3 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/30 p-0 h-auto font-medium"
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
                </CourseSection>

                {/* What You'll Learn */}
                <CourseSection
                    title="What You'll Learn"
                    icon={<BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                    iconBgClass="bg-blue-100 dark:bg-blue-900/30"
                    headerBgClass="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20"
                    headerBorderClass="border-blue-100 dark:border-blue-900/20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.learningObjectives.map((objective, index) => (
                            <LearningObjective key={index} objective={objective} compact={isMobile} />
                        ))}
                    </div>
                </CourseSection>

                {/* Requirements */}
                <CourseSection
                    title="Requirements"
                    icon={<List className="h-4 w-4 text-green-600 dark:text-green-400" />}
                    iconBgClass="bg-green-100 dark:bg-green-900/30"
                    headerBgClass="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20"
                    headerBorderClass="border-green-100 dark:border-green-900/20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.requirements.map((requirement, index) => (
                            <RequirementItem key={index} requirement={requirement} compact={isMobile} />
                        ))}
                    </div>
                </CourseSection>

                {/* Skills You'll Gain */}
                <CourseSection
                    title="Skills You'll Gain"
                    icon={<Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                    iconBgClass="bg-purple-100 dark:bg-purple-900/30"
                    headerBgClass="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
                    headerBorderClass="border-purple-100 dark:border-purple-900/20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {course.skills.map((skill, index) => (
                            <SkillCard key={index} skill={skill} compact={isMobile} />
                        ))}
                    </div>
                </CourseSection>

                {/* Instructors */}
                <CourseSection
                    title="Instructors"
                    icon={<Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />}
                    iconBgClass="bg-orange-100 dark:bg-orange-900/30"
                    headerBgClass="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20"
                    headerBorderClass="border-orange-100 dark:border-orange-900/20"
                >
                    <div className=" grid grid-cols-2 gap-4">
                        {course.instructors.map((instructor) => (
                            <InstructorCard key={instructor.id} instructor={instructor} compact={isMobile} />
                        ))}
                    </div>
                </CourseSection>

                {/* Student Testimonials */}
                <CourseSection
                    title="Student Testimonials"
                    icon={<MessageCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />}
                    iconBgClass="bg-teal-100 dark:bg-teal-900/30"
                    headerBgClass="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20"
                    headerBorderClass="border-teal-100 dark:border-teal-900/20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} compact={isMobile} />
                        ))}
                    </div>
                </CourseSection>
            </div>
        </div>
    );
}
