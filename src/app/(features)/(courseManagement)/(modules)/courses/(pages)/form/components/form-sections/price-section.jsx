"use client"

import { memo } from "react"
import { DollarSign, Calendar, Tag, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FormSection } from "./form-section"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const PriceSection = memo(function PriceSection({
  handlers = {},
  formData = { price: {} },
  sectionRef,
  isActive,
}) {
  const { handlePriceChange } = handlers

  // Default empty price object to prevent errors
  const price = formData.price || {}

  // Calculate discount percentage if both prices are provided
  const calculateDiscount = () => {
    const regular = Number.parseFloat(price.regularPrice || 0)
    const sale = Number.parseFloat(price.salePrice || 0)

    if (regular > 0 && sale > 0 && sale < regular) {
      const discount = ((regular - sale) / regular) * 100
      return discount.toFixed(0)
    }
    return ""
  }

  // Check if sale price is higher than regular price
  const isSalePriceHigher = Number.parseFloat(price.salePrice || 0) > Number.parseFloat(price.regularPrice || 0)

  return (
    <FormSection
      id="price"
      title="Course Pricing"
      icon={<DollarSign className="h-5 w-5" />}
      description="Set your course pricing and promotional details"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Regular Price */}
          <Input
            label="Regular Price"
            labelIcon={<DollarSign className="h-3.5 w-3.5" />}
            id="price.regularPrice"
            name="price.regularPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="99.99"
            value={price.regularPrice || ""}
            onChange={(e) => handlePriceChange("regularPrice", e.target.value)}
            helperText="The standard price of your course"
          />

          {/* Sale Price */}
          <Input
            label="Sale Price"
            labelIcon={<Tag className="h-3.5 w-3.5" />}
            id="price.salePrice"
            name="price.salePrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="79.99"
            value={price.salePrice || ""}
            onChange={(e) => handlePriceChange("salePrice", e.target.value)}
            helperText="Optional promotional price"
          />
        </div>

        {/* Warning if sale price is higher than regular price */}
        {isSalePriceHigher && (
          <Alert
            variant="destructive"
            className="bg-red-50 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Sale price should be lower than the regular price.</AlertDescription>
          </Alert>
        )}

        {/* Discount percentage - calculated automatically */}
        <Input
          label="Discount Percentage"
          labelIcon={<Tag className="h-3.5 w-3.5" />}
          id="price.discountPercentage"
          name="price.discountPercentage"
          type="number"
          min="0"
          max="100"
          placeholder="20"
          value={price.discountPercentage || calculateDiscount()}
          onChange={(e) => handlePriceChange("discountPercentage", e.target.value)}
          helperText="Automatically calculated from regular and sale prices"
          disabled={true}
          className="max-w-36"
        />

        {/* Sale End Date */}
        <Input
          label="Sale End Date"
          labelIcon={<Calendar className="h-3.5 w-3.5" />}
          id="price.saleEndDate"
          name="price.saleEndDate"
          type="date"
          value={price.saleEndDate || ""}
          onChange={(e) => handlePriceChange("saleEndDate", e.target.value)}
          helperText="When the promotional price ends"
        />

        {/* Sale Ends Text */}
        <Textarea
          label="Sale Promotion Text"
          labelIcon={<Tag className="h-3.5 w-3.5" />}
          id="price.saleEndsText"
          name="price.saleEndsText"
          placeholder="Limited time offer!"
          value={price.saleEndsText || ""}
          onChange={(e) => handlePriceChange("saleEndsText", e.target.value)}
          helperText="Text to display with the sale countdown"
          rows={2}
        />
      </div>
    </FormSection>
  )
})
