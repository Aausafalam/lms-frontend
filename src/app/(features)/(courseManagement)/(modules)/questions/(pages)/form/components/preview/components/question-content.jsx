"use client";

import { Sparkles, BookOpen } from "lucide-react";
import { QuestionAnswer } from "./question-answer";

export function QuestionContent({ data, isMobile }) {
    return (
        <div className={`space-y-${isMobile ? "4" : "6"}`}>
            {/* Question Card */}
            <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${isMobile ? "p-4" : "p-6"}`}>
                {/* Question Header */}
                <div className={`flex items-center gap-2 ${isMobile ? "mb-3" : "mb-4"}`}>
                    <div className={`${isMobile ? "p-1" : "p-2"} rounded-lg bg-blue-100 dark:bg-blue-900`}>
                        <Sparkles className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-blue-600 dark:text-blue-400`} />
                    </div>
                    <h2 className={`font-bold text-gray-900 dark:text-white ${isMobile ? "text-lg" : "text-xl"}`}>Question</h2>
                </div>

                {/* Question Text */}
                <div className={isMobile ? "mb-4" : "mb-6"}>
                    <p className={`text-gray-800 dark:text-gray-200 leading-relaxed ${isMobile ? "text-sm" : "text-base"}`}>{data.text || "No question text provided"}</p>
                </div>

                {/* Question Image */}
                {data.image && (
                    <div className={isMobile ? "mb-4" : "mb-6"}>
                        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img src={data.image || "/placeholder.svg?height=200&width=400"} alt="Question illustration" className="w-full h-auto" />
                        </div>
                    </div>
                )}
            </div>

            {/* Answer Section */}
            <QuestionAnswer data={data} isMobile={isMobile} />

            {/* Explanation Section */}
            {data.explanation?.text && (
                <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${isMobile ? "p-4" : "p-6"}`}>
                    <div className={`flex items-center gap-2 ${isMobile ? "mb-3" : "mb-4"}`}>
                        <div className={`${isMobile ? "p-1" : "p-2"} rounded-lg bg-amber-100 dark:bg-amber-900`}>
                            <BookOpen className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-amber-600 dark:text-amber-400`} />
                        </div>
                        <h3 className={`font-bold text-amber-800 dark:text-amber-200 ${isMobile ? "text-base" : "text-lg"}`}>Explanation</h3>
                    </div>

                    <div className={`${isMobile ? "p-3" : "p-4"} bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800`}>
                        <p className={`text-amber-800 dark:text-amber-200 leading-relaxed ${isMobile ? "text-sm" : "text-base"}`}>{data.explanation.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
