"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import UserFormHeader from "./components/header"
import UserFormSidebar from "./components/sidebar"
import UserFormSections from "./components/form-sections"
import { useUserForm } from "./hooks"

const UserForm = () => {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId
  const isEdit = Boolean(userId && userId !== "add")

  const { formData, setFormData, errors, setErrors, loading, setLoading, handleSubmit, validateForm, resetForm } =
    useUserForm(userId)

  const [activeSection, setActiveSection] = useState("basic-info")

  const sections = [
    { id: "basic-info", label: "Basic Information", required: true },
    { id: "contact", label: "Contact Details", required: false },
    { id: "roles", label: "Roles & Permissions", required: true },
    { id: "security", label: "Security Settings", required: false },
    { id: "preferences", label: "Preferences", required: false },
  ]

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      await handleSubmit()

      // Redirect to users list on success
      router.push("/rbac/users")
    } catch (error) {
      console.error("Error saving user:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      router.push("/rbac/users")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserFormHeader
        isEdit={isEdit}
        formData={formData}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
        loading={loading}
      />

      <div className="flex">
        <UserFormSidebar
          sections={sections}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          errors={errors}
        />

        <div className="flex-1 p-6">
          <UserFormSections
            activeSection={activeSection}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            isEdit={isEdit}
          />
        </div>
      </div>
    </div>
  )
}

export default UserForm
