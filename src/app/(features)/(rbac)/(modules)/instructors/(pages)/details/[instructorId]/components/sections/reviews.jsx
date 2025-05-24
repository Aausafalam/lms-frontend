import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const InstructorReviews = ({ instructor }) => {
    return (
        <Card className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Student Reviews</h3>
                <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">{instructor.rating}</div>
                    <div className="flex flex-col">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={`h-4 w-4 ${star <= Math.floor(instructor.rating) ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-gray-600"}`} />
                            ))}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Based on 248 reviews</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {instructor.reviews?.map((review, index) => (
                    <div key={index} className="border-b dark:border-gray-700 pb-6 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                    <Image src={review.avatar || "/images/avatar-1.jpg"} alt={review.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">{review.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className={`h-4 w-4 ${star <= review.rating ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-gray-600"}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                )) || (
                    <>
                        <div className="border-b dark:border-gray-700 pb-6">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                        <Image src="/images/avatar-1.jpg" alt="Emily Johnson" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Emily Johnson</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">March 15, 2023</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-4 w-4 ${star <= 5 ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-gray-600"}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                This instructor is absolutely amazing! The course content was well-structured and the explanations were crystal clear. I've learned more in this course than in my
                                entire semester at university.
                            </p>
                        </div>

                        <div className="border-b dark:border-gray-700 pb-6">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                        <Image src="/images/avatar-2.jpg" alt="David Kim" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">David Kim</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">February 28, 2023</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-4 w-4 ${star <= 4 ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-gray-600"}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                Very knowledgeable instructor who responds quickly to questions. The course material was comprehensive and up-to-date with current industry standards. Would definitely
                                recommend!
                            </p>
                        </div>

                        <div className="border-b dark:border-gray-700 pb-6 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                        <Image src="/images/avatar-3.jpg" alt="Sarah Martinez" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Sarah Martinez</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">January 12, 2023</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`h-4 w-4 ${star <= 5 ? "fill-amber-500 text-amber-500" : "text-gray-300 dark:text-gray-600"}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                I've taken several online courses, and this instructor stands out for their passion and dedication. The practical exercises were challenging but incredibly rewarding. I
                                feel much more confident in my skills now.
                            </p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default InstructorReviews;
