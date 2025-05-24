"use client";

import React from "react";
import { useState } from "react";
import { FileText, GripVertical, Trash2, Video, FileQuestion, BookOpen, Search, ChevronDown, ChevronUp, ExternalLink, Edit, Delete, DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentLibraryModal } from "./content-library-modal";
import { useCurriculum } from "../../hooks/use-curriculum";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function TopicItem({ topic, topicIndex, moduleIndex, lessonIndex, onDragStart, onDragOver, onDragEnd, onDeleteRequest }) {
    const [showContentModal, setShowContentModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { updateTopic } = useCurriculum();
    const [contentIndex, setContentIndex] = useState(undefined);

    const handleUpdateTopic = (event) => {
        const { name, value } = event.target;
        updateTopic(moduleIndex, lessonIndex, topicIndex, name, value);
    };

    const getTypeIcon = () => {
        switch (topic.type) {
            case "video":
                return <Video size={16} className="text-blue-500" />;
            case "pdf":
                return <FileText size={16} className="text-red-500" />;
            case "quiz":
                return <FileQuestion size={16} className="text-purple-500" />;
            case "assignment":
                return <FileText size={16} className="text-green-500" />;
            default:
                return <BookOpen size={16} className="text-gray-500" />;
        }
    };

    return (
        <>
            <div
                className={`bg-white dark:bg-gray-800 rounded-md border ${
                    isHovered ? "border-primary/50 dark:border-primary/50" : "border-gray-200 dark:border-gray-700"
                } transition-colors duration-200 overflow-hidden`}
                draggable
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <div className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2">
                        <GripVertical size={14} />
                    </div>

                    <div className="mr-2">{getTypeIcon()}</div>

                    <div className="flex-grow">
                        <input
                            type="text"
                            value={topic.title}
                            onChange={handleUpdateTopic}
                            className="flex-grow bg-transparent border-0 focus:ring-0 p-0  focus:outline-none text-sm font-medium text-gray-600 dark:text-gray-300"
                            name="title"
                            label="Topic title"
                        />
                    </div>

                    <Button type="button" onClick={() => setIsExpanded(!isExpanded)} variant="ghost" size="sm" className="text-gray-500 hover:text-primary mr-1 h-7 w-7 p-0">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>

                    <Button
                        type="button"
                        onClick={onDeleteRequest}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 h-7 w-7"
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>

                <div className={`p-3 dark:bg-gray-800 ${isExpanded ? "block" : "hidden"}`}>
                    <div className="flex gap-3">
                        <Select
                            name="type"
                            label="Type"
                            options={[
                                { label: "Content", value: "content" },
                                { label: "Video", value: "video" },
                                { label: "PDF", value: "pdf" },
                                { label: "Quiz", value: "quiz" },
                                { label: "Assignment", value: "assignment" },
                            ]}
                            value={topic.type}
                            onChange={handleUpdateTopic}
                            icon={
                                <Search
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setShowContentModal(true);
                                    }}
                                    size={14}
                                />
                            }
                            className="col-span-8"
                        />
                        <Textarea
                            name="description"
                            label="Description (Optional)"
                            value={topic.description || ""}
                            onChange={handleUpdateTopic}
                            placeholder="Add a description for this topic"
                            rows={3}
                        />
                    </div>
                    {topic.content?.length ? (
                        <div>
                            {topic.content?.map((content, index) => (
                                <div
                                    key={index}
                                    className="mt-3 p-1 px-3 bg-primary/10 dark:bg-primary/20 rounded-md border border-primary/20 dark:border-primary/30 text-sm text-primary-foreground dark:text-primary-foreground flex items-center"
                                >
                                    <div className="flex-grow">Content Name: {content.title}</div>
                                    <Button
                                        onClick={() => {
                                            setContentIndex(index);
                                            setShowContentModal(true);
                                        }}
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80"
                                    >
                                        <Edit size={14} />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const updatedContent = topic.content.filter((item) => item.id != content.id);
                                            handleUpdateTopic({ target: { name: "content", value: updatedContent } });
                                        }}
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            {showContentModal && (
                <ContentLibraryModal
                    contentType={topic.type}
                    onSelect={(content) => {
                        if (contentIndex != undefined) {
                            const updatedContent = [...topic.content];
                            updatedContent[contentIndex] = { title: content.title, id: content.id };
                            handleUpdateTopic({ target: { name: "content", value: updatedContent } });
                        } else {
                            const isContentPresent = topic.content.find((item) => item.id === content.id);
                            if (!isContentPresent) {
                                handleUpdateTopic({ target: { name: "content", value: [...topic.content, { title: content.title, id: content.id }] } });
                            }
                        }
                        setShowContentModal(false);
                        setContentIndex(undefined);
                    }}
                    onClose={() => setShowContentModal(false)}
                />
            )}
        </>
    );
}
