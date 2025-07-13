"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import SelectField from "@/components/ui/select";
import OptionButton from "./OptionButton";
import RichTextEditor from "./RichTextEditor";
import { BookmarkIcon, BookmarkCheck, Clock, Target, Lightbulb, Star, CheckCircle, Brain, Check, X } from "lucide-react";

export default function QuestionCard({ question, questionNumber, totalQuestions, answer, confidence, onAnswerChange, onConfidenceChange, isMarkedForReview, onMarkForReview, section }) {
    const [wordCount, setWordCount] = useState(0);
    const [matches, setMatches] = useState(answer || {});

    const handleTextChange = (text) => {
        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0);
        setWordCount(words.length);
        onAnswerChange(text);
    };

    const handleRichTextChange = (content) => {
        const textContent = content.replace(/<[^>]*>/g, "");
        const words = textContent
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0);
        setWordCount(words.length);
        onAnswerChange(content);
    };

    const handleMultiChoiceChange = (optionIndex, checked) => {
        const currentAnswers = answer || [];
        let newAnswers;

        if (checked) {
            newAnswers = [...currentAnswers, optionIndex];
        } else {
            newAnswers = currentAnswers.filter((index) => index !== optionIndex);
        }

        onAnswerChange(newAnswers);
    };

    const handleFillBlanksChange = (index, value) => {
        const currentAnswers = answer || [];
        const newAnswers = [...currentAnswers];
        newAnswers[index] = value;
        onAnswerChange(newAnswers);
    };

    const handleMatchChange = (leftIndex, rightIndex) => {
        const newMatches = { ...matches, [leftIndex]: rightIndex };
        setMatches(newMatches);
        onAnswerChange(newMatches);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "medium":
                return "bg-amber-50 text-amber-700 border-amber-200";
            case "hard":
                return "bg-rose-50 text-rose-700 border-rose-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "mcq":
            case "single-choice":
                return <Target className="w-3.5 h-3.5" />;
            case "multi-choice":
                return <CheckCircle className="w-3.5 h-3.5" />;
            case "subjective":
            case "subjective-rich":
                return <Brain className="w-3.5 h-3.5" />;
            case "true-false":
                return <Check className="w-3.5 h-3.5" />;
            case "fill-blanks":
                return <Target className="w-3.5 h-3.5" />;
            case "match-following":
                return <CheckCircle className="w-3.5 h-3.5" />;
            default:
                return <Target className="w-3.5 h-3.5" />;
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case "mcq":
                return "Multiple Choice";
            case "single-choice":
                return "Single Choice";
            case "multi-choice":
                return "Multiple Select";
            case "subjective":
                return "Short Answer";
            case "subjective-rich":
                return "Essay";
            case "true-false":
                return "True/False";
            case "fill-blanks":
                return "Fill Blanks";
            case "match-following":
                return "Match Items";
            default:
                return type.toUpperCase();
        }
    };

    const confidenceLevels = [
        { level: 1, label: "Unsure", color: "bg-rose-100 text-rose-700 border-rose-200", icon: "😰" },
        { level: 2, label: "Somewhat", color: "bg-amber-100 text-amber-700 border-amber-200", icon: "🤔" },
        { level: 3, label: "Confident", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "😊" },
        { level: 4, label: "Very Sure", color: "bg-blue-100 text-blue-700 border-blue-200", icon: "😎" },
    ];

    const SectionIcon = section?.icon;

    return (
        <Card className="w-full bg-white rounded-lg h-full">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {/* Header badges */}
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs text-slate-600 border-slate-200 font-medium">
                                Q{questionNumber}
                            </Badge>
                            <Badge className={`text-xs border ${getDifficultyColor(question.difficulty)}`}>{question.difficulty}</Badge>
                            <Badge variant="outline" className="text-xs flex items-center gap-1 text-slate-600 border-slate-200">
                                {getTypeIcon(question.type)}
                                {getTypeLabel(question.type)}
                            </Badge>
                            <div className="flex items-center gap-3 ml-auto text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                    <Target className="w-3 h-3" />
                                    <span>{question.points}pts</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{question.timeEstimate}min</span>
                                </div>
                            </div>
                        </div>

                        {/* Section */}
                        {section && SectionIcon && (
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs mb-2">
                                <SectionIcon className="w-3 h-3" />
                                <span>{section.name}</span>
                            </div>
                        )}

                        {/* Question */}
                        <CardTitle className="text-lg leading-relaxed text-slate-900 mb-2 font-medium">{question.question}</CardTitle>

                        {/* Explanation */}
                        {question.explanation && (
                            <div className="flex items-start gap-2 p-2.5 bg-blue-50/50 rounded-md mb-3">
                                <Lightbulb className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-blue-700 leading-relaxed">{question.explanation}</p>
                            </div>
                        )}

                        {/* Type hints */}
                        <div className="text-xs text-slate-500 mb-3">
                            {question.type === "multi-choice" && (
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Select multiple options</span>
                                </div>
                            )}
                            {(question.type === "subjective" || question.type === "subjective-rich") && question.maxWords && (
                                <div className="flex items-center gap-1">
                                    <Brain className="w-3 h-3" />
                                    <span>Max {question.maxWords} words</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onMarkForReview}
                        className={`ml-3 p-1.5 h-auto ${isMarkedForReview ? "text-amber-600 bg-amber-50" : "text-slate-400 hover:text-slate-600"}`}
                    >
                        {isMarkedForReview ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkIcon className="w-4 h-4" />}
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Answer Section */}
                {question.type === "subjective" ? (
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Type your answer here..."
                            value={answer || ""}
                            onChange={(e) => handleTextChange(e.target.value)}
                            className="min-h-28 resize-none border-slate-200 focus:border-slate-300 rounded-lg text-sm"
                            maxLength={question.maxWords ? question.maxWords * 6 : undefined}
                        />
                        <div className="flex justify-between items-center text-xs text-slate-500">
                            <span>{wordCount} words</span>
                            {question.maxWords && (
                                <div className="flex items-center gap-2">
                                    <span className={wordCount > question.maxWords ? "text-rose-600" : ""}>{question.maxWords} max</span>
                                    <Progress value={(wordCount / question.maxWords) * 100} className="w-16 h-1" />
                                </div>
                            )}
                        </div>
                    </div>
                ) : question.type === "subjective-rich" ? (
                    <div className="space-y-2">
                        <RichTextEditor value={answer || ""} onChange={handleRichTextChange} placeholder="Write your detailed answer..." />
                        <div className="flex justify-between items-center text-xs text-slate-500">
                            <span>{wordCount} words</span>
                            {question.maxWords && (
                                <div className="flex items-center gap-2">
                                    <span className={wordCount > question.maxWords ? "text-rose-600" : ""}>{question.maxWords} max</span>
                                    <Progress value={(wordCount / question.maxWords) * 100} className="w-16 h-1" />
                                </div>
                            )}
                        </div>
                    </div>
                ) : question.type === "true-false" ? (
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant={answer === true ? "default" : "outline"}
                            onClick={() => onAnswerChange(true)}
                            className={`h-12 text-sm font-medium rounded-lg ${
                                answer === true ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200" : "border-slate-200 hover:bg-slate-50"
                            }`}
                        >
                            <Check className="w-4 h-4 mr-2" />
                            True
                        </Button>
                        <Button
                            variant={answer === false ? "default" : "outline"}
                            onClick={() => onAnswerChange(false)}
                            className={`h-12 text-sm font-medium rounded-lg ${answer === false ? "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200" : "border-slate-200 hover:bg-slate-50"}`}
                        >
                            <X className="w-4 h-4 mr-2" />
                            False
                        </Button>
                    </div>
                ) : question.type === "fill-blanks" ? (
                    <div className="text-base leading-relaxed">
                        {question.question.split("_____").map((part, index) => (
                            <span key={index}>
                                {part}
                                {index < (question.blanks?.length || 0) && (
                                    <Input
                                        className="inline-block w-24 mx-2 text-center border-b border-slate-300 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none focus:border-slate-400 text-sm"
                                        placeholder="..."
                                        value={(answer || [])[index] || ""}
                                        onChange={(e) => handleFillBlanksChange(index, e.target.value)}
                                    />
                                )}
                            </span>
                        ))}
                    </div>
                ) : question.type === "match-following" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium mb-2 text-slate-700 text-sm">Items</h4>
                            <div className="space-y-1.5">
                                {question.leftItems?.map((item, index) => (
                                    <div key={index} className="p-2.5 bg-slate-50 rounded-md">
                                        <span className="text-sm">
                                            <span className="font-medium text-slate-600 mr-2">{String.fromCharCode(65 + index)}.</span>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2 text-slate-700 text-sm">Match With</h4>
                            <div className="space-y-1.5">
                                {question.leftItems?.map((_, leftIndex) => (
                                    <SelectField
                                        key={leftIndex}
                                        value={matches[leftIndex]?.toString() || ""}
                                        onChange={(value) => handleMatchChange(leftIndex, Number.parseInt(value))}
                                        placeholder="Select..."
                                        options={question.rightItems?.map((item, rightIndex) => ({
                                            label: item,
                                            value: rightIndex.toString(),
                                        }))}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : question.type === "multi-choice" ? (
                    <div className="space-y-2">
                        {question.options?.map((option, index) => (
                            <div key={index} className="flex items-start space-x-2.5">
                                <Checkbox id={`option-${index}`} checked={(answer || []).includes(index)} onCheckedChange={(checked) => handleMultiChoiceChange(index, checked)} className="mt-1" />
                                <label
                                    htmlFor={`option-${index}`}
                                    className={`flex-1 text-sm leading-relaxed cursor-pointer p-3 rounded-lg border transition-colors ${
                                        (answer || []).includes(index) ? "bg-slate-50 border-slate-300" : "border-slate-200 hover:bg-slate-50"
                                    }`}
                                >
                                    <span className="font-medium text-slate-600 mr-2">{String.fromCharCode(65 + index)}.</span>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {question.options?.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => onAnswerChange(index)}
                                className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                                    answer === index ? "bg-orange-400/10 border-orange-400" : "border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                <span className="font-medium text-slate-600 mr-2">{String.fromCharCode(65 + index)}.</span>
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                {/* Confidence Level */}
                {onConfidenceChange && (
                    <div className="border-t border-slate-100 pt-3 mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-sm font-medium text-slate-700">Confidence Level</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {confidenceLevels.map((level) => (
                                <Button
                                    key={level.level}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onConfidenceChange(level.level)}
                                    className={`h-8 text-xs rounded-lg border transition-colors ${confidence === level.level ? level.color : "border-slate-200 hover:bg-slate-50"}`}
                                >
                                    <span className="mr-1">{level.icon}</span>
                                    {level.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Progress */}
                <div
                    className="border-t border-slate-100 pt-3 mt-auto
"
                >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Progress</span>
                        <span>
                            {questionNumber} of {totalQuestions}
                        </span>
                    </div>
                    <Progress value={(questionNumber / totalQuestions) * 100} className="h-1.5" />
                </div>
            </CardContent>
        </Card>
    );
}
