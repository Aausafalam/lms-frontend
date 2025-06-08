"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Link2, X, Plus, ExternalLink, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/formSection";

/**
 * Resources Section Component
 * Manages additional online resources and links
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Form event handlers
 * @param {Object} props.formData - Current form data with resources array
 * @param {React.RefObject} props.sectionRef - Reference for section scrolling
 * @param {boolean} props.isActive - Whether this section is currently active
 */
export const ResourcesSection = memo(function ResourcesSection({ handlers = {}, formData = { resources: [] }, sectionRef, isActive }) {
    const { handleResourceChange, removeResource, addResource } = handlers;

    // Animation configuration
    const listItemAnimation = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    };

    // Ensure resources array exists
    const resources = Array.isArray(formData.resources) ? formData.resources : [];

    return (
        <FormSection
            id="resources"
            title="Additional Resources"
            icon={<Link2 className="h-5 w-5" />}
            description="Add helpful online resources and external links for your module"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                {/* Guidance Box */}
                <div className="bg-purple-50 dark:bg-purple-950/10 rounded-lg p-4 border border-purple-100 dark:border-purple-900/20">
                    <p className="text-sm text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Add links to documentation, tutorials, tools, or other helpful resources that complement your module.</span>
                    </p>
                </div>

                {/* Resources List */}
                <div className="space-y-6">
                    {resources.map((resource, index) => (
                        <motion.div key={index} {...listItemAnimation} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                                    <ExternalLink className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                                    Resource {index + 1}
                                </h4>
                                {resources.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeResource(index)}
                                        className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                        aria-label={`Remove resource ${index + 1}`}
                                        title="Remove this resource"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {/* Title */}
                                <Input
                                    placeholder="Resource title (e.g., Official React Documentation, MDN Web Docs)"
                                    value={resource.title || ""}
                                    onChange={(e) => handleResourceChange(index, "title", e.target.value)}
                                    aria-label={`Resource ${index + 1} title`}
                                />

                                {/* URL */}
                                <Input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={resource.url || ""}
                                    onChange={(e) => handleResourceChange(index, "url", e.target.value)}
                                    aria-label={`Resource ${index + 1} URL`}
                                />
                            </div>
                        </motion.div>
                    ))}

                    {/* Empty State */}
                    {resources.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Link2 className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p>No resources added yet.</p>
                            <p className="text-sm">Add helpful links to enhance your module.</p>
                        </div>
                    )}

                    {/* Add Button */}
                    <Button
                        variant="outline"
                        onClick={addResource}
                        className="mt-2 bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30 dark:hover:bg-purple-950/30"
                        aria-label="Add resource"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Resource
                    </Button>
                </div>
            </div>
        </FormSection>
    );
});
