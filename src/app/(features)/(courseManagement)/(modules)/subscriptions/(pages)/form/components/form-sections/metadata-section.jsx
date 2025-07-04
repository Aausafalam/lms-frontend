"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Tag, Award, Plus, X, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormSection } from "@/components/formSection";

export const MetadataSection = memo(function MetadataSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleInputChange, handleSwitchChange, handleTagChange, addTag, removeTag, handlePromoChange, addPromo, removePromo } = handlers;

    const listItemAnimation = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    };

    const tags = Array.isArray(formData.metadata?.tags) ? formData.metadata.tags : [];
    const promoCodes = Array.isArray(formData.promoCodes) ? formData.promoCodes : [];

    return (
        <FormSection
            id="metadata"
            title="Metadata & Promotions"
            icon={<Tag className="h-5 w-5" />}
            description="Configure additional metadata and promotional settings"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                    <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <Label htmlFor="metadata.isPopular" className="text-sm font-medium">
                                        Popular Plan
                                    </Label>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Highlight as most popular choice</p>
                                </div>
                            </div>
                            <Switch id="metadata.isPopular" checked={formData.metadata?.isPopular || false} onCheckedChange={(checked) => handleSwitchChange("metadata.isPopular", checked)} />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <Label htmlFor="metadata.hasCertificate" className="text-sm font-medium">
                                        Certificate Included
                                    </Label>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Include completion certificate</p>
                                </div>
                            </div>
                            <Switch
                                id="metadata.hasCertificate"
                                checked={formData.metadata?.hasCertificate || false}
                                onCheckedChange={(checked) => handleSwitchChange("metadata.hasCertificate", checked)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Badge Text"
                            labelIcon={<Award className="h-3.5 w-3.5" />}
                            id="metadata.badge"
                            name="metadata.badge"
                            placeholder="e.g., Best for Serious Learners"
                            value={formData.metadata?.badge || ""}
                            onChange={handleInputChange}
                            helperText="Optional badge text to display on the plan"
                        />
                    </div>
                </div>

                {/* Tags Section */}
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        Tags
                    </h4>
                    <div className="space-y-4">
                        {tags.map((tag, index) => (
                            <motion.div key={index} {...listItemAnimation} className="flex items-center gap-2" aria-label={`Tag ${index + 1}`}>
                                <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-medium">
                                    {index + 1}
                                </div>

                                <Input
                                    value={tag || ""}
                                    onChange={(e) => handleTagChange(index, e.target.value)}
                                    placeholder={`Tag ${index + 1} (e.g., full access, monthly)`}
                                    aria-label={`Tag ${index + 1}`}
                                />

                                {tags.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeTag(index)}
                                        className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                                        aria-label={`Remove tag ${index + 1}`}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </motion.div>
                        ))}

                        <Button
                            variant="outline"
                            onClick={addTag}
                            className="mt-2 bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30 dark:hover:bg-purple-950/30"
                            aria-label="Add tag"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Tag
                        </Button>
                    </div>
                </div>

                {/* Promo Codes Section */}
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        Promo Codes
                    </h4>
                    <div className="space-y-4">
                        {promoCodes.map((promo, index) => (
                            <motion.div key={index} {...listItemAnimation} className="flex items-center gap-2" aria-label={`Promo code ${index + 1}`}>
                                <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-medium">
                                    {index + 1}
                                </div>

                                <Input
                                    value={promo || ""}
                                    onChange={(e) => handlePromoChange(index, e.target.value)}
                                    placeholder={`Promo code ${index + 1} (e.g., SAVE20, NEWUSER)`}
                                    aria-label={`Promo code ${index + 1}`}
                                />

                                {promoCodes.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removePromo(index)}
                                        className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                                        aria-label={`Remove promo code ${index + 1}`}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </motion.div>
                        ))}

                        <Button
                            variant="outline"
                            onClick={addPromo}
                            className="mt-2 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30 dark:hover:bg-green-950/30"
                            aria-label="Add promo code"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Promo Code
                        </Button>
                    </div>
                </div>
            </div>
        </FormSection>
    );
});
