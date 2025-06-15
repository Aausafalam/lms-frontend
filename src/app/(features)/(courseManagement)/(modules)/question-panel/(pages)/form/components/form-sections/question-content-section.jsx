"use client";

import { memo, useState } from "react";
import { ImageIcon, FileText, Plus, Trash2, Check, Video } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import FileUploadField from "@/components/ui/file";
import { useQueryParams } from "@/lib/hooks/useQuery";

export const QuestionContentSection = memo(function QuestionContentSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleInputChange, handleOptionsChange } = handlers;

    const addOption = () => {
        const currentOptions = formData.options || [];
        const newOptionId = String.fromCharCode(97 + currentOptions.length); // a, b, c, d, etc.
        const newOption = { id: newOptionId, text: "", isCorrect: false };
        handleOptionsChange([...currentOptions, newOption]);
    };

    const removeOption = (optionId) => {
        const currentOptions = formData.options || [];
        const updatedOptions = currentOptions.filter((option) => option.id !== optionId);
        handleOptionsChange(updatedOptions);
    };

    const updateOption = (optionId, field, value) => {
        const currentOptions = formData.options || [];
        const updatedOptions = currentOptions.map((option) => (option.id === optionId ? { ...option, [field]: value } : option));
        handleOptionsChange(updatedOptions);
    };

    const setCorrectOption = (optionId) => {
        const currentOptions = formData.options || [];
        const updatedOptions = currentOptions.map((option) => ({
            ...option,
            isCorrect: option.id === optionId,
        }));
        handleOptionsChange(updatedOptions);
    };

    const renderQuestionTypeSpecificFields = () => {
        switch (formData.type) {
            case "MCQ":
            case "MULTI_SELECT":
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Answer Options</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addOption} className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Add Option
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {(formData.options || []).map((option, index) => (
                                <Card key={option.id} className="p-3">
                                    <div className="flex  gap-3">
                                        <div className="flex items-center gap-2 mb-auto">
                                            <span className="text-sm font-medium w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">{option.id.toUpperCase()}</span>
                                            {formData.type === "MCQ" ? (
                                                <Button type="button" variant={option.isCorrect ? "default" : "outline"} size="sm" onClick={() => setCorrectOption(option.id)} className="h-8 w-8 p-0">
                                                    {option.isCorrect && <Check className="h-4 w-4" />}
                                                </Button>
                                            ) : (
                                                <Switch checked={option.isCorrect} onCheckedChange={(checked) => updateOption(option.id, "isCorrect", checked)} />
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <Input
                                                placeholder={`Option ${option.id.toUpperCase()}`}
                                                value={option.text}
                                                onChange={(e) => updateOption(option.id, "text", e.target.value)}
                                                className="flex-1"
                                            />

                                            <FileUploadField
                                                labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
                                                label=""
                                                value={option.image || ""}
                                                onChange={(e) => updateOption(option.id, "image", e.target.value)}
                                                name="image"
                                                helperText="Smaller image for option"
                                                uploadPath={`/question/upload`}
                                                acceptedFormats={["png", "jpg", "jpeg"]}
                                            />
                                        </div>

                                        {(formData.options || []).length > 2 && (
                                            <Button type="button" variant="outline" size="sm" onClick={() => removeOption(option.id)} className="text-red-500 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case "TRUE_FALSE":
                return (
                    <div className="space-y-4">
                        <Label className="text-sm font-medium">Correct Answer</Label>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant={formData.answer?.value === true ? "default" : "outline"}
                                onClick={() => handleInputChange({ target: { name: "answer", value: { value: true } } })}
                            >
                                True
                            </Button>
                            <Button
                                type="button"
                                variant={formData.answer?.value === false ? "default" : "outline"}
                                onClick={() => handleInputChange({ target: { name: "answer", value: { value: false } } })}
                            >
                                False
                            </Button>
                        </div>
                    </div>
                );

            case "FILL_BLANKS":
                return (
                    <div className="space-y-4">
                        <Input
                            label="Correct Answer"
                            placeholder="Enter the correct answer"
                            value={formData.answer?.text || ""}
                            onChange={(e) => handleInputChange({ target: { name: "answer", value: { text: e.target.value } } })}
                            helperText="The correct answer for the blank"
                        />
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.answer?.caseSensitive || false}
                                onCheckedChange={(checked) =>
                                    handleInputChange({
                                        target: {
                                            name: "answer",
                                            value: { ...formData.answer, caseSensitive: checked },
                                        },
                                    })
                                }
                            />
                            <Label className="text-sm">Case Sensitive</Label>
                        </div>
                    </div>
                );

            case "NUMERIC":
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Correct Answer"
                                type="number"
                                placeholder="Enter numeric answer"
                                value={formData.answer?.value || ""}
                                onChange={(e) => handleInputChange({ target: { name: "answer", value: { value: Number.parseFloat(e.target.value) } } })}
                                helperText="The correct numeric answer"
                            />
                            <Input
                                label="Tolerance (±)"
                                type="number"
                                step="0.01"
                                placeholder="0.01"
                                value={formData.answer?.tolerance || ""}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: "answer",
                                            value: { ...formData.answer, tolerance: Number.parseFloat(e.target.value) },
                                        },
                                    })
                                }
                                helperText="Acceptable margin of error"
                            />
                        </div>
                    </div>
                );

            case "ESSAY":
                return (
                    <div className="space-y-4">
                        <Textarea
                            label="Sample Answer / Rubric"
                            placeholder="Provide a sample answer or grading rubric..."
                            value={formData.answer?.sampleAnswer || ""}
                            onChange={(e) =>
                                handleInputChange({
                                    target: {
                                        name: "answer",
                                        value: { sampleAnswer: e.target.value },
                                    },
                                })
                            }
                            rows={6}
                            helperText="This will help in manual grading"
                        />
                        <Input
                            label="Maximum Words"
                            type="number"
                            placeholder="500"
                            value={formData.answer?.maxWords || ""}
                            onChange={(e) =>
                                handleInputChange({
                                    target: {
                                        name: "answer",
                                        value: { ...formData.answer, maxWords: Number.parseInt(e.target.value) },
                                    },
                                })
                            }
                            helperText="Maximum word limit for the answer"
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <FormSection
            id="question-content"
            title="Question Content & Options"
            icon={<FileText className="h-5 w-5" />}
            description="Configure the question content and answer options"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Image Upload */}
                <FileUploadField
                    labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
                    label="Question Image (Optional)"
                    value={formData.image || ""}
                    onChange={handleInputChange}
                    name="image"
                    helperText="Smaller image for Question (recommended: 800x600px)"
                    uploadPath={`/question/image/upload`}
                    acceptedFormats={["png", "jpg", "jpeg"]}
                />

                {/* Question Type Specific Fields */}
                {renderQuestionTypeSpecificFields()}

                {/* Explanation */}
                <Textarea
                    label="Explanation Text"
                    labelIcon={<FileText className="h-3.5 w-3.5" />}
                    id="explanation.text"
                    name="explanation.text"
                    placeholder="Provide an explanation for the correct answer..."
                    value={formData.explanation?.text || ""}
                    onChange={handleInputChange}
                    helperText="This explanation will be shown to students after they answer"
                    className="mb-0"
                    rows={4}
                />
                {/* Additional Image Upload for Explanation */}
                <FileUploadField
                    labelIcon={<Video className="h-3.5 w-3.5" />}
                    label="Explanation Video (Optional)"
                    value={formData.explanation?.video || ""}
                    onChange={handleInputChange}
                    name="explanation.image"
                    helperText="Smaller image for Question (recommended: 800x600px)"
                    uploadPath={`/question/image/upload`}
                    acceptedFormats={["png", "jpg", "jpeg"]}
                />
            </div>
        </FormSection>
    );
});
