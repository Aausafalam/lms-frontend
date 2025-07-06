"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2, X, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/formSection";

export const PreRequisitesSection = memo(function PreRequisitesSection({ handlers = {}, formData = { prerequisites: [] }, sectionRef, isActive }) {
    const { handlePreRequisiteChange, removePreRequisite, addPreRequisite } = handlers;

    const listItemAnimation = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    };

    const prerequisites = Array.isArray(formData.prerequisites) ? formData.prerequisites : [];

    return (
        <FormSection
            id="prerequisites"
            title="Pre-requisites"
            icon={<Award className="h-5 w-5" />}
            description="List the skills or knowledge students should have before starting this course"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Info box with guidance on writing pre-requisites */}
                <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
                    <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        <span>Write clear and specific pre-requisites—focus on skills or concepts students should already know.</span>
                    </p>
                </div>

                {/* Pre-requisites list */}
                <div className="space-y-4">
                    {prerequisites.map((item, index) => (
                        <motion.div key={index} {...listItemAnimation} className="flex items-center gap-2" aria-label={`Pre-requisite ${index + 1}`}>
                            {/* Pre-requisite number */}
                            <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-medium">
                                {index + 1}
                            </div>

                            {/* Input field for the pre-requisite */}
                            <Input
                                value={item || ""}
                                onChange={(e) => handlePreRequisiteChange(index, e.target.value)}
                                placeholder={`Pre-requisite ${index + 1}`}
                                aria-label={`Pre-requisite ${index + 1}`}
                            />

                            {/* Remove button (shown only if there's more than one pre-requisite) */}
                            {prerequisites.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removePreRequisite(index)}
                                    className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                                    aria-label={`Remove pre-requisite ${index + 1}`}
                                    title="Remove this pre-requisite"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </motion.div>
                    ))}

                    {/* Empty state if no pre-requisites exist */}
                    {prerequisites.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Award className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p>No pre-requisites added yet.</p>
                            <p className="text-sm">Add your first pre-requisite to get started.</p>
                        </div>
                    )}

                    {/* Button to add a new pre-requisite */}
                    <Button
                        variant="outline"
                        onClick={addPreRequisite}
                        className="mt-2 bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30 dark:hover:bg-orange-950/30"
                        aria-label="Add pre-requisite"
                    >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Add Pre-requisite
                    </Button>

                    {/* Examples to guide the user */}
                    {prerequisites.length > 0 && (
                        <div className="mt-4 text-[0.8rem] text-gray-500 dark:text-gray-400">
                            <p className="font-medium mb-1">Example pre-requisites:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Basic understanding of HTML and CSS</li>
                                <li>Familiarity with JavaScript syntax</li>
                                <li>Completed "Introduction to Programming" module</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </FormSection>
    );
});
