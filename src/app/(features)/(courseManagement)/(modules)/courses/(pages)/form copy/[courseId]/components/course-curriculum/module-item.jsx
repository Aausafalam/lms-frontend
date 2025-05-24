"use client";

import React from "react";

import { ChevronDown, ChevronUp, GripVertical, PlusCircle, Trash2, Copy, Clock, CalendarIcon, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import LessonList from "./lesson-list";
import { useCurriculum } from "../../hooks/use-curriculum";
import { useState } from "react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploadField from "@/components/ui/file";
import { ContentLibraryModal } from "./content-library-modal";

export default function ModuleItem({ module, moduleIndex, onDragStart, onDragOver, onDragEnd, onDeleteRequest }) {
    const { updateModule, addLesson, duplicateModule } = useCurriculum();
    const [isHovered, setIsHovered] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);

    const toggleModuleOpen = () => {
        updateModule(moduleIndex, "isOpen", !module.isOpen);
    };

    const handleUpdateModule = (event) => {
        const { name, value } = event.target;
        updateModule(moduleIndex, name, value);
    };

    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 border ${
                isHovered ? "border-primary/50 dark:border-primary/50" : "border-gray-100 dark:border-gray-700"
            }`}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center p-4 border-b dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750">
                <div className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2">
                    <GripVertical size={20} />
                </div>
                <div className="flex items-center flex-grow">
                    <Button type="button" onClick={toggleModuleOpen} variant="ghost" size="sm" className="mr-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                        {module.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                    <input
                        type="text"
                        value={module.title}
                        onChange={handleUpdateModule}
                        name="title"
                        className="flex-grow bg-transparent border-0 focus:ring-0 p-0 text-lg font-medium text-gray-800 dark:text-white focus:outline-none"
                        placeholder="Module Title"
                    />
                </div>
                <div className="flex items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                        {module.lessons.length} {module.lessons.length === 1 ? "lesson" : "lessons"}
                    </span>
                    <Button
                        type="button"
                        onClick={() => duplicateModule(moduleIndex)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-primary dark:hover:text-primary p-1 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 mr-1"
                    >
                        <Copy size={18} />
                    </Button>
                    <Button
                        type="button"
                        onClick={onDeleteRequest}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                        <Trash2 size={18} />
                    </Button>
                </div>
            </div>

            <div className="p-5 pb-3">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <FileUploadField label="Banner" value={module.description} onChange={handleUpdateModule} placeholder="write about module" name="description" className="md:col-span-2" />
                    <Textarea label="Description" type="text" value={module.description} onChange={handleUpdateModule} placeholder="write about module" name="description" className="md:col-span-2" />
                    <Select
                        value={module.type}
                        onChange={handleUpdateModule}
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
                        className="md:col-span-1"
                    />
                    <Input
                        className="md:col-span-1"
                        type="date"
                        name="publishDate"
                        label="Publish Date"
                        icon={<CalendarIcon className="mr-2 h-4 w-4" />}
                        value={module.publishDate}
                        onChange={handleUpdateModule}
                    />
                </div>
                {module.contentId && (
                    <div className="mt-0 p-1 px-3 bg-primary/10 dark:bg-primary/20 rounded-md border border-primary/20 dark:border-primary/30 text-sm text-primary-foreground dark:text-primary-foreground flex items-center">
                        <div className="flex-grow">Content ID: {module.contentId}</div>
                        <Button type="button" variant="ghost" size="sm" className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80">
                            <ExternalLink size={14} />
                        </Button>
                    </div>
                )}
            </div>

            {module.isOpen && (
                <div className="p-4 space-y-4">
                    {module.lessons.length === 0 ? (
                        <div className="text-center py-8 px-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary mb-4">
                                <PlusCircle size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No lessons yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">Add your first lesson to this module</p>
                            <Button type="button" onClick={() => addLesson(moduleIndex)}>
                                <PlusCircle size={18} />
                                Add First Lesson
                            </Button>
                        </div>
                    ) : (
                        <LessonList moduleIndex={moduleIndex} />
                    )}

                    {module.lessons.length > 0 && (
                        <Button
                            type="button"
                            onClick={() => addLesson(moduleIndex)}
                            variant="outline"
                            className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary gap-2"
                        >
                            <PlusCircle size={18} />
                            Add Lesson
                        </Button>
                    )}
                </div>
            )}

            {showContentModal && (
                <ContentLibraryModal
                    contentType={module.type}
                    onSelect={(content) => {
                        handleUpdateModule({ target: { name: "title", value: content.title } });
                        handleUpdateModule({ target: { name: "duration", value: content.duration } });
                        handleUpdateModule({ target: { name: "contentId", value: content.id } });
                        setShowContentModal(false);
                    }}
                    onClose={() => setShowContentModal(false)}
                />
            )}
        </div>
    );
}
