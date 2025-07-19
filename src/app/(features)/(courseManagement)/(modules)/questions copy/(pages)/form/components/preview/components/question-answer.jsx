"use client";

import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function QuestionAnswer({ data, isMobile }) {
    if (!data.type) return null;

    return (
        <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${isMobile ? "p-4" : "p-6"}`}>
            <div className={`flex items-center gap-2 ${isMobile ? "mb-3" : "mb-4"}`}>
                <div className={`${isMobile ? "p-1" : "p-2"} rounded-lg bg-green-100 dark:bg-green-900`}>
                    <Star className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-green-600 dark:text-green-400`} />
                </div>
                <h3 className={`font-bold text-green-800 dark:text-green-200 ${isMobile ? "text-base" : "text-lg"}`}>{data.type === "MCQ" ? "Answer Options" : "Correct Answer"}</h3>
            </div>

            {/* MCQ Options */}
            {data.type === "MCQ" && data.options && (
                <div className={`space-y-${isMobile ? "2" : "3"}`}>
                    {data.options.map((option, index) => (
                        <div
                            key={option.id}
                            className={`border rounded-lg transition-all ${
                                option.isCorrect ? "border-green-400 bg-green-50 dark:bg-green-950/20" : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
                            }`}
                        >
                            <div className={isMobile ? "p-3" : "p-4"}>
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex items-center justify-center ${isMobile ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"} rounded-full font-bold ${
                                            option.isCorrect ? "bg-green-500 text-white" : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700"
                                        }`}
                                    >
                                        {option.id.toUpperCase()}
                                    </div>
                                    <span className={`text-gray-800 dark:text-gray-200 font-medium flex-1 ${isMobile ? "text-sm" : "text-base"}`}>{option.text}</span>
                                    {option.isCorrect && (
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-green-600`} />
                                            {!isMobile && <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Correct</Badge>}
                                        </div>
                                    )}
                                </div>
                                {option.image && (
                                    <div className={`${isMobile ? "mt-2 ml-11" : "mt-3 ml-13"}`}>
                                        <img
                                            src={option.image || "/placeholder.svg?height=150&width=200"}
                                            alt={`Option ${option.id.toUpperCase()}`}
                                            className={`${isMobile ? "max-w-full" : "max-w-sm"} h-auto rounded-lg border border-gray-200 dark:border-gray-700`}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* True/False Answer */}
            {data.type === "TRUE_FALSE" && (
                <div className={`flex gap-${isMobile ? "3" : "4"} ${isMobile ? "justify-center" : ""}`}>
                    <Button
                        variant={data.answer?.value === true ? "default" : "outline"}
                        className={`pointer-events-none ${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} ${data.answer?.value === true ? "bg-green-500 hover:bg-green-600" : "opacity-60"}`}
                        size={isMobile ? "sm" : "default"}
                    >
                        True
                        {data.answer?.value === true && <CheckCircle className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} ml-1`} />}
                    </Button>
                    <Button
                        variant={data.answer?.value === false ? "default" : "outline"}
                        className={`pointer-events-none ${isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"} ${data.answer?.value === false ? "bg-green-500 hover:bg-green-600" : "opacity-60"}`}
                        size={isMobile ? "sm" : "default"}
                    >
                        False
                        {data.answer?.value === false && <CheckCircle className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} ml-1`} />}
                    </Button>
                </div>
            )}

            {/* Fill in the Blanks Answer */}
            {data.type === "FILL_BLANKS" && data.answer && (
                <div className={`${isMobile ? "p-3" : "p-4"} bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-700 rounded-lg`}>
                    <div className="flex items-center gap-3">
                        <CheckCircle className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-green-600`} />
                        <span className={`font-bold text-green-800 dark:text-green-200 ${isMobile ? "text-base" : "text-lg"}`}>{data.answer.text}</span>
                        {data.answer.caseSensitive && <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Case Sensitive</Badge>}
                    </div>
                </div>
            )}

            {/* Numeric Answer */}
            {data.type === "NUMERIC" && data.answer && (
                <div className={`${isMobile ? "p-3" : "p-4"} bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-700 rounded-lg`}>
                    <div className="flex items-center gap-3">
                        <CheckCircle className={`${isMobile ? "h-5 w-5" : "h-6 w-6"} text-green-600`} />
                        <span className={`font-bold text-green-800 dark:text-green-200 ${isMobile ? "text-base" : "text-lg"}`}>
                            {data.answer.value}
                            {data.answer.tolerance && <span className={`${isMobile ? "text-sm" : "text-base"} font-normal ml-2`}>(±{data.answer.tolerance})</span>}
                        </span>
                    </div>
                </div>
            )}

            {/* Essay Answer */}
            {data.type === "ESSAY" && data.answer && (
                <div className={`${isMobile ? "p-3" : "p-4"} bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-700 rounded-lg`}>
                    <p className={`text-blue-800 dark:text-blue-200 leading-relaxed ${isMobile ? "text-sm" : "text-base"}`}>{data.answer.sampleAnswer}</p>
                    {data.answer.maxWords && <Badge className="mt-2 bg-purple-100 text-purple-800 border-purple-200 text-xs">Max Words: {data.answer.maxWords}</Badge>}
                </div>
            )}
        </div>
    );
}
