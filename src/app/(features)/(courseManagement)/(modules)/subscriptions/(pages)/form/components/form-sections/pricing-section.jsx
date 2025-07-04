"use client";

import { memo } from "react";
import { DollarSign, Calendar, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FormSection } from "@/components/formSection";

export const PricingSection = memo(function PricingSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    const billingUnits = [
        { label: "Day", value: "DAY" },
        { label: "Month", value: "MONTH" },
        { label: "Year", value: "YEAR" },
    ];

    const discountPercentage = formData.price && formData.originalPrice ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : 0;

    return (
        <FormSection
            id="pricing"
            title="Pricing & Billing"
            icon={<DollarSign className="h-5 w-5" />}
            description="Set the pricing and billing cycle for your subscription plan"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Price (in rupees)"
                        labelIcon={<DollarSign className="h-3.5 w-3.5" />}
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        value={formData.price || ""}
                        onChange={handleInputChange}
                        placeholder="Enter price in smallest currency unit"
                        required
                        helperText="Price in paise for INR, cents for USD, etc."
                        error={!formData.price || formData.price <= 0 ? "Valid price is required" : ""}
                        className="mb-0"
                    />
                    <Input
                        label="Original Price (Optional)"
                        labelIcon={<DollarSign className="h-3.5 w-3.5" />}
                        id="originalPrice"
                        name="originalPrice"
                        type="number"
                        min="0"
                        value={formData.originalPrice || ""}
                        onChange={handleInputChange}
                        placeholder="Enter original price"
                        helperText="For showing discounts (leave empty if no discount)"
                        className="mb-0"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {discountPercentage > 0 && (
                        <div className="flex items-center justify-center bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{discountPercentage}%</div>
                                <div className="text-sm text-green-700 dark:text-green-300">Discount</div>
                            </div>
                        </div>
                    )}
                </div>

                {formData.planType !== "LIFETIME_ACCESS" && (
                    <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
                        <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-3">Billing Cycle</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Duration"
                                labelIcon={<Calendar className="h-3.5 w-3.5" />}
                                id="billingCycle.duration"
                                name="billingCycle.duration"
                                type="number"
                                min="1"
                                value={formData.billingCycle?.duration || ""}
                                onChange={handleInputChange}
                                placeholder="Enter duration"
                                required
                                helperText="Billing cycle duration"
                                error={!formData.billingCycle?.duration || formData.billingCycle?.duration < 1 ? "Duration is required" : ""}
                            />

                            <Select
                                label="Unit"
                                labelIcon={<Calendar className="h-3.5 w-3.5" />}
                                name="billingCycle.unit"
                                placeholder="Select unit"
                                value={formData.billingCycle?.unit || "MONTH"}
                                onChange={handleInputChange}
                                options={billingUnits}
                                helperText="Time unit for billing cycle"
                            />
                        </div>
                    </div>
                )}
            </div>
        </FormSection>
    );
});
