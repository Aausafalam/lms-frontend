"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionDetailsContent from "./components/content";
import QuestionDetailsHeader from "./components/header";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Question Details Page Component
 * @description Main page component for displaying question details with tabbed navigation
 */
export default function QuestionDetailsPage() {
    const { questionId } = useParams();

  

    if (!questionId) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Question ID is required</p>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="transition-colors duration-300">
                <QuestionDetailsHeader questionId={questionId} />

              

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                        <QuestionDetailsContent />
                    </div>
                </div>

              
            </div>
        </ErrorBoundary>
    );
}
