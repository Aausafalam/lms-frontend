"use client";

import React from "react";

import { useState } from "react";
import { Edit3, Clock, User, ChevronDown, ChevronUp, Play, FileText, FileQuestion, BookOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { instructors } from "../../data/initial-data";

export default function CurriculumPreview({ modules, onBackToEditor }) {
    const [expandedModules, setExpandedModules] = useState(modules.reduce((acc, module) => ({ ...acc, [module.id]: true }), {}));

    const toggleModule = (moduleId) => {
        setExpandedModules((prev) => ({
            ...prev,
            [moduleId]: !prev[moduleId],
        }));
    };

    // Calculate total lessons and completed lessons (for demo purposes)
    const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = Math.floor(totalLessons * 0.3); // 30% completion for demo

    // Find instructor name by ID
    const getInstructorName = (id) => {
        const instructor = instructors.find((i) => i.id === id);
        return instructor ? instructor.name : "";
    };

    const getContentTypeIcon = (type) => {
        switch (type) {
            case "video":
                return <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>;
            case "assignment":
                return <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>;
            case "quiz":
                return <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>;
            case "text":
                return <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>;
            default:
                return <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Course Curriculum Preview</h2>
                        <p className="text-gray-600 dark:text-gray-300">This is how your curriculum will appear to students.</p>
                    </div>
                    <Button onClick={onBackToEditor} className="">
                        <Edit3 size={18} />
                        Back to Editor
                    </Button>
                </div>

                <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-lg border border-primary/20 dark:border-primary/30">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-medium text-primary dark:text-primary">Your Course Progress</h3>
                            <p className="text-sm text-primary/80 dark:text-primary/80">
                                {completedLessons} of {totalLessons} lessons completed
                            </p>
                        </div>
                        <div className="w-full md:w-1/3">
                            <Progress value={(completedLessons / totalLessons) * 100} className="h-2 bg-primary/20 dark:bg-primary/30">
                                <div className="h-full bg-primary rounded-full" />
                            </Progress>
                        </div>
                    </div>
                </div>
            </div>

            {modules.map((module) => (
                <div key={module.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div
                        className="p-4 border-b dark:border-gray-700 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 cursor-pointer"
                        onClick={() => toggleModule(module.id)}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{module.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {module.lessons.length} {module.lessons.length === 1 ? "lesson" : "lessons"}
                                </p>
                            </div>
                            <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                                {expandedModules[module.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </Button>
                        </div>
                    </div>

                    {expandedModules[module.id] && (
                        <div className="divide-y dark:divide-gray-700">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <LessonPreviewItem key={lesson.id} lesson={lesson} lessonIndex={lessonIndex} getInstructorName={getInstructorName} getContentTypeIcon={getContentTypeIcon} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function LessonPreviewItem({ lesson, lessonIndex, getInstructorName, getContentTypeIcon }) {
    const [expanded, setExpanded] = useState(false);
    const isCompleted = Math.random() > 0.7; // Random completion status for demo

    const getTopicIcon = (type) => {
        switch (type) {
            case "video":
                return <Play size={14} className="text-blue-500" />;
            case "pdf":
                return <FileText size={14} className="text-red-500" />;
            case "quiz":
                return <FileQuestion size={14} className="text-purple-500" />;
            case "assignment":
                return <FileText size={14} className="text-green-500" />;
            default:
                return <BookOpen size={14} className="text-gray-500" />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800">
            <div className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${isCompleted ? "bg-green-50/50 dark:bg-green-900/10" : ""}`} onClick={() => setExpanded(!expanded)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                        <div className="mt-1">{getContentTypeIcon(lesson.type)}</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-800 dark:text-white">{lesson.title}</h4>
                                {isCompleted && (
                                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                                        Completed
                                    </Badge>
                                )}
                                {lesson.free && <Badge className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary border-0 text-xs">Free</Badge>}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    <Clock size={14} className="mr-1" />
                                    {lesson.duration}
                                </div>
                                {lesson.instructor && (
                                    <div className="flex items-center">
                                        <User size={14} className="mr-1" />
                                        {getInstructorName(lesson.instructor)}
                                    </div>
                                )}
                                {lesson.publishDate && <div className="text-xs text-gray-400 dark:text-gray-500">Published: {new Date(lesson.publishDate).toLocaleDateString()}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {!lesson.free && !isCompleted && <Lock size={16} className="text-gray-400" />}
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>
                    </div>
                </div>

                {expanded && lesson.topics && lesson.topics.length > 0 && (
                    <div className="mt-4 pl-10 space-y-2">
                        <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Topics & Resources</h5>
                        {lesson.topics.map((topic) => (
                            <div key={topic.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                {getTopicIcon(topic.type)}
                                <span className="text-sm text-gray-700 dark:text-gray-300">{topic.title}</span>
                                {topic.description && <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{topic.description}</span>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
