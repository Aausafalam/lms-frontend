"use client"

import { useState, useEffect, useCallback } from "react"

export function useCourseFormData({ initialData }) {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    shortDescription: "",
    longDescription: "<p>Enter detailed description here...</p>",
    publishedAt: new Date().toISOString().split("T")[0],
    instructors: [],
    bannerImage: null,
    bannerImagePreview: "",
    introVideo: "",
    estimatedDuration: 30,
    preRequisites: [""],
    learningObjectives: [""],
    price: {
      regularPrice: "99.99",
      salePrice: "",
      discountPercentage: "",
      saleEndDate: "",
      saleEndsText: "",
    },
    certificate: {
      certificateImage: "",
      certificateImagePreview: "",
      certificateDescription: "",
      certificateBenefits: [""],
    },
    skills: [
      {
        name: "",
        level: "",
      },
    ],
    tags: [],
    isPublished: false,
    isFeatured: false,
  })

  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  // Initialize form with initial data if provided
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        id: initialData.id || null,
        publishedAt: initialData.publishedAt
          ? new Date(initialData.publishedAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        instructors: initialData.instructors || [],
        tags: initialData.tags || [],
        learningObjectives: initialData.learningObjectives?.length ? initialData.learningObjectives : [""],
        preRequisites: initialData.preRequisites?.length ? initialData.preRequisites : [""],
        price: {
          ...prev.price,
          ...(initialData.price || {}),
        },
        certificate: {
          ...prev.certificate,
          ...(initialData.certificate || {}),
          certificateBenefits: initialData.certificate?.certificateBenefits?.length
            ? initialData.certificate.certificateBenefits
            : [""],
        },
        skills: initialData.skills?.length ? initialData.skills : [{ name: "", level: "" }],
      }))
    }
  }, [initialData])

  // Calculate form completion progress
  useEffect(() => {
    let totalFields = 0
    let completedFields = 0

    // Basic fields
    const basicFields = ["title", "shortDescription", "publishedAt", "estimatedDuration"]
    totalFields += basicFields.length
    completedFields += basicFields.filter((field) => formData[field]).length

    // Media fields
    totalFields += 2 // Banner image and intro video
    if (formData.bannerImagePreview) completedFields++
    if (formData.introVideo) completedFields++

    // Content fields
    totalFields += 1 // Long description
    if (formData.longDescription && formData.longDescription !== "<p>Enter detailed description here...</p>")
      completedFields++

    // Learning objectives
    totalFields += 1
    if (formData.learningObjectives.some((obj) => obj.trim() !== "")) completedFields++

    // Prerequisites
    totalFields += 1
    if (formData.preRequisites.some((prereq) => prereq.trim() !== "")) completedFields++

    // Price
    totalFields += 1
    if (formData.price.regularPrice) completedFields++

    // Certificate
    totalFields += 2
    if (formData.certificate.certificateDescription) completedFields++
    if (formData.certificate.certificateBenefits.some((benefit) => benefit.trim() !== "")) completedFields++

    // Skills
    totalFields += 1
    if (formData.skills.some((skill) => skill.name.trim() !== "")) completedFields++

    // Settings
    totalFields += 2 // Instructors, tags
    if (formData.instructors.length > 0) completedFields++
    if (formData.tags.length > 0) completedFields++

    const calculatedProgress = Math.round((completedFields / totalFields) * 100)
    setProgress(calculatedProgress)
  }, [formData])

  // Form field handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          bannerImage: file,
          bannerImagePreview: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Learning objectives handlers
  const handleLearningObjectiveChange = useCallback((index, value) => {
    setFormData((prev) => {
      const updatedObjectives = [...prev.learningObjectives]
      updatedObjectives[index] = value
      return { ...prev, learningObjectives: updatedObjectives }
    })
  }, [])

  const addLearningObjective = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: [...prev.learningObjectives, ""],
    }))
  }, [])

  const removeLearningObjective = useCallback((index) => {
    setFormData((prev) => {
      const updatedObjectives = [...prev.learningObjectives]
      updatedObjectives.splice(index, 1)
      return { ...prev, learningObjectives: updatedObjectives }
    })
  }, [])

  // Prerequisites handlers
  const handlePreRequisiteChange = useCallback((index, value) => {
    setFormData((prev) => {
      const updatedPreRequisites = [...prev.preRequisites]
      updatedPreRequisites[index] = value
      return { ...prev, preRequisites: updatedPreRequisites }
    })
  }, [])

  const addPreRequisite = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      preRequisites: [...prev.preRequisites, ""],
    }))
  }, [])

  const removePreRequisite = useCallback((index) => {
    setFormData((prev) => {
      const updatedPreRequisites = [...prev.preRequisites]
      updatedPreRequisites.splice(index, 1)
      return { ...prev, preRequisites: updatedPreRequisites }
    })
  }, [])

  // Price handlers
  const handlePriceChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [field]: value,
      },
    }))
  }, [])

  // Certificate handlers
  const handleCertificateChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      certificate: {
        ...prev.certificate,
        [field]: value,
      },
    }))
  }, [])

  const handleCertificateImageUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          certificate: {
            ...prev.certificate,
            certificateImage: file,
            certificateImagePreview: reader.result,
          },
        }))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleCertificateBenefitChange = useCallback((index, value) => {
    setFormData((prev) => {
      const updatedBenefits = [...prev.certificate.certificateBenefits]
      updatedBenefits[index] = value
      return {
        ...prev,
        certificate: {
          ...prev.certificate,
          certificateBenefits: updatedBenefits,
        },
      }
    })
  }, [])

  const addCertificateBenefit = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      certificate: {
        ...prev.certificate,
        certificateBenefits: [...prev.certificate.certificateBenefits, ""],
      },
    }))
  }, [])

  const removeCertificateBenefit = useCallback((index) => {
    setFormData((prev) => {
      const updatedBenefits = [...prev.certificate.certificateBenefits]
      updatedBenefits.splice(index, 1)
      return {
        ...prev,
        certificate: {
          ...prev.certificate,
          certificateBenefits: updatedBenefits,
        },
      }
    })
  }, [])

  // Skills handlers
  const handleSkillChange = useCallback((index, field, value) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.skills]
      updatedSkills[index] = {
        ...updatedSkills[index],
        [field]: value,
      }
      return { ...prev, skills: updatedSkills }
    })
  }, [])

  const addSkill = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", level: "" }],
    }))
  }, [])

  const removeSkill = useCallback((index) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.skills]
      updatedSkills.splice(index, 1)
      return { ...prev, skills: updatedSkills }
    })
  }, [])

  const handleSwitchChange = useCallback((name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }, [])

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    setError(null)

    try {
      // Prepare form data for API
      const formDataToSubmit = {
        ...formData,
        // Convert any special types or handle file uploads here if needed
      }

      let result

      // If we have an ID, it's an update (PATCH)
      if (formData.id) {
        result = await fetch(`/api/courses/${formData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSubmit),
        })
      } else {
        // Otherwise it's a new course (POST)
        result = await fetch("/api/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSubmit),
        })
      }

      if (!result.ok) {
        throw new Error(`API error: ${result.status}`)
      }

      const data = await result.json()

      // Update the form with the returned data (including any server-generated IDs)
      setFormData((prev) => ({
        ...prev,
        id: data.id || prev.id,
      }))

      return data
    } catch (err) {
      setError(err.message || "An error occurred while saving")
      throw err
    } finally {
      setIsSaving(false)
    }
  }, [formData])

  return {
    formData,
    progress,
    isLoading,
    isSaving,
    error,
    handlers: {
      handleInputChange,
      handleImageUpload,
      handleLearningObjectiveChange,
      addLearningObjective,
      removeLearningObjective,
      handlePreRequisiteChange,
      addPreRequisite,
      removePreRequisite,
      handlePriceChange,
      handleCertificateChange,
      handleCertificateImageUpload,
      handleCertificateBenefitChange,
      addCertificateBenefit,
      removeCertificateBenefit,
      handleSkillChange,
      addSkill,
      removeSkill,
      handleSwitchChange,
    },
    handleSave,
    setFormData,
  }
}
