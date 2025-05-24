"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export function CourseCallToAction({ course }) {
    const [animate, setAnimate] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#fff8f0] to-[#fff5f5] dark:from-[#1f1a15] dark:to-[#1f1515] border border-orange-100 dark:border-orange-900/20 shadow-xl mb-16 transition-all duration-1000 ${
                animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

            <div className="relative p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-2/3">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] bg-clip-text text-transparent">Ready to Start Your Web Design Journey?</h2>
                        <p className="text-md mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
                            Join over {course.enrolledStudents.toLocaleString()} students who have transformed their careers with this comprehensive course. Enroll today and take the first step
                            towards becoming a professional web designer.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary" className="py-3 px-6 rounded-3xl">
                                Enroll Now for ${course.price}
                            </Button>
                            <Button variant="outline" className="rounded-3xl py-3 px-6">
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                Watch Preview
                            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                        <div className="relative">
                            <div
                                className={`absolute -top-4 -left-4 w-40 h-40 bg-orange-500/20 rounded-full animate-pulse ${
                                    animate ? "opacity-100" : "opacity-0"
                                } transition-opacity duration-1000 delay-300`}
                            ></div>
                            <div
                                className={`absolute -bottom-4 -right-4 w-40 h-40 bg-orange-500/10 rounded-full animate-pulse [animation-delay:1s] ${
                                    animate ? "opacity-100" : "opacity-0"
                                } transition-opacity duration-1000 delay-500`}
                            ></div>
                            <div
                                className={`relative w-40 h-40 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] rounded-full flex items-center justify-center text-white ${
                                    animate ? "scale-100" : "scale-90"
                                } transition-transform duration-1000 delay-700`}
                            >
                                <div className="text-center">
                                    <p className="text-3xl font-bold">{course.discountPercentage}%</p>
                                    <p className="text-sm">DISCOUNT</p>
                                    <p className="text-xs mt-1">Limited Time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
