"use client";

import { useRef, useState } from "react";
import TopicItem from "./topic-item";
import { useCurriculum } from "../../hooks/use-curriculum";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function TopicList({ topics, moduleIndex, lessonIndex }) {
    const { reorderTopics, removeTopic } = useCurriculum();
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const [topicToDelete, setTopicToDelete] = useState(null);

    const handleDragStart = (moduleIndex, lessonIndex, topicIndex) => {
        dragItem.current = { moduleIndex, lessonIndex, topicIndex };
    };

    const handleDragEnter = (moduleIndex, lessonIndex, topicIndex) => {
        dragOverItem.current = { moduleIndex, lessonIndex, topicIndex };
    };

    const handleDragEnd = () => {
        if (dragItem.current !== null && dragOverItem.current !== null) {
            reorderTopics(dragItem.current.moduleIndex, dragItem.current.lessonIndex, dragItem.current.topicIndex, dragOverItem.current.topicIndex);
        }

        dragItem.current = null;
        dragOverItem.current = null;
    };

    return (
        <div className="space-y-2">
            {topics.map((topic, topicIndex) => (
                <TopicItem
                    key={topic.id}
                    topic={topic}
                    topicIndex={topicIndex}
                    moduleIndex={moduleIndex}
                    lessonIndex={lessonIndex}
                    onDragStart={() => handleDragStart(moduleIndex, lessonIndex, topicIndex)}
                    onDragOver={(e) => {
                        e.preventDefault();
                        handleDragEnter(moduleIndex, lessonIndex, topicIndex);
                    }}
                    onDragEnd={handleDragEnd}
                    onDeleteRequest={() => setTopicToDelete({ moduleIndex, lessonIndex, topicIndex })}
                />
            ))}

            <AlertDialog open={topicToDelete !== null} onOpenChange={(open) => !open && setTopicToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Topic</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete this topic. This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (topicToDelete) {
                                    removeTopic(moduleIndex, lessonIndex, topicToDelete.topicIndex);
                                    setTopicToDelete(null);
                                }
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
