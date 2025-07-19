"use client";

import { Tag, Target, Eye, EyeOff, Award, BarChart3, Users, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuestionSidebar({ data, isMobile }) {
    return (
        <div className={`space-y-${isMobile ? "4" : "6"}`}>
            {/* Tags Card */}
            {data.tags && data.tags.length > 0 && (
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardHeader className={isMobile ? "pb-2" : "pb-3"}>
                        <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-sm" : "text-base"}`}>
                            <div className={`${isMobile ? "p-1" : "p-2"} rounded-lg bg-orange-100 dark:bg-orange-900`}>
                                <Tag className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-orange-600 dark:text-orange-400`} />
                            </div>
                            <span className="text-orange-800 dark:text-orange-200">Tags</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1">
                            {data.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className={`${
                                        isMobile ? "text-xs px-2 py-0.5" : "text-xs px-2 py-1"
                                    } capitalize bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800`}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Settings Card */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className={isMobile ? "pb-2" : "pb-3"}>
                    <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-sm" : "text-base"}`}>
                        <div className={`${isMobile ? "p-1" : "p-2"} rounded-lg bg-purple-100 dark:bg-purple-900`}>
                            <Target className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-purple-600 dark:text-purple-400`} />
                        </div>
                        <span className="text-purple-800 dark:text-purple-200">Settings</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className={`pt-0 space-y-${isMobile ? "2" : "3"}`}>
                    <div className={`${isMobile ? "p-2" : "p-3"} bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700`}>
                        <div className="flex justify-between items-center">
                            <span className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600 dark:text-gray-400 flex items-center gap-1`}>
                                {data.isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                Visibility:
                            </span>
                            <Badge className={`text-xs ${data.isPublic ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}`}>
                                {data.isPublic ? "Public" : "Private"}
                            </Badge>
                        </div>
                    </div>

                    <div className={`${isMobile ? "p-2" : "p-3"} bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700`}>
                        <div className="flex justify-between items-center">
                            <span className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600 dark:text-gray-400 flex items-center gap-1`}>
                                <Award className="h-3 w-3" />
                                Partial Credit:
                            </span>
                            <Badge className={`text-xs ${data.allowPartialCredit ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"}`}>
                                {data.allowPartialCredit ? "Yes" : "No"}
                            </Badge>
                        </div>
                    </div>

                    <div className={`${isMobile ? "p-2" : "p-3"} bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700`}>
                        <div className="flex justify-between items-center">
                            <span className={`${isMobile ? "text-xs" : "text-sm"} text-gray-600 dark:text-gray-400 flex items-center gap-1`}>
                                <BarChart3 className="h-3 w-3" />
                                Status:
                            </span>
                            <Badge className={`text-xs ${data.status === "ACTIVE" ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}`}>
                                {data.status || "DRAFT"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats Card - Only show on desktop */}
            {!isMobile && (
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                                <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-blue-800 dark:text-blue-200">Quick Stats</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <Users className="h-4 w-4 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">0</div>
                                <div className="text-xs text-blue-600 dark:text-blue-400">Attempts</div>
                            </div>
                            <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                                <Award className="h-4 w-4 mx-auto mb-1 text-green-600 dark:text-green-400" />
                                <div className="text-lg font-bold text-green-700 dark:text-green-300">0%</div>
                                <div className="text-xs text-green-600 dark:text-green-400">Success</div>
                            </div>
                        </div>

                        <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800 text-center">
                            <Calendar className="h-4 w-4 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
                            <div className="text-sm font-semibold text-purple-700 dark:text-purple-300">Created Today</div>
                            <div className="text-xs text-purple-600 dark:text-purple-400">Modified: Just now</div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
