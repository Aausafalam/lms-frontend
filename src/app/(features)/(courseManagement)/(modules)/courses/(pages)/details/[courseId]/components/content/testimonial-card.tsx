"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TestimonialType } from "./course-data";

interface TestimonialCardProps {
    testimonial: TestimonialType;
    compact?: boolean;
}

export function TestimonialCard({ testimonial, compact = false }: TestimonialCardProps) {
    return (
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800/40 hover:bg-teal-50/30 dark:hover:bg-teal-900/10 transition-all group shadow-sm hover:shadow-md p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3 border-2 border-teal-100 dark:border-teal-900/30 group-hover:border-teal-200 dark:group-hover:border-teal-800/40 transition-colors">
                        <AvatarImage src={getTestimonialImage(testimonial.id) || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs">
                            {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                    </div>
                </div>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                            fill={i < testimonial.rating ? "currentColor" : "none"}
                        />
                    ))}
                </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{testimonial.comment}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">{testimonial.date.toLocaleDateString()}</p>
        </div>
    );
}

// Helper function to get real testimonial images
function getTestimonialImage(id: string): string {
    const images = {
        "review-1": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        "review-2": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop",
        "review-3": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
        default: "/placeholder.svg?height=50&width=50",
    };

    return images[id as keyof typeof images] || images.default;
}
