"use client";

import { useRef, useState } from "react";
import LessonItem from "./lesson-item";
import { useCurriculum } from "../../hooks/use-curriculum";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function LessonList({ moduleIndex }) {
    const { modules, setModules, removeLesson } = useCurriculum();
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const [lessonToDelete, setLessonToDelete] = useState(null);

    const handleDragStart = (moduleIndex, lessonIndex) => {
        dragItem.current = { moduleIndex, lessonIndex };
    };

    const handleDragEnter = (moduleIndex, lessonIndex) => {
        dragOverItem.current = { moduleIndex, lessonIndex };
    };

    const handleDragEnd = () => {
        if (dragItem.current && dragOverItem.current) {
            const { moduleIndex: fromModuleIndex, lessonIndex: fromLessonIndex } = dragItem.current;
            const { moduleIndex: toModuleIndex, lessonIndex: toLessonIndex } = dragOverItem.current;

            // Only reorder if the positions are different
            if (fromModuleIndex === toModuleIndex && fromLessonIndex !== toLessonIndex) {
                // Reordering within the same module
                const updatedModules = [...modules];
                const items = [...updatedModules[fromModuleIndex].lessons];
                const [movedItem] = items.splice(fromLessonIndex, 1);
                items.splice(toLessonIndex, 0, movedItem);
                updatedModules[fromModuleIndex].lessons = items;
                setModules(updatedModules);
            } else if (fromModuleIndex !== toModuleIndex) {
                // Moving between modules
                const updatedModules = [...modules];
                const itemToMove = updatedModules[fromModuleIndex].lessons[fromLessonIndex];
                updatedModules[fromModuleIndex].lessons.splice(fromLessonIndex, 1);
                updatedModules[toModuleIndex].lessons.splice(toLessonIndex, 0, itemToMove);
                setModules(updatedModules);
            }
        }

        dragItem.current = null;
        dragOverItem.current = null;
    };

    return (
        <div className="space-y-4">
            {modules[moduleIndex].lessons.map((lesson, lessonIndex) => (
                <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    moduleIndex={moduleIndex}
                    lessonIndex={lessonIndex}
                    onDragStart={() => handleDragStart(moduleIndex, lessonIndex)}
                    onDragOver={(e) => {
                        e.preventDefault();
                        handleDragEnter(moduleIndex, lessonIndex);
                    }}
                    onDragEnd={handleDragEnd}
                    onDeleteRequest={() => setLessonToDelete({ moduleIndex, lessonIndex })}
                />
            ))}

            <AlertDialog open={lessonToDelete !== null} onOpenChange={(open) => !open && setLessonToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete this lesson and all its topics. This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (lessonToDelete) {
                                    removeLesson(lessonToDelete.moduleIndex, lessonToDelete.lessonIndex);
                                    setLessonToDelete(null);
                                }
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
