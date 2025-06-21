"use client"

import { useState, useEffect, useCallback } from "react"

export function usePrivilegeGroupFormData({ initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  })

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
      }))
    }
  }, [initialData])

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

  const validateForm = useCallback(() => {
    const errors = {}

    if (!formData.name?.trim()) {
      errors.name = "Privilege group name is required"
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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Saving privilege group:", formData)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error("Save error:", err)
      setError(err.message || "An error occurred while saving the privilege group")
    } finally {
      setIsSaving(false)
    }
  }, [formData, validateForm])

  return {
    formData,
    isLoading,
    isSaving,
    error,
    success,
    validationErrors,
    handlers: {
      handleInputChange,
    },
    handleSave,
    setFormData,
    setError,
    setSuccess,
  }
}
