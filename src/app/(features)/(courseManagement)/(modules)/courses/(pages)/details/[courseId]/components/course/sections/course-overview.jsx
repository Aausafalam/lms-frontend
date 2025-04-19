"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PremiumBadge } from "../../ui-custom/badge";
import { PremiumButton } from "../../ui-custom/button";
import { CourseStats } from "./course-stats";
import { CourseInstructorQuick } from "./course-instructor-quick";
import { CourseProgress } from "./course-progress";

export function CourseOverview({ course }) {
    const [animate, setAnimate] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        setAnimate(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="space-y-6">
            {/* Course Progress */}
            <CourseProgress progress={course.userProgress} />

            {/* Instructor Quick Info */}
            <CourseInstructorQuick instructor={course.instructor} />

            {/* Course Stats */}
            <CourseStats stats={course.stats} />
            {/* About This Course */}
            <div className="animate-on-scroll  translate-y-2 transition-all duration-700">
                <h2 className="text-lg dark:text-white font-bold mb-4 flex items-center">
                    <span className="w-1.5 h-6 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] rounded-full mr-3 inline-block"></span>
                    About This Course
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    {course.about.map((paragraph, index) => (
                        <p key={index} className="leading-relaxed text-sm">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* What you'll learn & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="animate-on-scroll  translate-y-4 transition-all duration-700">
                    <h3 className="text-lg dark:text-white font-bold mb-4 flex items-center">
                        <span className="w-1.5 h-6 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] rounded-full mr-3 inline-block"></span>
                        What you'll learn
                    </h3>
                    <ul className="space-y-2">
                        {course.learningOutcomes.map((item, i) => (
                            <li key={i} className="flex">
                                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="animate-on-scroll  translate-y-4 transition-all duration-700 delay-200">
                    <h3 className="text-lg dark:text-white font-bold mb-4 flex items-center">
                        <span className="w-1.5 h-6 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] rounded-full mr-3 inline-block"></span>
                        Requirements
                    </h3>
                    <ul className="space-y-2">
                        {course.requirements.map((item, i) => (
                            <li key={i} className="flex">
                                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Skills You'll Gain */}
            <div className="animate-on-scroll  translate-y-4 transition-all duration-700">
                <h3 className="text-lg dark:text-white font-bold mb-4 flex items-center">
                    <span className="w-1.5 h-6 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] rounded-full mr-3 inline-block"></span>
                    Skills You'll Gain
                </h3>
                <div className="flex flex-wrap gap-3">
                    {course.skills.map((skill, index) => (
                        <PremiumBadge key={index} variant="outline" className="py-2 px-4 text-sm">
                            {skill}
                        </PremiumBadge>
                    ))}
                </div>
            </div>

            {/* Certificate Section */}
            <div className="animate-on-scroll  translate-y-4 transition-all duration-700">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#fff8f0] to-[#fff5f5] dark:from-[#1f1a15] dark:to-[#1f1515] border border-orange-100 dark:border-orange-900/20 p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

                    <div className="relative flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative w-full md:w-1/3 aspect-[4/3] bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <Image src={course.certificateImage || "/placeholder.svg"} alt="Certificate Preview" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end">
                                <div className="p-4 text-white">
                                    <p className="text-sm font-medium">Sample Certificate</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-lg dark:text-white font-bold mb-4 flex items-center">
                                <svg className="h-5 w-5 text-orange-500 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="8" r="7"></circle>
                                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                                </svg>
                                Certificate of Completion
                            </h3>
                            <p className="text-sm mb-6 leading-relaxed text-gray-700 dark:text-gray-300">{course.certificateDescription}</p>
                            <ul className="space-y-3">
                                {course.certificateBenefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <PremiumButton className="mt-6 text-sm">
                                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="8" r="7"></circle>
                                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                                </svg>
                                View Sample Certificate
                            </PremiumButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
