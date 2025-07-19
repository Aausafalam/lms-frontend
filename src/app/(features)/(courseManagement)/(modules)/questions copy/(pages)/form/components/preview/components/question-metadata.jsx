"use client";

import { BookOpen, Target, Globe, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuestionMetadata({ data, isDesktop }) {
    return (
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900">
                        <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-indigo-800 dark:text-indigo-200">Question Metadata</span>
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 ml-11 text-sm">Comprehensive question information</p>
            </CardHeader>

            <CardContent className="pt-0">
                <div className={`${isDesktop ? "grid grid-cols-2 gap-6" : "space-y-4"}`}>
                    {/* Basic Information */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4 text-indigo-500" />
                            Basic Information
                        </h4>

                        <div className="space-y-3">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                                <div className="flex items-center mb-1">
                                    <Target className="h-3 w-3 mr-2 text-indigo-600 dark:text-indigo-400" />
                                    <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">Question ID</span>
                                </div>
                                <p className="font-bold text-indigo-900 dark:text-indigo-100 text-sm">{data.questionId || "Auto-generated"}</p>
                            </div>

                            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                <div className="flex items-center mb-1">
                                    <BookOpen className="h-3 w-3 mr-2 text-green-600 dark:text-green-400" />
                                    <span className="text-xs font-medium text-green-700 dark:text-green-300">Category</span>
                                </div>
                                <p className="font-bold text-green-900 dark:text-green-100 text-sm capitalize">{data.category || "Not set"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                            <Globe className="h-4 w-4 text-purple-500" />
                            Academic Details
                        </h4>

                        <div className="space-y-3">
                            <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                                <div className="flex items-center mb-1">
                                    <BookOpen className="h-3 w-3 mr-2 text-purple-600 dark:text-purple-400" />
                                    <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Subject</span>
                                </div>
                                <p className="font-bold text-purple-900 dark:text-purple-100 text-sm">{data.subject || "Not set"}</p>
                            </div>

                            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                                <div className="flex items-center mb-1">
                                    <Target className="h-3 w-3 mr-2 text-orange-600 dark:text-orange-400" />
                                    <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Topic</span>
                                </div>
                                <p className="font-bold text-orange-900 dark:text-orange-100 text-sm">{data.topic || "Not set"}</p>
                            </div>

                            <div className="p-3 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
                                <div className="flex items-center mb-1">
                                    <Globe className="h-3 w-3 mr-2 text-cyan-600 dark:text-cyan-400" />
                                    <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Language</span>
                                </div>
                                <p className="font-bold text-cyan-900 dark:text-cyan-100 text-sm uppercase">{data.language || "EN"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
