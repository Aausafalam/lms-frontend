"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Layers, Plus, ChevronDown, ChevronUp, Trash2, Copy, Shuffle, GripVertical, ArrowUp, ArrowDown, Award } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuestionGroupForm } from "./question-group-form";
import { Select } from "@/components/ui/select";

/**
 * SectionsManager Component
 * Manages exam pattern sections with drag-and-drop functionality
 * Allows users to create, edit, reorder, and delete sections and question groups
 */
export const SectionsManager = memo(function SectionsManager({ handlers = {}, formData = { sections: [] }, sectionRef, isActive }) {
    const {
        handleSectionChange,
        addSection,
        removeSection,
        addQuestionGroup,
        removeQuestionGroup,
        handleQuestionGroupChange,
        moveSectionUp,
        moveSectionDown,
        moveQuestionGroupUp,
        moveQuestionGroupDown,
    } = handlers;

    const [expandedSections, setExpandedSections] = useState({});
    const [draggedSection, setDraggedSection] = useState(null);
    const [draggedQuestionGroup, setDraggedQuestionGroup] = useState(null);

    // Ensure sections array exists
    const sections = Array.isArray(formData.sections) ? formData.sections : [];

    /**
     * Toggle section expansion state
     */
    const toggleSectionExpand = (sectionId) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    /**
     * Duplicate a section with all its properties
     */
    const duplicateSection = (index) => {
        const sectionToDuplicate = { ...sections[index] };
        const newSection = {
            ...sectionToDuplicate,
            sectionId: `S${sections.length + 1}`,
            name: `${sectionToDuplicate.name} (Copy)`,
        };
        addSection(newSection);
    };

    /**
     * Handle section drag start
     */
    const handleSectionDragStart = (e, sectionIndex) => {
        setDraggedSection(sectionIndex);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target);
    };

    /**
     * Handle section drag over
     */
    const handleSectionDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    /**
     * Handle section drop
     */
    const handleSectionDrop = (e, targetIndex) => {
        e.preventDefault();
        if (draggedSection !== null && draggedSection !== targetIndex) {
            // Reorder sections
            const newSections = [...sections];
            const draggedItem = newSections[draggedSection];
            newSections.splice(draggedSection, 1);
            newSections.splice(targetIndex, 0, draggedItem);

            // Update form data with reordered sections
            handlers.handleInputChange({
                target: { name: "sections", value: newSections },
            });
        }
        setDraggedSection(null);
    };

    /**
     * Handle question group drag start
     */
    const handleQuestionGroupDragStart = (e, sectionIndex, groupIndex) => {
        setDraggedQuestionGroup({ sectionIndex, groupIndex });
        e.dataTransfer.effectAllowed = "move";
    };

    /**
     * Handle question group drop
     */
    const handleQuestionGroupDrop = (e, targetSectionIndex, targetGroupIndex) => {
        e.preventDefault();
        if (draggedQuestionGroup && (draggedQuestionGroup.sectionIndex !== targetSectionIndex || draggedQuestionGroup.groupIndex !== targetGroupIndex)) {
            const newSections = [...sections];
            const sourceSection = newSections[draggedQuestionGroup.sectionIndex];
            const targetSection = newSections[targetSectionIndex];

            // Remove from source
            const draggedGroup = sourceSection.questionGroups[draggedQuestionGroup.groupIndex];
            sourceSection.questionGroups.splice(draggedQuestionGroup.groupIndex, 1);

            // Add to target
            targetSection.questionGroups.splice(targetGroupIndex, 0, draggedGroup);

            handlers.handleInputChange({
                target: { name: "sections", value: newSections },
            });
        }
        setDraggedQuestionGroup(null);
    };

    return (
        <FormSection
            id="sections"
            title="Exam Pattern Sections"
            icon={<Layers className="h-5 w-5" />}
            description="Configure the different sections of your exam with drag-and-drop reordering"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Information Banner */}
                <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
                    <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        <span>Add multiple sections to your exam. Drag sections to reorder them. Each section can have its own settings and question groups.</span>
                    </p>
                </div>

                <div className="space-y-4">
                    {sections.map((section, sectionIndex) => (
                        <motion.div
                            key={section.sectionId || sectionIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 ${draggedSection === sectionIndex ? "opacity-50" : ""}`}
                            draggable
                            onDragStart={(e) => handleSectionDragStart(e, sectionIndex)}
                            onDragOver={handleSectionDragOver}
                            onDrop={(e) => handleSectionDrop(e, sectionIndex)}
                        >
                            {/* Section Header */}
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    {/* Drag Handle */}
                                    <div className="cursor-move mr-3 text-gray-400 hover:text-gray-600">
                                        <GripVertical className="h-5 w-5" />
                                    </div>

                                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full mr-3">
                                        <Layers className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">{section.name || `Section ${sectionIndex + 1}`}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {section.questionsCount || 0} questions • {section.questionsToAttempt || 0} to attempt
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {/* Move Up/Down Buttons */}
                                    <Button variant="ghost" size="icon" onClick={() => moveSectionUp && moveSectionUp(sectionIndex)} disabled={sectionIndex === 0} className="h-8 w-8 rounded-full">
                                        <ArrowUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => moveSectionDown && moveSectionDown(sectionIndex)}
                                        disabled={sectionIndex === sections.length - 1}
                                        className="h-8 w-8 rounded-full"
                                    >
                                        <ArrowDown className="h-4 w-4" />
                                    </Button>

                                    <Button variant="ghost" size="icon" onClick={() => duplicateSection(sectionIndex)} className="h-8 w-8 rounded-full">
                                        <Copy className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeSection(sectionIndex)}
                                        className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>

                                    <Button variant="ghost" size="icon" onClick={() => toggleSectionExpand(section.sectionId)} className="h-8 w-8 rounded-full">
                                        {expandedSections[section.sectionId] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            {/* Section Content */}
                            {expandedSections[section.sectionId] && (
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                    {/* Basic Section Information */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <Input
                                            label="Section Name"
                                            id={`section-${sectionIndex}-name`}
                                            name="name"
                                            value={section.name || ""}
                                            onChange={(e) => handleSectionChange(sectionIndex, "name", e.target.value)}
                                            placeholder="Enter section name"
                                        />

                                        <Input
                                            label="Section Code"
                                            id={`section-${sectionIndex}-sectionId`}
                                            name="sectionId"
                                            value={section.sectionId || ""}
                                            onChange={(e) => handleSectionChange(sectionIndex, "sectionId", e.target.value)}
                                            placeholder="Enter section code"
                                        />
                                    </div>

                                    {/* Question Configuration */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <Input
                                            label="Total Questions"
                                            id={`section-${sectionIndex}-questionsCount`}
                                            name="questionsCount"
                                            type="number"
                                            min="1"
                                            value={section.questionsCount || ""}
                                            onChange={(e) => handleSectionChange(sectionIndex, "questionsCount", Number.parseInt(e.target.value, 10))}
                                            placeholder="Enter total questions"
                                        />

                                        <Input
                                            label="Questions to Attempt"
                                            id={`section-${sectionIndex}-questionsToAttempt`}
                                            name="questionsToAttempt"
                                            type="number"
                                            min="1"
                                            value={section.questionsToAttempt || ""}
                                            onChange={(e) => handleSectionChange(sectionIndex, "questionsToAttempt", Number.parseInt(e.target.value, 10))}
                                            placeholder="Enter questions to attempt"
                                        />
                                    </div>

                                    {/* Additional Configuration */}
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <Select
                                            label="Subject Tag"
                                            id={`section-${sectionIndex}-subjectTag`}
                                            name="subjectTag"
                                            value={section.subjectTag || ""}
                                            onChange={(e) => handleSectionChange(sectionIndex, "subjectTag", e.target.value)}
                                            placeholder="Enter subject tag"
                                            options={[{ label: "example tag", value: "Example Tag" }]}
                                            isMulti
                                        />

                                        <Input
                                            label="Section Time Limit (minutes)"
                                            id={`section-${sectionIndex}-sectionTimeLimit`}
                                            name="sectionTimeLimit"
                                            type="number"
                                            min="1"
                                            value={section.sectionTimeLimit || ""}
                                            onChange={(e) => handleSectionChange(sectionIndex, "sectionTimeLimit", e.target.value ? Number.parseInt(e.target.value, 10) : null)}
                                            placeholder="Enter time limit (optional)"
                                        />

                                        <Input
                                            label="Passing Marks"
                                            labelIcon={<Award className="h-3.5 w-3.5" />}
                                            id={`section-${sectionIndex}-passingMarks`}
                                            name="passingMarks"
                                            type="number"
                                            min="0"
                                            value={section.passingMarks || ""}
                                            onChange={(e) => handleSectionChange(sectionIndex, "passingMarks", e.target.value ? Number.parseInt(e.target.value, 10) : null)}
                                            placeholder="Enter passing marks"
                                            helperText="Minimum marks required to pass this section"
                                        />
                                    </div>

                                    {/* Section Settings */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                                            <div className="space-y-0.5">
                                                <Label className="text-base">Compulsory Section</Label>
                                                <p className="text-sm text-muted-foreground">Students must attempt this section</p>
                                            </div>
                                            <Switch checked={section.isCompulsory || false} onCheckedChange={(checked) => handleSectionChange(sectionIndex, "isCompulsory", checked)} />
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                                            <div className="space-y-0.5">
                                                <Label className="text-base">Shuffle Questions</Label>
                                                <p className="text-sm text-muted-foreground">Randomize the order of questions in this section</p>
                                            </div>
                                            <Switch checked={section.shuffleQuestions || false} onCheckedChange={(checked) => handleSectionChange(sectionIndex, "shuffleQuestions", checked)} />
                                        </div>
                                    </div>

                                    {/* Question Groups Management */}
                                    <div className="mt-6">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                                            <Shuffle className="h-4 w-4 mr-2 text-blue-600" />
                                            Question Groups
                                        </h4>

                                        <Accordion type="multiple" className="w-full">
                                            {section.questionGroups?.map((group, groupIndex) => (
                                                <AccordionItem
                                                    key={groupIndex}
                                                    value={`section-${sectionIndex}-group-${groupIndex}`}
                                                    className={`border border-gray-200 dark:border-gray-700 rounded-md mb-3 overflow-hidden ${
                                                        draggedQuestionGroup?.sectionIndex === sectionIndex && draggedQuestionGroup?.groupIndex === groupIndex ? "opacity-50" : ""
                                                    }`}
                                                    draggable
                                                    onDragStart={(e) => handleQuestionGroupDragStart(e, sectionIndex, groupIndex)}
                                                    onDragOver={handleSectionDragOver}
                                                    onDrop={(e) => handleQuestionGroupDrop(e, sectionIndex, groupIndex)}
                                                >
                                                    <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                                        <div className="flex items-center w-full">
                                                            <GripVertical className="h-4 w-4 mr-2 text-gray-400 cursor-move" />
                                                            <div className="flex items-center justify-between w-full">
                                                                <span className="font-medium">
                                                                    Questions {group.range?.[0] || "?"} - {group.range?.[1] || "?"}
                                                                </span>
                                                                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                                                                    {group.questionType || "MCQ"} • {group.marksPerQuestion || 0} marks
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                                                        <QuestionGroupForm
                                                            group={group}
                                                            onChange={(field, value) => handleQuestionGroupChange(sectionIndex, groupIndex, field, value)}
                                                            onRemove={() => removeQuestionGroup(sectionIndex, groupIndex)}
                                                            onMoveUp={() => moveQuestionGroupUp && moveQuestionGroupUp(sectionIndex, groupIndex)}
                                                            onMoveDown={() => moveQuestionGroupDown && moveQuestionGroupDown(sectionIndex, groupIndex)}
                                                            canMoveUp={groupIndex > 0}
                                                            canMoveDown={groupIndex < (section.questionGroups?.length || 0) - 1}
                                                        />
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>

                                        <Button
                                            variant="outline"
                                            onClick={() => addQuestionGroup(sectionIndex)}
                                            className="mt-3 w-full bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Question Group
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* Empty State */}
                    {sections.length === 0 && (
                        <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                            <Layers className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                            <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">No Sections Added</h3>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">Add your first exam section to get started</p>
                        </div>
                    )}

                    {/* Add Section Button */}
                    <Button
                        variant="outline"
                        onClick={() =>
                            addSection({
                                sectionId: `S${sections.length + 1}`,
                                name: `Section ${sections.length + 1}`,
                                isCompulsory: true,
                                questionsCount: 10,
                                questionsToAttempt: 10,
                                shuffleQuestions: true,
                                passingMarks: 40,
                                questionGroups: [
                                    {
                                        range: [1, 10],
                                        marksPerQuestion: 1,
                                        negativeMarks: 0.33,
                                        questionType: "MCQ",
                                    },
                                ],
                                subjectTag: "",
                                sectionTimeLimit: null,
                            })
                        }
                        className="mt-4 w-full bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                    </Button>
                </div>
            </div>
        </FormSection>
    );
});
