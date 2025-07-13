"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Calculator, FileText, Info } from "lucide-react";
import CompactTimer from "./CompactTimer";

/**
 * ExamHeader Component
 *
 * Displays the exam header with title, navigation, and tool toggles.
 * Includes section navigation and quick statistics display.
 *
 * Features:
 * - Exam information display
 * - Section-based navigation
 * - Tool toggles (calculator, scratchpad, question paper)
 * - Progress statistics
 * - Theme toggle
 * - Responsive design
 */
export default function ExamHeader({
    exam,
    currentSection,
    onSectionChange,
    showCalculator,
    showScratchpad,
    showQuestionPaper,
    onToggleCalculator,
    onToggleScratchpad,
    onToggleQuestionPaper,
    timeLeft,
    setShowInstructions,
}) {
    return (
        <div className="bg-white/90 dark:bg-gray-800/90  border-b sticky top-0 z-40">
            <div className="mx-auto px-6 py-4">
                {/* Top Row - Exam Info and Tools */}
                <div className="flex items-center justify-between mb-4">
                    {/* Exam Information */}
                    <div className="flex items-center gap-4">
                        {/* <div className="p-3 bg-orange-600/20  rounded-xl shadow-sm">
                            <Brain className="w-6 h-6 text-orange-500" />
                        </div> */}
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{exam.title}</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                {exam.course} • {exam.instructor}
                            </p>
                        </div>
                    </div>

                    {/* Tool Toggles */}
                    <div className="flex items-center ">
                        {/* Question Paper Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleQuestionPaper}
                            className={`rounded-lg ${showQuestionPaper ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600" : ""}`}
                            title="Question Paper"
                        >
                            <FileText className="w-4 h-4" /> Question Paper
                        </Button>

                        {/* Calculator Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleCalculator}
                            className={`rounded-lg ${showCalculator ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : ""}`}
                            title="Calculator"
                        >
                            <Calculator className="w-4 h-4" /> Calculator
                        </Button>

                        {/* Scratchpad Toggle */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleScratchpad}
                            className={`rounded-lg ${showScratchpad ? "bg-green-50 dark:bg-green-900/20 text-green-600" : ""}`}
                            title="Scratchpad"
                        >
                            <FileText className="w-4 h-4" /> Scratchpad
                        </Button>
                        {/* Scratchpad Toggle */}
                        <Button variant="ghost" size="sm" onClick={() => setShowInstructions((prev) => !prev)} className={`rounded-lg`} title="Instructions">
                            <Info className="w-4 h-4" /> Instructions
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    {/* Sections Navigation */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {exam.sections.map((section, index) => {
                            const IconComponent = section.icon;
                            const isActive = section.id === currentSection;

                            return (
                                <Button
                                    key={section.id}
                                    variant="ghost"
                                    onClick={() => onSectionChange(section.id)}
                                    className={`flex items-center gap-3 px-3  h-fit rounded-xl transition-all duration-300 min-w-fit ${
                                        isActive
                                            ? "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-200 dark:border-orange-800 shadow-lg"
                                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    }`}
                                >
                                    {/* Section Icon */}
                                    <div className={`p-2 rounded-lg bg-orange-200/30 shadow-sm`}>
                                        <IconComponent className="w-4 h-4 text-orange-500" />
                                    </div>

                                    {/* Section Info */}
                                    <div className="text-left">
                                        <div className="font-semibold text-sm text-gray-900 dark:text-white">{section.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{section.questions} questions</div>
                                    </div>

                                    {/* Active Badge */}
                                    {isActive && <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs">Active</Badge>}
                                </Button>
                            );
                        })}
                    </div>
                    {/* Compact Timer */}
                    <CompactTimer timeLeft={timeLeft} />
                </div>
            </div>
        </div>
    );
}
