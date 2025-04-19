"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PremiumBadge } from "../ui-custom/badge";
import { PremiumButton } from "../ui-custom/button";

export function CourseRelated({ relatedCourses }) {
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
        <div ref={sectionRef} className="mb-16 dark:text-white">
            <h2 className="text-xl font-semibold mb-8 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-r from-[#ff9500] to-[#ff5f6d] rounded-full mr-3 inline-block"></span>
                Related Courses You May Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedCourses.map((course, i) => (
                    <div
                        key={i}
                        className={`group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-500 ${
                            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <div className="relative h-48">
                            <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute top-3 left-3 z-10">
                                <PremiumBadge variant="primary">{course.badge}</PremiumBadge>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 w-full">
                                    <PremiumButton variant="outline" className="w-full bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
                                        View Course
                                    </PremiumButton>
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                {course.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{course.instructor}</p>
                            <div className="flex items-center mb-3">
                                <div className="flex items-center">
                                    <svg className="h-4 w-4 text-orange-500 fill-orange-500 mr-1" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{course.rating}</span>
                                </div>
                                <span className="text-xs text-gray-400 mx-2">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{course.students} students</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-lg text-gray-800 dark:text-white">${course.price}</span>
                                    <span className="text-xs text-gray-400 line-through ml-1">${course.originalPrice}</span>
                                </div>
                                <button
                                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-500 transition-colors duration-200"
                                    aria-label="Add to wishlist"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
