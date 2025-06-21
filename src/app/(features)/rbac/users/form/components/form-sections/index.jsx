"use client"
import BasicInfoSection from "./basic-info-section"
import ContactSection from "./contact-section"
import RolesSection from "./roles-section"
import SecuritySection from "./security-section"
import PreferencesSection from "./preferences-section"

const FormSections = ({ formData, setFormData, errors, setErrors, activeSection, availableRoles = [] }) => {
  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))
  }

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const renderSection = () => {
    switch (activeSection) {
      case "basic-info":
        return (
          <BasicInfoSection
            data={formData.basicInfo || {}}
            onChange={(data) => updateFormData("basicInfo", data)}
            errors={errors}
            clearError={clearError}
          />
        )
      case "contact":
        return (
          <ContactSection
            data={formData.contact || {}}
            onChange={(data) => updateFormData("contact", data)}
            errors={errors}
            clearError={clearError}
          />
        )
      case "roles":
        return (
          <RolesSection
            data={formData.roles || {}}
            onChange={(data) => updateFormData("roles", data)}
            errors={errors}
            clearError={clearError}
            availableRoles={availableRoles}
          />
        )
      case "security":
        return (
          <SecuritySection
            data={formData.security || {}}
            onChange={(data) => updateFormData("security", data)}
            errors={errors}
            clearError={clearError}
          />
        )
      case "preferences":
        return (
          <PreferencesSection
            data={formData.preferences || {}}
            onChange={(data) => updateFormData("preferences", data)}
            errors={errors}
            clearError={clearError}
          />
        )
      default:
        return null
    }
  }

  return <div className="space-y-6">{renderSection()}</div>
}

export default FormSections
