"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Plus, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/formSection";

export const FeaturesSection = memo(function FeaturesSection({ handlers = {}, formData = { features: [] }, sectionRef, isActive }) {
    const { handleFeatureChange, removeFeature, addFeature } = handlers;

    const listItemAnimation = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    };

    const features = Array.isArray(formData.features) ? formData.features : [];

    const popularFeatures = [
        "Unlimited Course Access",
        "Downloadable Resources",
        "Live Q&A Sessions",
        "Certificate of Completion",
        "Mobile App Access",
        "Offline Content",
        "Priority Support",
        "Community Access",
        "Progress Tracking",
        "Assignments & Quizzes",
    ];

    return (
        <FormSection
            id="features"
            title="Plan Features"
            icon={<Star className="h-5 w-5" />}
            description="List the key features and benefits included in this plan"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
                    <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        <span>Add compelling features that highlight the value of your subscription plan.</span>
                    </p>
                </div>

                <div className="space-y-4">
                    {features.map((feature, index) => (
                        <motion.div key={index} {...listItemAnimation} className="flex items-center gap-2" aria-label={`Feature ${index + 1}`}>
                            <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                                {index + 1}
                            </div>

                            <Input
                                value={feature || ""}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                placeholder={`Feature ${index + 1} (e.g., ${popularFeatures[index % popularFeatures.length]})`}
                                aria-label={`Feature ${index + 1}`}
                            />

                            {features.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFeature(index)}
                                    className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                                    aria-label={`Remove feature ${index + 1}`}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </motion.div>
                    ))}

                    {features.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Star className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p>No features added yet.</p>
                            <p className="text-sm">Add your first feature to get started.</p>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        onClick={addFeature}
                        className="mt-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
                        aria-label="Add feature"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                    </Button>

                    {features.length > 0 && (
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            <p className="font-medium mb-1">Popular features to consider:</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {popularFeatures.slice(0, 6).map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (!features.includes(suggestion)) {
                                                handleFeatureChange(features.length, suggestion);
                                                addFeature();
                                            }
                                        }}
                                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                                    >
                                        + {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FormSection>
    );
});
