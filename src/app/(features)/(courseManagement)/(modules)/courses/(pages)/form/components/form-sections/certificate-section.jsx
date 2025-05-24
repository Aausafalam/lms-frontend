"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { BadgeIcon as Certificate, ImageIcon, FileText, CheckCircle2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormSection } from "./form-section"
import { Textarea } from "@/components/ui/textarea"
import FileUploadField from "@/components/ui/file"

export const CertificateSection = memo(function CertificateSection({
  handlers = {},
  formData = { certificate: { certificateBenefits: [] } },
  sectionRef,
  isActive,
}) {
  const {
    handleCertificateChange,
    handleCertificateBenefitChange,
    removeCertificateBenefit,
    addCertificateBenefit,
    handleCertificateImageUpload,
  } = handlers

  // Default empty certificate object to prevent errors
  const certificate = formData.certificate || { certificateBenefits: [] }

  // Animation configuration for list items
  const listItemAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  // Ensure certificate benefits array exists to prevent errors
  const benefits = Array.isArray(certificate.certificateBenefits) ? certificate.certificateBenefits : []

  return (
    <FormSection
      id="certificate"
      title="Course Certificate"
      icon={<Certificate className="h-5 w-5" />}
      description="Configure the certificate students will receive upon completion"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Certificate Image Upload */}
        <FileUploadField
          labelIcon={<ImageIcon className="h-3.5 w-3.5" />}
          label="Certificate Template"
          value={certificate.certificateImagePreview || certificate.certificateImage || ""}
          onChange={handleCertificateImageUpload}
          name="certificateImage"
          helperText="Upload a preview image of your certificate template"
        />

        {/* Certificate Description */}
        <Textarea
          label="Certificate Description"
          labelIcon={<FileText className="h-3.5 w-3.5" />}
          id="certificate.certificateDescription"
          name="certificate.certificateDescription"
          placeholder="Describe what this certificate represents and its value"
          value={certificate.certificateDescription || ""}
          onChange={(e) => handleCertificateChange("certificateDescription", e.target.value)}
          rows={3}
        />

        {/* Certificate Benefits */}
        <div className="space-y-4">
          <div className="flex items-center">
            <h3 className="text-sm font-medium">Certificate Benefits</h3>
          </div>

          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              {...listItemAnimation}
              className="flex items-center gap-2"
              aria-label={`Certificate benefit ${index + 1}`}
            >
              {/* Benefit number indicator */}
              <div className="flex-shrink-0 w-8 h-8 mt-[-0.85rem] rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-medium">
                {index + 1}
              </div>

              {/* Benefit input field */}
              <Input
                value={benefit || ""}
                onChange={(e) => handleCertificateBenefitChange(index, e.target.value)}
                placeholder={`Certificate benefit ${index + 1}`}
                aria-label={`Certificate benefit ${index + 1}`}
              />

              {/* Remove button - only shown if there's more than one benefit */}
              {benefits.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCertificateBenefit(index)}
                  className="h-10 w-11 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20 mt-[-0.85rem]"
                  aria-label={`Remove certificate benefit ${index + 1}`}
                  title="Remove this benefit"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}

          {/* Empty state message when no benefits exist */}
          {benefits.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Certificate className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>No certificate benefits added yet.</p>
              <p className="text-sm">Add benefits to highlight the value of your certificate.</p>
            </div>
          )}

          {/* Add new benefit button */}
          <Button
            variant="outline"
            onClick={addCertificateBenefit}
            className="mt-2 bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30 dark:hover:bg-orange-950/30"
            aria-label="Add certificate benefit"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Add Certificate Benefit
          </Button>
        </div>
      </div>
    </FormSection>
  )
})
