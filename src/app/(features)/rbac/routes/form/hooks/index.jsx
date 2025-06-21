"use client"

import { useState, useEffect, useCallback } from "react"

export function useRouteFormData({ initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    basePath: "",
    endPoint: "",
    method: "",
    description: "",
    isPublic: false,
    type: "API",
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
      errors.name = "Route name is required"
    }
    if (!formData.basePath?.trim()) {
      errors.basePath = "Base path is required"
    }
    if (!formData.endPoint?.trim()) {
      errors.endPoint = "Endpoint is required"
    }
    if (!formData.method?.trim()) {
      errors.method = "HTTP method is required"
    }
    if (!formData.type?.trim()) {
      errors.type = "Route type is required"
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

      console.log("Saving route:", formData)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error("Save error:", err)
      setError(err.message || "An error occurred while saving the route")
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
