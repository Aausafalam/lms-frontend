"use client";

import { memo, useEffect } from "react";
import { BookOpen, X } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/formSection";
import { useCourseGetList } from "@/services/hooks/course";

export const CoursesSection = memo(function CoursesSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleCourseChange, addCourse, removeCourse } = handlers;
    const { courseList } = useCourseGetList();
    // Mock course data - replace with actual API call
    const availableCourses = courseList.data?.data?.records || [
        {
            label: "Complete React Development",
            value: "course-react-001",
            description: "Master React from basics to advanced",
        },
        {
            label: "Digital Marketing Fundamentals",
            value: "course-marketing-001",
            description: "Learn digital marketing strategies",
        },
        {
            label: "Python for Beginners",
            value: "course-python-001",
            description: "Start your programming journey with Python",
        },
        { label: "UI/UX Design Masterclass", value: "course-design-001", description: "Design beautiful user interfaces" },
        {
            label: "Data Science with Python",
            value: "course-datascience-001",
            description: "Analyze data and build ML models",
        },
    ];

    console.log(availableCourses, "availableCourses");

    useEffect(() => {
        courseList.fetch({ params: { responseType: "dropdown" } });
    }, []);

    const selectedCourses = formData.courses || [];

    const getSelectedCourseDetails = (courseId) => {
        return availableCourses.find((course) => course.id === courseId);
    };

    return (
        <FormSection
            id="courses"
            title="Included Courses"
            icon={<BookOpen className="h-5 w-5" />}
            description="Select courses that are included in this subscription plan"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
                    <p className="text-sm text-blue-700 dark:text-blue-400">Choose which courses subscribers will have access to with this plan. You can add multiple courses.</p>
                </div>

                <Select
                    label="Add Course"
                    labelIcon={<BookOpen className="h-3.5 w-3.5" />}
                    name="newCourse"
                    placeholder="Select a course to add"
                    value=""
                    onChange={(e) => {
                        if (e.target.value && !selectedCourses.includes(e.target.value)) {
                            addCourse(e.target.value);
                        }
                    }}
                    options={availableCourses.filter((course) => !selectedCourses.includes(course.id))?.map((item) => ({ label: item.name, value: item.id }))}
                    helperText="Select courses to include in this subscription plan"
                />

                {selectedCourses.length > 0 && (
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">Selected Courses ({selectedCourses.length})</h4>
                        <div className="space-y-3">
                            {selectedCourses.map((courseId, index) => {
                                const courseDetails = getSelectedCourseDetails(courseId);
                                return (
                                    <div key={courseId} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-gray-900 dark:text-white">{courseDetails?.name || courseId}</h5>
                                                {courseDetails?.description && <p className="text-sm text-gray-500 dark:text-gray-400">{courseDetails.description}</p>}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeCourse(courseId)}
                                            className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                            aria-label={`Remove course ${courseDetails?.name || courseId}`}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {selectedCourses.length === 0 && (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                        <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-40" />
                        <p>No courses selected yet.</p>
                        <p className="text-sm">Add courses to include in this subscription plan.</p>
                    </div>
                )}
            </div>
        </FormSection>
    );
});
