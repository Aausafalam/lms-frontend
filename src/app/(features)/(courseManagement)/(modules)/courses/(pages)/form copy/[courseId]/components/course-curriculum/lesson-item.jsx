"use client";

import React from "react";

import { useState } from "react";
import { Clock, GripVertical, PlusCircle, Search, Trash2, ExternalLink, CalendarIcon, ChevronUp, ChevronDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ContentLibraryModal } from "./content-library-modal";
import TopicList from "./topic-list";
import { instructors } from "../../data/initial-data";
import { Select } from "@/components/ui/select";
import { useCurriculum } from "../../hooks/use-curriculum";
import { Input } from "@/components/ui/input";
import FileUploadField from "@/components/ui/file";
import { Textarea } from "@/components/ui/textarea";

export default function LessonItem({ lesson, moduleIndex, lessonIndex, onDragStart, onDragOver, onDragEnd, onDeleteRequest }) {
    const [showContentModal, setShowContentModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const { updateLesson, addTopic, duplicateLesson } = useCurriculum();

    const handleUpdateLesson = (event) => {
        const { name, value } = event.target;
        updateLesson(moduleIndex, lessonIndex, name, value);
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

    // Find instructor name by ID
    const getInstructorName = (id) => {
        const instructor = instructors.find((i) => i.id === id);
        return instructor ? instructor.name : "Select instructor";
    };

    return (
        <>
            <div
                className={`bg-gray-50 dark:bg-gray-800 rounded-xl border ${
                    isHovered ? "border-primary/50 dark:border-primary/50" : "border-gray-200 dark:border-gray-700"
                } transition-colors duration-200 overflow-hidden`}
                draggable
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <div className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2">
                        <GripVertical size={16} />
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center">
                            {getContentTypeIcon(lesson.type)}
                            <input
                                type="text"
                                className="ml-1 flex-grow bg-transparent border-0 focus:ring-0 p-0  focus:outline-none text-sm font-medium text-gray-600 dark:text-gray-300"
                                name="title"
                                label="Lesson Title"
                                value={lesson.title}
                                onChange={handleUpdateLesson}
                                placeholder="Lesson Title"
                            />
                        </div>
                    </div>
                    <Button
                        type="button"
                        onClick={() => duplicateLesson(moduleIndex, lessonIndex)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-primary dark:hover:text-primary p-1 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 mr-1"
                    >
                        <Copy size={16} />
                    </Button>
                    <Button type="button" onClick={() => setIsExpanded(!isExpanded)} variant="ghost" size="sm" className="text-gray-500 hover:text-primary mr-1">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                    <Button
                        type="button"
                        onClick={onDeleteRequest}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>

                <div className="p-4 dark:bg-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-9 gap-4">
                        <Select
                            value={lesson.type}
                            onChange={handleUpdateLesson}
                            options={[
                                { value: "video", label: "Video" },
                                { value: "assignment", label: "Assignment" },
                                { value: "quiz", label: "quiz" },
                                { value: "text", label: "Text" },
                            ]}
                            icon={
                                <Search
                                    size={16}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setShowContentModal(true);
                                    }}
                                />
                            }
                            name={"type"}
                            label="Content Type"
                            className="md:col-span-2"
                        />

                        <Input
                            label="Duration"
                            icon={<Clock size={16} className="text-gray-400" />}
                            type="text"
                            value={lesson.duration}
                            onChange={handleUpdateLesson}
                            placeholder="30 min"
                            name="duration"
                            className="md:col-span-2"
                        />
                        <Input
                            className="md:col-span-2"
                            type="date"
                            name="publishDate"
                            label="Publish Date"
                            icon={<CalendarIcon className="mr-2 h-4 w-4" />}
                            value={lesson.publishDate}
                            onChange={handleUpdateLesson}
                        />

                        <Select
                            value={lesson.instructor}
                            onChange={handleUpdateLesson}
                            label="Instructor"
                            placeholder="Select instructor"
                            name="instructor"
                            className="md:col-span-2"
                            options={instructors.map((item) => ({ label: item.name, value: item.id }))}
                        ></Select>

                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium  text-gray-700 dark:text-gray-300 mb-1">Free</label>
                            <div className="h-[38px]">
                                <Switch
                                    checked={lesson.free}
                                    onCheckedChange={(checked) => {
                                        handleUpdateLesson({ target: { name: "free", value: checked } });
                                    }}
                                    className="data-[state=checked]:bg-primary"
                                />
                            </div>
                        </div>
                        <FileUploadField label="Banner" value={lesson.description} onChange={handleUpdateLesson} placeholder="write about lesson" name="description" className="md:col-span-4" />
                        <Textarea
                            label="Description"
                            type="text"
                            value={lesson.description}
                            onChange={handleUpdateLesson}
                            placeholder="write about lesson"
                            name="description"
                            className="md:col-span-4"
                        />
                    </div>

                    {lesson.contentId && (
                        <div className="mt-3 p-1 px-3 bg-primary/10 dark:bg-primary/20 rounded-md border border-primary/20 dark:border-primary/30 text-sm text-primary-foreground dark:text-primary-foreground flex items-center">
                            <div className="flex-grow">Content ID: {lesson.contentId}</div>
                            <Button type="button" variant="ghost" size="sm" className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80">
                                <ExternalLink size={14} />
                            </Button>
                        </div>
                    )}

                    {isExpanded && (
                        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Topics & Resources</h4>
                                <Button
                                    type="button"
                                    onClick={() => addTopic(moduleIndex, lessonIndex)}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs gap-1 border-primary/20 dark:border-primary/30 text-primary dark:text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
                                >
                                    <PlusCircle size={14} />
                                    Add Topic
                                </Button>
                            </div>

                            {lesson.topics && lesson.topics.length > 0 ? (
                                <TopicList topics={lesson.topics} moduleIndex={moduleIndex} lessonIndex={lessonIndex} />
                            ) : (
                                <div className="text-center py-4 px-2 bg-gray-50 dark:bg-gray-700 rounded-md border border-dashed border-gray-300  dark:border-gray-600">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No topics added yet. Add topics, videos, PDFs, assignments, or quizzes to enhance your lesson content.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showContentModal && (
                <ContentLibraryModal
                    contentType={lesson.type}
                    onSelect={(content) => {
                        handleUpdateLesson({ target: { name: "title", value: content.title } });
                        handleUpdateLesson({ target: { name: "duration", value: content.duration } });
                        handleUpdateLesson({ target: { name: "contentId", value: content.id } });
                        setShowContentModal(false);
                    }}
                    onClose={() => setShowContentModal(false)}
                />
            )}
        </>
    );
}
