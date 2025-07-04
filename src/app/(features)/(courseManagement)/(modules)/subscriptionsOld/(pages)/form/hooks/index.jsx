"use client"

import { useQueryParams } from "@/lib/hooks/useQuery"
import { useState, useEffect, useCallback } from "react"

export function useSubscriptionFormData({ initialData }) {
  const [formData, setFormData] = useState({
    planName: "",
    planType: "",
    description: "",
    price: "",
    originalPrice: "",
    currency: "USD",
    durationValue: "",
    durationUnit: "months",
    accessType: "",
    userLimit: "",
    deviceLimit: "",
    downloadLimit: "",
    supportLevel: "basic",
    features: [""],
    isActive: true,
    isPopular: false,
    isTrial: false,
    hasCertificate: false,
    trialDuration: "",
    trialUserLimit: "",
    sortOrder: "",
    maxEnrollments: "",
    status: "ACTIVE",
  })

  const { courseId } = useQueryParams()
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        features: initialData.features?.length ? initialData.features : [""],
      }))
    }
  }, [initialData])

  useEffect(() => {
    let totalFields = 0
    let completedFields = 0

    const basicFields = ["planName", "planType", "description"]
    totalFields += basicFields.length
    completedFields += basicFields.filter((field) => formData[field]).length

    const pricingFields = ["price", "durationValue"]
    totalFields += pricingFields.length
    completedFields += pricingFields.filter((field) => formData[field]).length

    totalFields += 1
    if (formData.accessType) completedFields++

    totalFields += 1
    if (formData.features.some((feature) => feature.trim() !== "")) completedFields++

    const calculatedProgress = Math.round((completedFields / totalFields) * 100)
    setProgress(calculatedProgress)
  }, [formData])

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      if (validationErrors[name]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [validationErrors],
  )

  const handleSwitchChange = useCallback((name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }, [])

  const handleFeatureChange = useCallback((index, value) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features]
      updatedFeatures[index] = value
      return { ...prev, features: updatedFeatures }
    })
  }, [])

  const addFeature = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }, [])

  const removeFeature = useCallback((index) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features]
      updatedFeatures.splice(index, 1)
      return { ...prev, features: updatedFeatures }
    })
  }, [])

  const validateForm = useCallback(() => {
    const errors = {}

    if (!formData.planName?.trim()) {
      errors.planName = "Plan name is required"
    }
    if (!formData.planType?.trim()) {
      errors.planType = "Plan type is required"
    }
    if (!formData.description?.trim()) {
      errors.description = "Plan description is required"
    }
    if (!formData.price || formData.price <= 0) {
      errors.price = "Valid price is required"
    }
    if (!formData.durationValue || formData.durationValue < 1) {
      errors.durationValue = "Duration is required"
    }
    if (!formData.accessType?.trim()) {
      errors.accessType = "Access type is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  const handleSave = useCallback(async () => {
    setError(null)
    setSuccess(false)

    if (!validateForm()) {
      setError("Please fix the validation errors before saving")
      return
    }

    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Saving subscription plan:", formData)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error("Save error:", err)
      setError(err.message || "An error occurred while saving the subscription plan")
    } finally {
      setIsSaving(false)
    }
  }, [formData, validateForm])

  return {
    formData,
    progress,
    isLoading,
    isSaving,
    error,
    success,
    validationErrors,
    handlers: {
      handleInputChange,
      handleSwitchChange,
      handleFeatureChange,
      addFeature,
      removeFeature,
    },
    handleSave,
    setFormData,
    setError,
    setSuccess,
  }
}
