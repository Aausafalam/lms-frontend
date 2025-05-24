"use client"
import { memo } from "react"
import { DollarSign, Tag, Clock, Calendar, Gift, Percent } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CourseFormSection } from "./course-form-section"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/**
 * CoursePricingSection - A form section component for setting course pricing options
 *
 * This component allows course creators to set pricing details including regular price,
 * sale price, subscription options, and promotional details.
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @param {Object} props.formData - Form data object containing pricing information
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @returns {JSX.Element} Rendered pricing section
 */
export const CoursePricingSection = memo(function CoursePricingSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  // Destructure handlers for better readability
  const { handleInputChange, handleSwitchChange } = handlers

  return (
    <CourseFormSection
      id="pricing"
      title="Pricing"
      icon={<DollarSign className="h-5 w-5" />}
      description="Set pricing options for your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Pricing model selection */}
        <div className="space-y-3">
          <Label className="text-base">Pricing Model</Label>
          <RadioGroup
            name="pricingModel"
            value={formData.pricingModel || "onetime"}
            onValueChange={(value) => handleInputChange({ target: { name: "pricingModel", value } })}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="onetime" id="onetime" />
              <Label htmlFor="onetime" className="font-normal">
                One-time Payment
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="subscription" id="subscription" />
              <Label htmlFor="subscription" className="font-normal">
                Subscription
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free" className="font-normal">
                Free
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Regular price field - shown for paid options */}
        {formData.pricingModel !== "free" && (
          <Input
            label="Regular Price"
            labelIcon={<DollarSign className="h-3.5 w-3.5" />}
            id="regularPrice"
            name="regularPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 49.99"
            value={formData.regularPrice || ""}
            onChange={handleInputChange}
            required
            className="max-w-xs"
          />
        )}

        {/* Subscription details - shown only for subscription model */}
        {formData.pricingModel === "subscription" && (
          <div className="space-y-4">
            <Input
              label="Billing Interval"
              labelIcon={<Calendar className="h-3.5 w-3.5" />}
              id="billingInterval"
              name="billingInterval"
              placeholder="e.g. monthly, yearly"
              value={formData.billingInterval || ""}
              onChange={handleInputChange}
              className="max-w-xs"
            />

            <div className="flex items-center space-x-2">
              <Switch
                id="trialPeriod"
                name="trialPeriod"
                checked={formData.trialPeriod || false}
                onCheckedChange={(checked) => handleSwitchChange("trialPeriod", checked)}
              />
              <Label htmlFor="trialPeriod">Offer Trial Period</Label>
            </div>

            {formData.trialPeriod && (
              <Input
                label="Trial Days"
                labelIcon={<Clock className="h-3.5 w-3.5" />}
                id="trialDays"
                name="trialDays"
                type="number"
                min="1"
                placeholder="e.g. 7, 14, 30"
                value={formData.trialDays || ""}
                onChange={handleInputChange}
                className="max-w-xs"
              />
            )}
          </div>
        )}

        {/* Sale options - shown for paid options */}
        {formData.pricingModel !== "free" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="onSale"
                name="onSale"
                checked={formData.onSale || false}
                onCheckedChange={(checked) => handleSwitchChange("onSale", checked)}
              />
              <Label htmlFor="onSale">Course is on Sale</Label>
            </div>

            {formData.onSale && (
              <div className="space-y-4 pl-6 border-l-2 border-blue-100 dark:border-blue-900/30">
                <Input
                  label="Sale Price"
                  labelIcon={<Tag className="h-3.5 w-3.5" />}
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 29.99"
                  value={formData.salePrice || ""}
                  onChange={handleInputChange}
                  className="max-w-xs"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Sale Start Date"
                    labelIcon={<Calendar className="h-3.5 w-3.5" />}
                    id="saleStartDate"
                    name="saleStartDate"
                    type="date"
                    value={formData.saleStartDate || ""}
                    onChange={handleInputChange}
                  />

                  <Input
                    label="Sale End Date"
                    labelIcon={<Calendar className="h-3.5 w-3.5" />}
                    id="saleEndDate"
                    name="saleEndDate"
                    type="date"
                    value={formData.saleEndDate || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Coupon code option */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="hasCoupon"
              name="hasCoupon"
              checked={formData.hasCoupon || false}
              onCheckedChange={(checked) => handleSwitchChange("hasCoupon", checked)}
            />
            <Label htmlFor="hasCoupon">Offer Coupon Code</Label>
          </div>

          {formData.hasCoupon && (
            <div className="space-y-4 pl-6 border-l-2 border-blue-100 dark:border-blue-900/30">
              <Input
                label="Coupon Code"
                labelIcon={<Gift className="h-3.5 w-3.5" />}
                id="couponCode"
                name="couponCode"
                placeholder="e.g. WELCOME20"
                value={formData.couponCode || ""}
                onChange={handleInputChange}
                className="max-w-xs"
              />

              <Input
                label="Discount Percentage"
                labelIcon={<Percent className="h-3.5 w-3.5" />}
                id="discountPercentage"
                name="discountPercentage"
                type="number"
                min="1"
                max="100"
                placeholder="e.g. 20"
                value={formData.discountPercentage || ""}
                onChange={handleInputChange}
                className="max-w-xs"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Coupon Start Date"
                  labelIcon={<Calendar className="h-3.5 w-3.5" />}
                  id="couponStartDate"
                  name="couponStartDate"
                  type="date"
                  value={formData.couponStartDate || ""}
                  onChange={handleInputChange}
                />

                <Input
                  label="Coupon End Date"
                  labelIcon={<Calendar className="h-3.5 w-3.5" />}
                  id="couponEndDate"
                  name="couponEndDate"
                  type="date"
                  value={formData.couponEndDate || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
        </div>

        {/* Money-back guarantee option */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="hasMoneyBackGuarantee"
              name="hasMoneyBackGuarantee"
              checked={formData.hasMoneyBackGuarantee || false}
              onCheckedChange={(checked) => handleSwitchChange("hasMoneyBackGuarantee", checked)}
            />
            <Label htmlFor="hasMoneyBackGuarantee">Offer Money-Back Guarantee</Label>
          </div>

          {formData.hasMoneyBackGuarantee && (
            <div className="space-y-4 pl-6 border-l-2 border-blue-100 dark:border-blue-900/30">
              <Input
                label="Guarantee Period (Days)"
                labelIcon={<Clock className="h-3.5 w-3.5" />}
                id="guaranteePeriod"
                name="guaranteePeriod"
                type="number"
                min="1"
                placeholder="e.g. 30"
                value={formData.guaranteePeriod || ""}
                onChange={handleInputChange}
                className="max-w-xs"
              />

              <Textarea
                label="Guarantee Terms"
                id="guaranteeTerms"
                name="guaranteeTerms"
                placeholder="Describe the terms of your money-back guarantee"
                value={formData.guaranteeTerms || ""}
                onChange={handleInputChange}
                minRows={3}
              />
            </div>
          )}
        </div>
      </div>
    </CourseFormSection>
  )
})
