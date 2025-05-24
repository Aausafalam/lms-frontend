"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Link2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSection } from "./form-section";
import { Select } from "@/components/ui/select";

/**
 * Props for the ResourcesSection component.
 * @typedef {Object} ResourcesSectionProps
 * @property {Object} handlers - Functions for handling resource changes, addition, and removal.
 * @property {Function} handlers.handleResourceChange - Handles updates to resource fields.
 * @property {Function} handlers.addResource - Adds a new resource to the list.
 * @property {Function} handlers.removeResource - Removes a resource at a given index.
 * @property {Object} formData - Current form data containing a list of resources.
 * @property {Array<{ title: string, url: string }>} formData.resources - Array of resource objects.
 * @property {React.RefObject} sectionRef - Ref to the form section element for scroll/focus.
 * @property {boolean} isActive - Whether this section is currently active or focused.
 */

/**
 * A form section allowing users to add, edit, or remove supplementary resources (title and URL).
 * Used within a larger form for course or module creation.
 *
 * @param {ResourcesSectionProps} props
 * @returns {JSX.Element}
 */
export const ResourcesSection = memo(function ResourcesSection({ handlers, formData, sectionRef, isActive }) {
    return (
        <FormSection
            id="resources"
            title="Additional Resources"
            icon={<Link2 className="h-5 w-5" />}
            description="Provide supplementary materials for your students"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="space-y-4">
                    {/* Render each resource as a row of inputs */}
                    {formData.resources.map((resource, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-[1fr,2fr,1fr,auto] gap-4 items-start"
                        >
                            {/* Input for resource title */}
                            <Input name="title" value={resource.title} onChange={(event) => handlers.handleResourceChange(index, event)} placeholder="Resource title" />
                            {/* Input for resource URL or file path */}
                            <Input name="url" value={resource.url} onChange={(event) => handlers.handleResourceChange(index, event)} placeholder="URL or file path" />
                            <Select
                                name="type"
                                value={resource.type}
                                onChange={(event) => handlers.handleResourceChange(index, event)}
                                placeholder="type"
                                options={[
                                    { label: "Documentation", value: "Documentation" },
                                    { label: "Guide", value: "Guide" },
                                    { label: "WorkShop", value: "WorkShop" },
                                    { label: "Tool", value: "Tool" },
                                ]}
                            />
                            {/* Button to remove resource, shown only if there's more than one */}
                            {formData.resources.length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handlers.removeResource(index)}
                                    className="h-10 w-10 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </motion.div>
                    ))}
                    {/* Button to add a new resource */}
                    <Button
                        variant="outline"
                        onClick={handlers.addResource}
                        className="mt-2 bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30 dark:hover:bg-orange-950/30"
                    >
                        <Link2 className="mr-2 h-4 w-4" />
                        Add Resource
                    </Button>
                </div>
            </div>
        </FormSection>
    );
});
