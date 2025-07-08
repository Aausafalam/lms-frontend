"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Lightbulb, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/formSection";
import { Select } from "@/components/ui/select";

export const SkillsSection = memo(function SkillsSection({ handlers = {}, formData = { skills: [] }, sectionRef, isActive }) {
    const { handleSkillChange, removeSkill, addSkill } = handlers;

    // Animation configuration for list items
    const listItemAnimation = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    };

    // Ensure skills array exists to prevent errors
    const skills = Array.isArray(formData.skills) ? formData.skills : [];

    // Skill level options
    const skillLevels = [
        { label: "Beginner", value: "Beginner" },
        { label: "Intermediate", value: "Intermediate" },
        { label: "Advanced", value: "Advanced" },
        { label: "Expert", value: "Expert" },
    ];

    return (
        <FormSection
            id="skills"
            title="Skills Taught"
            icon={<Lightbulb className="h-5 w-5" />}
            description="Define the skills students will gain from this module"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Informational box with tips */}
                <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
                    <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        <span>List specific skills students will gain—these help with module discoverability and student expectations.</span>
                    </p>
                </div>

                {/* Skills list */}
                <div className="space-y-4">
                    {skills.map((skill, index) => (
                        <motion.div key={index} {...listItemAnimation} className="grid grid-cols-1 md:grid-cols-[2fr,1fr,auto] gap-3 items-start">
                            {/* Skill name input */}
                            <Input
                                placeholder="Skill name (e.g., React.js)"
                                value={skill.name || ""}
                                onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                                aria-label={`Skill ${index + 1} name`}
                            />

                            {/* Skill level select */}
                            <Select
                                placeholder="Skill level"
                                options={skillLevels}
                                value={skill.level || ""}
                                onChange={(e) => handleSkillChange(index, "level", e.target.value)}
                                aria-label={`Skill ${index + 1} level`}
                            />

                            {/* Remove button */}
                            {skills.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSkill(index)}
                                    className="h-10 w-10 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                    aria-label={`Remove skill ${index + 1}`}
                                    title="Remove this skill"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </motion.div>
                    ))}

                    {/* Empty state message when no skills exist */}
                    {skills.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p>No skills added yet.</p>
                            <p className="text-sm">Add skills that students will learn in this module.</p>
                        </div>
                    )}

                    {/* Add new skill button */}
                    <Button
                        variant="outline"
                        onClick={addSkill}
                        className="mt-2 bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30 dark:hover:bg-orange-950/30"
                        aria-label="Add skill"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                    </Button>
                </div>
            </div>
        </FormSection>
    );
});
