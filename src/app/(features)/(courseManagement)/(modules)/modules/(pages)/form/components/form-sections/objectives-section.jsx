"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, CheckCircle2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/formSection";

export const ObjectivesSection = memo(function ObjectivesSection({ handlers = {}, formData = { learningObjectives: [] }, sectionRef, isActive }) {
    // Destructure handlers for better readability
    const { handleLearningObjectiveChange, removeLearningObjective, addLearningObjective } = handlers;

    // Animation configuration for list items
    const listItemAnimation = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    };

    // Ensure learning objectives array exists to prevent errors
    const objectives = Array.isArray(formData.learningObjectives) ? formData.learningObjectives : [];

    return (
        <FormSection
            id="objectives"
            title="Learning Objectives"
            icon={<Target className="h-5 w-5" />}
            description="Define what students will learn from this module"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Informational box with tips */}
                <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
                    <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        <span>Clear learning goals help students see what they'll gain—start with verbs like "Learn," "Create," or "Understand".</span>
                    </p>
                </div>

                {/* Learning objectives list */}
                <div className="space-y-4">
                    {objectives.map((objective, index) => (
                        <motion.div key={index} {...listItemAnimation} className="flex items-center gap-2" aria-label={`Learning objective ${index + 1}`}>
                            {/* Objective number indicator */}
                            <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-medium">
                                {index + 1}
                            </div>

                            {/* Objective input field */}
                            <Input
                                value={objective || ""}
                                onChange={(e) => handleLearningObjectiveChange(index, e.target.value)}
                                placeholder={`Learning objective ${index + 1}`}
                                aria-label={`Learning objective ${index + 1}`}
                            />

                            {/* Remove button - only shown if there's more than one objective */}
                            {objectives.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeLearningObjective(index)}
                                    className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                                    aria-label={`Remove learning objective ${index + 1}`}
                                    title="Remove this objective"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </motion.div>
                    ))}

                    {/* Empty state message when no objectives exist */}
                    {objectives.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Target className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p>No learning objectives added yet.</p>
                            <p className="text-sm">Add your first objective to get started.</p>
                        </div>
                    )}

                    {/* Add new objective button */}
                    <Button
                        variant="outline"
                        onClick={addLearningObjective}
                        className="mt-2 bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30 dark:hover:bg-orange-950/30"
                        aria-label="Add learning objective"
                    >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Add Learning Objective
                    </Button>

                    {/* Helper text with examples */}
                    {objectives.length > 0 && (
                        <div className="mt-4 text-[0.8rem] text-gray-500 dark:text-gray-400">
                            <p className="font-medium mb-1">Example objectives:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Understand the fundamental principles of [topic]</li>
                                <li>Build a working [project type] using [technology]</li>
                                <li>Apply [concept] to solve real-world problems</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </FormSection>
    );
});
