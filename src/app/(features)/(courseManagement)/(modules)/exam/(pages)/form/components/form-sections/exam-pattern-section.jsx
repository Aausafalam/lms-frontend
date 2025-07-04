"use client";

import { memo, useState, useEffect } from "react";
import { Layers, CheckCircle, Search, Filter } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExamDetailPreview } from "../../../../../exam-pattern/(pages)/form/components/preview/exam-detail-preview";
import { sampleExamPatternData } from "@/app/(features)/(courseManagement)/(modules)/exam-pattern/(pages)/form/utils/seeds";
import ExamPatternFormBase from "@/app/(features)/(courseManagement)/(modules)/exam-pattern/(pages)/form";

export const ExamPatternSection = memo(function ExamPatternSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleExamPatternSelect, handleInputChange } = handlers;
    const [searchTerm, setSearchTerm] = useState("");
    const [availablePatterns, setAvailablePatterns] = useState([]);
    const [selectedPattern, setSelectedPattern] = useState(null);

    // Mock data for available exam patterns
    useEffect(() => {
        // In a real app, you would fetch from an API
        const mockPatterns = [
            {
                id: "1",
                name: "JEE Main Pattern",
                description: "Joint Entrance Examination Main pattern with Physics, Chemistry, and Mathematics",
                sections: 3,
                totalQuestions: 90,
                status: "ACTIVE",
                tags: ["engineering", "competitive"],
            },
            {
                id: "2",
                name: "NEET Pattern",
                description: "National Eligibility cum Entrance Test pattern for medical entrance",
                sections: 3,
                totalQuestions: 180,
                status: "ACTIVE",
                tags: ["medical", "competitive"],
            },
            {
                id: "3",
                name: "CAT Pattern",
                description: "Common Admission Test pattern for MBA entrance",
                sections: 3,
                totalQuestions: 76,
                status: "ACTIVE",
                tags: ["management", "competitive"],
            },
            {
                id: "4",
                name: "GATE Pattern",
                description: "Graduate Aptitude Test in Engineering pattern",
                sections: 2,
                totalQuestions: 65,

                status: "ACTIVE",
                tags: ["engineering", "postgraduate"],
            },
            {
                id: "5",
                name: "SSC CGL Pattern",
                description: "Staff Selection Commission Combined Graduate Level pattern",
                sections: 4,
                totalQuestions: 100,
                status: "ACTIVE",
                tags: ["government", "competitive"],
            },
            {
                id: "6",
                name: "Banking PO Pattern",
                description: "Banking Probationary Officer examination pattern",
                sections: 5,
                totalQuestions: 155,
                status: "ACTIVE",
                tags: ["banking", "finance"],
            },
        ];
        setAvailablePatterns(mockPatterns);
    }, []);

    const filteredPatterns = availablePatterns.filter(
        (pattern) => pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) || pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePatternSelect = (pattern) => {
        setSelectedPattern((prv) => (prv?.id === pattern.id ? null : pattern));
        // In a real app, you would fetch the full pattern data
        handleExamPatternSelect(sampleExamPatternData);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-100 text-green-800 border-green-200 shadow-sm";
            case "DRAFT":
                return "bg-yellow-100 text-yellow-800 border-yellow-200 shadow-sm";
            case "INACTIVE":
                return "bg-gray-100 text-gray-800 border-gray-200 shadow-sm";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200 shadow-sm";
        }
    };

    return (
        <FormSection
            id="exam-pattern"
            title="Exam Pattern Selection"
            icon={<Layers className="h-5 w-5" />}
            description="Choose an exam pattern for your exam or customize an existing one"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Input
                            className="mb-0"
                            label=""
                            labelIcon={<Search className="h-3.5 w-3.5" />}
                            placeholder="Search exam patterns..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Pattern Selection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPatterns.map((pattern) => (
                        <Card
                            key={pattern.id}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-lg shadow-md  border-2 ${
                                selectedPattern?.id === pattern.id ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20" : "border-transparent dark:border-gray-700"
                            }`}
                            onClick={() => handlePatternSelect(pattern)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{pattern.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{pattern.description}</p>
                                    </div>
                                    {selectedPattern?.id === pattern.id && <CheckCircle className="h-5 w-5 text-orange-500 flex-shrink-0 ml-2" />}
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <span>{pattern.sections} Sections</span>
                                        <span>{pattern.totalQuestions} Questions</span>
                                    </div>
                                    <Badge className={getStatusColor(pattern.status)}>{pattern.status}</Badge>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {pattern.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Selected Pattern Details */}
                {selectedPattern && formData.examPattern && (
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Selected Pattern: {selectedPattern.name}</h3>
                            <Badge className="bg-orange-100 text-orange-800 border-orange-200 shadow-sm">Selected</Badge>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-400">You can customize this pattern below. Changes will be saved with your exam.</p>
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-900">
                                <ExamPatternFormBase initialData={formData.examPattern} onExamPage={handleInputChange} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredPatterns.length === 0 && (
                    <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                        <Layers className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">No Patterns Found</h3>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your search terms</p>
                    </div>
                )}
            </div>
        </FormSection>
    );
});
