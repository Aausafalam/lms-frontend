import React from "react";
import { Star, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const InstructorCourses = ({ instructor }) => {
    return (
        <Card className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Courses ({instructor.courses})</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <BookOpen className="h-4 w-4" />
                        <span>Total Students: {instructor.students.toLocaleString()}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {instructor.coursesList?.map((course, index) => (
                        <div key={index} className="flex border rounded-lg overflow-hidden dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                            <div className="w-1/3 relative h-full">
                                <Image src={course.image || "/images/course-1.jpg"} alt={course.title} fill className="object-cover" />
                            </div>
                            <div className="w-2/3 p-4">
                                <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                                <div className="flex items-center text-amber-500 my-1">
                                    <Star className="h-3 w-3 fill-amber-500 mr-1" />
                                    <span className="text-xs">
                                        {course.rating} ({course.reviews} reviews)
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{course.description}</p>
                                <div className="mt-2 flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">${course.price}</span>
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                                        {course.level}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )) || (
                        <>
                            <div className="flex border rounded-lg overflow-hidden dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <div className="w-1/3 relative h-40">
                                    <Image src="/images/course-1.jpg" alt="Advanced Data Science" fill className="object-cover" />
                                </div>
                                <div className="w-2/3 p-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Advanced Data Science</h4>
                                    <div className="flex items-center text-amber-500 my-1">
                                        <Star className="h-3 w-3 fill-amber-500 mr-1" />
                                        <span className="text-xs">4.8 (342 reviews)</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                        Master advanced data science techniques and machine learning algorithms with practical projects.
                                    </p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">$129.99</span>
                                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                                            Advanced
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="flex border rounded-lg overflow-hidden dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <div className="w-1/3 relative h-40">
                                    <Image src="/images/course-2.jpg" alt="Web Development Bootcamp" fill className="object-cover" />
                                </div>
                                <div className="w-2/3 p-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Web Development Bootcamp</h4>
                                    <div className="flex items-center text-amber-500 my-1">
                                        <Star className="h-3 w-3 fill-amber-500 mr-1" />
                                        <span className="text-xs">4.9 (517 reviews)</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Comprehensive course covering frontend and backend web development with modern frameworks.</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">$89.99</span>
                                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                                            Intermediate
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="flex border rounded-lg overflow-hidden dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <div className="w-1/3 relative h-40">
                                    <Image src="/images/course-3.jpg" alt="UX/UI Design Masterclass" fill className="object-cover" />
                                </div>
                                <div className="w-2/3 p-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">UX/UI Design Masterclass</h4>
                                    <div className="flex items-center text-amber-500 my-1">
                                        <Star className="h-3 w-3 fill-amber-500 mr-1" />
                                        <span className="text-xs">4.7 (289 reviews)</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                        Learn to create beautiful, functional interfaces that users love with industry best practices.
                                    </p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">$79.99</span>
                                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                                            All Levels
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="flex border rounded-lg overflow-hidden dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
                                <div className="w-1/3 relative h-40">
                                    <Image src="/images/course-4.jpg" alt="Cybersecurity Fundamentals" fill className="object-cover" />
                                </div>
                                <div className="w-2/3 p-4">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Cybersecurity Fundamentals</h4>
                                    <div className="flex items-center text-amber-500 my-1">
                                        <Star className="h-3 w-3 fill-amber-500 mr-1" />
                                        <span className="text-xs">4.9 (176 reviews)</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">Essential security concepts and practices to protect systems and data from cyber threats.</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">$99.99</span>
                                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
                                            Beginner
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default InstructorCourses;
