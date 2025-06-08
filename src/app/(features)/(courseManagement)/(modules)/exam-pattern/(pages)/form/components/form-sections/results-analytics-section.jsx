"use client";

import { memo } from "react";
import { BarChart3, Eye, TrendingUp, Award } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export const ResultsAnalyticsSection = memo(function ResultsAnalyticsSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleResultsSettingsChange } = handlers;

    const resultsSettings = formData.resultsSettings || {
        showResultsImmediately: false,
        showCorrectAnswers: false,
        showDetailedAnalysis: true,
        enableResultsDownload: true,
        showRanking: false,
        showPerformanceAnalytics: true,
        enableCertificateGeneration: false,
        passingPercentage: 60,
        showSectionWiseResults: true,
        enableResultsEmail: false,
        resultVisibilityDelay: 0,
        enableComparisonAnalytics: false,
    };

    return (
        <FormSection
            id="results-analytics"
            title="Results & Analytics"
            icon={<BarChart3 className="h-5 w-5" />}
            description="Configure how results are displayed and analyzed"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        Result Display Settings
                    </h4>

                    <div className="grid grid-cols-1 gap-4 pl-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Show Results Immediately</Label>
                                <p className="text-sm text-muted-foreground">Display results as soon as exam is submitted</p>
                            </div>
                            <Switch checked={resultsSettings.showResultsImmediately || false} onCheckedChange={(checked) => handleResultsSettingsChange("showResultsImmediately", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Show Correct Answers</Label>
                                <p className="text-sm text-muted-foreground">Display correct answers in results</p>
                            </div>
                            <Switch checked={resultsSettings.showCorrectAnswers || false} onCheckedChange={(checked) => handleResultsSettingsChange("showCorrectAnswers", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Show Detailed Analysis</Label>
                                <p className="text-sm text-muted-foreground">Include question-wise performance breakdown</p>
                            </div>
                            <Switch checked={resultsSettings.showDetailedAnalysis || false} onCheckedChange={(checked) => handleResultsSettingsChange("showDetailedAnalysis", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Show Section-wise Results</Label>
                                <p className="text-sm text-muted-foreground">Display performance by exam sections</p>
                            </div>
                            <Switch checked={resultsSettings.showSectionWiseResults || false} onCheckedChange={(checked) => handleResultsSettingsChange("showSectionWiseResults", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Show Ranking</Label>
                                <p className="text-sm text-muted-foreground">Display student rank among all participants</p>
                            </div>
                            <Switch checked={resultsSettings.showRanking || false} onCheckedChange={(checked) => handleResultsSettingsChange("showRanking", checked)} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <Input
                        label="Passing Percentage"
                        labelIcon={<Award className="h-3.5 w-3.5" />}
                        id="passingPercentage"
                        name="passingPercentage"
                        type="number"
                        min="0"
                        max="100"
                        value={resultsSettings.passingPercentage || ""}
                        onChange={(e) => handleResultsSettingsChange("passingPercentage", Number.parseInt(e.target.value, 10))}
                        placeholder="Enter passing percentage"
                        helperText="Minimum percentage to pass"
                    />

                    <Input
                        label="Result Visibility Delay (hours)"
                        id="resultVisibilityDelay"
                        name="resultVisibilityDelay"
                        type="number"
                        min="0"
                        value={resultsSettings.resultVisibilityDelay || ""}
                        onChange={(e) => handleResultsSettingsChange("resultVisibilityDelay", Number.parseInt(e.target.value, 10))}
                        placeholder="Enter delay in hours"
                        helperText="Delay before results are visible"
                    />
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics & Features
                    </h4>

                    <div className="grid grid-cols-1 gap-4 pl-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Enable Performance Analytics</Label>
                                <p className="text-sm text-muted-foreground">Generate detailed performance insights</p>
                            </div>
                            <Switch checked={resultsSettings.showPerformanceAnalytics || false} onCheckedChange={(checked) => handleResultsSettingsChange("showPerformanceAnalytics", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Enable Results Download</Label>
                                <p className="text-sm text-muted-foreground">Allow students to download their results</p>
                            </div>
                            <Switch checked={resultsSettings.enableResultsDownload || false} onCheckedChange={(checked) => handleResultsSettingsChange("enableResultsDownload", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Enable Certificate Generation</Label>
                                <p className="text-sm text-muted-foreground">Generate certificates for passing students</p>
                            </div>
                            <Switch checked={resultsSettings.enableCertificateGeneration || false} onCheckedChange={(checked) => handleResultsSettingsChange("enableCertificateGeneration", checked)} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Enable Results Email</Label>
                                <p className="text-sm text-muted-foreground">Send results via email to students</p>
                            </div>
                            <Switch checked={resultsSettings.enableResultsEmail || false} onCheckedChange={(checked) => handleResultsSettingsChange("enableResultsEmail", checked)} />
                        </div>
                    </div>
                </div>
            </div>
        </FormSection>
    );
});
