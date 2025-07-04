"use client"

import { memo } from "react"
import { DollarSign, Percent, Calendar, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { FormSection } from "@/components/formSection"

export const PricingSection = memo(function PricingSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
  const { handleInputChange } = handlers

  const currencies = [
    { label: "USD ($)", value: "USD" },
    { label: "EUR (€)", value: "EUR" },
    { label: "GBP (£)", value: "GBP" },
    { label: "INR (₹)", value: "INR" },
    { label: "CAD (C$)", value: "CAD" },
  ]

  const durationUnits = [
    { label: "Days", value: "days" },
    { label: "Weeks", value: "weeks" },
    { label: "Months", value: "months" },
    { label: "Years", value: "years" },
  ]

  const discountPercentage =
    formData.price && formData.originalPrice
      ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
      : 0

  return (
    <FormSection
      id="pricing"
      title="Pricing & Duration"
      icon={<DollarSign className="h-5 w-5" />}
      description="Set the pricing and duration details for your subscription plan"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Currency"
            labelIcon={<Globe className="h-3.5 w-3.5" />}
            name="currency"
            placeholder="Select currency"
            value={formData.currency || "USD"}
            onChange={handleInputChange}
            options={currencies}
            helperText="Choose the currency for pricing"
          />

          <Input
            label="Price"
            labelIcon={<DollarSign className="h-3.5 w-3.5" />}
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price || ""}
            onChange={handleInputChange}
            placeholder="Enter price"
            required
            helperText="The actual selling price"
            error={!formData.price || formData.price <= 0 ? "Valid price is required" : ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Original Price (Optional)"
            labelIcon={<Percent className="h-3.5 w-3.5" />}
            id="originalPrice"
            name="originalPrice"
            type="number"
            min="0"
            step="0.01"
            value={formData.originalPrice || ""}
            onChange={handleInputChange}
            placeholder="Enter original price"
            helperText="For showing discounts (leave empty if no discount)"
          />

          {discountPercentage > 0 && (
            <div className="flex items-center justify-center bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{discountPercentage}%</div>
                <div className="text-sm text-green-700 dark:text-green-300">Discount</div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Duration Value"
            labelIcon={<Calendar className="h-3.5 w-3.5" />}
            id="durationValue"
            name="durationValue"
            type="number"
            min="1"
            value={formData.durationValue || ""}
            onChange={handleInputChange}
            placeholder="Enter duration"
            required
            helperText="How long the subscription lasts"
            error={!formData.durationValue || formData.durationValue < 1 ? "Duration is required" : ""}
          />

          <Select
            label="Duration Unit"
            labelIcon={<Calendar className="h-3.5 w-3.5" />}
            name="durationUnit"
            placeholder="Select unit"
            value={formData.durationUnit || "months"}
            onChange={handleInputChange}
            options={durationUnits}
            helperText="Time unit for duration"
          />
        </div>

        {formData.planType === "one-time" && (
          <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>One-time payment:</strong> Users will have access for the specified duration after a single
              payment.
            </p>
          </div>
        )}
      </div>
    </FormSection>
  )
})
