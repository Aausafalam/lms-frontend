"use client";

import { memo, useState } from "react";
import { ImageIcon, FileText, Plus, Trash2, Check, Video, GripVertical } from "lucide-react";
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
    const [draggedIndex, setDraggedIndex] = useState(null);
    const { courseId, examId } = useQueryParams();
    const addOption = () => {
        const currentOptions = formData.options || [];
        const newOptionId = String.fromCharCode(97 + currentOptions.length); // a, b, c, d, etc.
        const newOption = { id: newOptionId, text: "", isCorrect: false };
        handleOptionsChange([...currentOptions, newOption]);
    };

    const removeOption = (optionId) => {
        const currentOptions = formData.options || [];
        const updatedOptions = currentOptions.filter((option) => option.id !== optionId);
        // Reassign IDs to maintain alphabetical order
        const reorderedOptions = updatedOptions.map((option, index) => ({
            ...option,
            id: String.fromCharCode(97 + index),
        }));
        handleOptionsChange(reorderedOptions);
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

    // Drag and Drop handlers
    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.outerHTML);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            return;
        }

        const currentOptions = [...(formData.options || [])];
        const draggedOption = currentOptions[draggedIndex];

        // Remove dragged item
        currentOptions.splice(draggedIndex, 1);

        // Insert at new position
        currentOptions.splice(dropIndex, 0, draggedOption);

        // Reassign IDs to maintain alphabetical order
        const reorderedOptions = currentOptions.map((option, index) => ({
            ...option,
            id: String.fromCharCode(97 + index),
        }));

        handleOptionsChange(reorderedOptions);

        setDraggedIndex(null);
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
                                <Card
                                    key={option.id}
                                    className={`p-3 transition-all duration-200 ${draggedIndex === index ? "opacity-50 scale-95" : "hover:shadow-md"}`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={handleDragOver}
                                    onDragEnter={handleDragEnter}
                                    onDrop={(e) => handleDrop(e, index)}
                                >
                                    <div className="flex gap-3">
                                        <div className="flex items-center gap-2 mb-auto">
                                            <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                                <GripVertical className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <span className="text-sm font-medium w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-700">
                                                {option.id.toUpperCase()}
                                            </span>
                                            {formData.type === "MCQ" ? (
                                                <Button
                                                    type="button"
                                                    variant={option.isCorrect ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setCorrectOption(option.id)}
                                                    className={`h-8 w-8 p-0 transition-all ${option.isCorrect ? "bg-green-500 hover:bg-green-600 border-green-500" : "hover:border-green-300"}`}
                                                >
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
                                                className="flex-1 border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
                                            />

                                            <FileUploadField
                                                labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
                                                label=""
                                                value={option.image || ""}
                                                onChange={(e) => updateOption(option.id, "image", e.target.value)}
                                                name="optionImage"
                                                helperText="Optional image for this option"
                                                uploadPath={`/course/${courseId}/exam/${examId}/question/option-image/upload`}
                                                acceptedFormats={["png", "jpg", "jpeg"]}
                                            />
                                        </div>

                                        {(formData.options || []).length > 2 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeOption(option.id)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 hover:border-red-300"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {(formData.options || []).length > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-2">
                                <GripVertical className="h-3 w-3" />
                                Drag options to reorder them
                            </div>
                        )}
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
                                className={formData.answer?.value === true ? "bg-green-500 hover:bg-green-600" : ""}
                            >
                                True
                            </Button>
                            <Button
                                type="button"
                                variant={formData.answer?.value === false ? "default" : "outline"}
                                onClick={() => handleInputChange({ target: { name: "answer", value: { value: false } } })}
                                className={formData.answer?.value === false ? "bg-green-500 hover:bg-green-600" : ""}
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
                            className="border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
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
                                className="border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
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
                                className="border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
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
                            className="border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
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
                            className="border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
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
                    helperText="Add an image to support your question (recommended: 800x600px)"
                    uploadPath={`/course/${courseId}/exam/${examId}/question/question-image/upload`}
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
                    className="mb-0 border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500"
                    rows={4}
                />

                {/* Additional Video Upload for Explanation */}
                <FileUploadField
                    labelIcon={<Video className="h-3.5 w-3.5" />}
                    label="Explanation Video (Optional)"
                    value={formData.explanation?.video || ""}
                    onChange={(event) => handleInputChange({ target: { name: "explanation.video", value: event.target.value } })}
                    name="explanationVideo"
                    helperText="Add a video explanation to help students understand better"
                    uploadPath={`/course/${courseId}/exam/${examId}/question/explanation-video/upload`}
                    acceptedFormats={["mp4", "webm", "ogg"]}
                />
            </div>
        </FormSection>
    );
});
