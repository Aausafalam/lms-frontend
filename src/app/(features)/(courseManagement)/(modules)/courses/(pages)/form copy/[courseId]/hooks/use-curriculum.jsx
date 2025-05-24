"use client";

import { useState, useCallback, createContext, useContext, useRef } from "react";
import { initialModules } from "../data/initial-data";

const CurriculumContext = createContext(undefined);

export function CurriculumProvider({ children }) {
    const [modules, setModules] = useState(initialModules);
    // Track operation timestamps to prevent duplicates
    const lastOperationTimestamps = useRef({
        addLesson: 0,
        addTopic: 0,
        duplicateLesson: 0,
        duplicateModule: 0,
        addModule: 0,
        removeModule: 0,
        removeLesson: 0,
        removeTopic: 0,
        reorderTopics: 0,
    });

    // Helper to prevent duplicate operations
    const preventDuplicateOperation = (operation) => {
        const now = Date.now();
        if (now - lastOperationTimestamps.current[operation] < 300) {
            return false; // Too soon, skip the operation
        }
        lastOperationTimestamps.current[operation] = now;
        return true;
    };

    // Module operations
    const addModule = useCallback(() => {
        const newModuleNumber = modules.length + 1;
        setModules((prevModules) => {
            if (!preventDuplicateOperation("addModule")) return prevModules;
            return [
                ...prevModules,
                {
                    id: `module-${Date.now()}`,
                    title: `Module ${newModuleNumber}: New Module`,
                    isOpen: true,
                    lessons: [],
                },
            ];
        });
    }, [modules.length]);

    const updateModule = useCallback((moduleIndex, field, value) => {
        setModules((prevModules) => {
            const updatedModules = [...prevModules];
            updatedModules[moduleIndex] = { ...updatedModules[moduleIndex], [field]: value };
            return updatedModules;
        });
    }, []);

    const removeModule = useCallback((moduleIndex) => {
        setModules((prevModules) => {
            if (!preventDuplicateOperation("removeModule")) return prevModules;
            const updatedModules = [...prevModules];
            updatedModules.splice(moduleIndex, 1);
            return updatedModules;
        });
    }, []);

    const reorderModules = useCallback((fromIndex, toIndex) => {
        setModules((prevModules) => {
            const updatedModules = [...prevModules];
            const [movedModule] = updatedModules.splice(fromIndex, 1);
            updatedModules.splice(toIndex, 0, movedModule);
            return updatedModules;
        });
    }, []);

    // Lesson operations
    const addLesson = useCallback((moduleIndex) => {
        setModules((prevModules) => {
            if (!preventDuplicateOperation("addLesson")) return prevModules;
            const updatedModules = [...prevModules];
            const newLesson = {
                id: `lesson-${Date.now()}`,
                title: "New Lesson",
                duration: "30 min",
                type: "video",
                free: false,
                contentId: "",
                publishDate: new Date().toISOString(),
                instructor: "",
                topics: [],
            };

            updatedModules[moduleIndex] = {
                ...updatedModules[moduleIndex],
                lessons: [...updatedModules[moduleIndex].lessons, newLesson],
            };

            return updatedModules;
        });
    }, []);

    const updateLesson = useCallback((moduleIndex, lessonIndex, field, value) => {
        setModules((prevModules) => {
            const updatedModules = [...prevModules];
            updatedModules[moduleIndex].lessons[lessonIndex] = {
                ...updatedModules[moduleIndex].lessons[lessonIndex],
                [field]: value,
            };
            return updatedModules;
        });
    }, []);

    const removeLesson = useCallback((moduleIndex, lessonIndex) => {
        setModules((prevModules) => {
            if (!preventDuplicateOperation("removeLesson")) return prevModules;
            const updatedModules = [...prevModules];
            updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
            return updatedModules;
        });
    }, []);

    const reorderLessons = useCallback((fromModuleIndex, fromLessonIndex, toModuleIndex, toLessonIndex) => {
        setModules((prevModules) => {
            const updatedModules = [...prevModules];
            const movedLesson = { ...updatedModules[fromModuleIndex].lessons[fromLessonIndex] };

            // Remove from original position
            updatedModules[fromModuleIndex].lessons.splice(fromLessonIndex, 1);

            // Add to new position
            updatedModules[toModuleIndex].lessons.splice(toLessonIndex, 0, movedLesson);

            return updatedModules;
        });
    }, []);

    // Topic operations
    const addTopic = useCallback((moduleIndex, lessonIndex) => {
        setModules((prevModules) => {
            if (!preventDuplicateOperation("addTopic")) return prevModules;
            const updatedModules = [...prevModules];
            const lesson = updatedModules[moduleIndex].lessons[lessonIndex];

            // Ensure topics array exists
            const currentTopics = lesson.topics || [];

            // Create new topic
            const newTopic = {
                id: `topic-${Date.now()}`,
                title: "New Topic",
                type: "content",
                content: [],
            };

            // Add topic using immutable pattern
            updatedModules[moduleIndex].lessons[lessonIndex] = {
                ...lesson,
                topics: [...currentTopics, newTopic],
            };

            return updatedModules;
        });
    }, []);

    const updateTopic = useCallback((moduleIndex, lessonIndex, topicIndex, field, value) => {
        setModules((prevModules) => {
            const updatedModules = [...prevModules];
            if (updatedModules[moduleIndex].lessons[lessonIndex].topics) {
                updatedModules[moduleIndex].lessons[lessonIndex].topics[topicIndex] = {
                    ...updatedModules[moduleIndex].lessons[lessonIndex].topics[topicIndex],
                    [field]: value,
                };
            }
            return updatedModules;
        });
    }, []);

    const removeTopic = useCallback((moduleIndex, lessonIndex, topicIndex) => {
        setModules((prevModules) => {
            if (!preventDuplicateOperation("removeTopic")) return prevModules;
            const updatedModules = [...prevModules];
            if (updatedModules[moduleIndex].lessons[lessonIndex].topics) {
                updatedModules[moduleIndex].lessons[lessonIndex].topics.splice(topicIndex, 1);
            }
            return updatedModules;
        });
    }, []);

    const reorderTopics = useCallback((moduleIndex, lessonIndex, fromIndex, toIndex) => {
        setModules((prevModules) => {
            if (!preventDuplicateOperation("reorderTopics")) return prevModules;
            const updatedModules = [...prevModules];
            if (updatedModules[moduleIndex].lessons[lessonIndex].topics) {
                const topics = updatedModules[moduleIndex].lessons[lessonIndex].topics;
                const [movedTopic] = topics.splice(fromIndex, 1);
                topics.splice(toIndex, 0, movedTopic);
            }
            return updatedModules;
        });
    }, []);

    // Bulk operations
    const duplicateLesson = useCallback((moduleIndex, lessonIndex) => {
        setModules((prevModules) => {
            if (!preventDuplicateOperation("duplicateLesson")) return prevModules;
            const updatedModules = [...prevModules];
            const lessonToDuplicate = { ...updatedModules[moduleIndex].lessons[lessonIndex] };

            // Generate unique timestamp for the new lesson ID
            const timestamp = Date.now();

            // Create a deep copy with new IDs
            const duplicatedLesson = {
                ...lessonToDuplicate,
                id: `lesson-${timestamp}`,
                title: `${lessonToDuplicate.title} (Copy)`,
                topics: lessonToDuplicate.topics
                    ? lessonToDuplicate.topics.map((topic, idx) => ({
                          ...topic,
                          id: `topic-${timestamp}-${idx}`,
                      }))
                    : [],
            };

            // Create a new array with the duplicated lesson inserted
            const newLessons = [...updatedModules[moduleIndex].lessons];
            newLessons.splice(lessonIndex + 1, 0, duplicatedLesson);

            // Update module with new lessons array
            updatedModules[moduleIndex] = {
                ...updatedModules[moduleIndex],
                lessons: newLessons,
            };

            return updatedModules;
        });
    }, []);

    const duplicateModule = useCallback((moduleIndex) => {
        setModules((prevModules) => {
            if (!preventDuplicateOperation("duplicateModule")) return prevModules;
            const updatedModules = [...prevModules];
            const moduleToDuplicate = { ...updatedModules[moduleIndex] };

            // Generate a unique timestamp for IDs
            const timestamp = Date.now();

            // Create a deep copy with new IDs
            const duplicatedModule = {
                ...moduleToDuplicate,
                id: `module-${timestamp}`,
                title: `${moduleToDuplicate.title} (Copy)`,
                lessons: moduleToDuplicate.lessons.map((lesson, lessonIdx) => ({
                    ...lesson,
                    id: `lesson-${timestamp}-${lessonIdx}`,
                    topics: lesson.topics
                        ? lesson.topics.map((topic, topicIdx) => ({
                              ...topic,
                              id: `topic-${timestamp}-${lessonIdx}-${topicIdx}`,
                          }))
                        : [],
                })),
            };

            // Insert the duplicated module
            updatedModules.splice(moduleIndex + 1, 0, duplicatedModule);
            return updatedModules;
        });
    }, []);

    const value = {
        modules,
        setModules,
        addModule,
        updateModule,
        removeModule,
        reorderModules,
        addLesson,
        updateLesson,
        removeLesson,
        reorderLessons,
        addTopic,
        updateTopic,
        removeTopic,
        reorderTopics,
        duplicateLesson,
        duplicateModule,
    };

    return <CurriculumContext.Provider value={value}>{children}</CurriculumContext.Provider>;
}

export function useCurriculum() {
    const context = useContext(CurriculumContext);
    if (context === undefined) {
        throw new Error("useCurriculum must be used within a CurriculumProvider");
    }
    return context;
}
