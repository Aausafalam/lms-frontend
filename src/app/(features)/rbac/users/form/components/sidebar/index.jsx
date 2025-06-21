"use client"

import { CheckCircle, AlertCircle, Circle } from "lucide-react"

const UserFormSidebar = ({ sections, activeSection, onSectionChange, errors }) => {
  const getSectionStatus = (sectionId) => {
    const sectionErrors = Object.keys(errors).filter((key) => {
      switch (sectionId) {
        case "basic-info":
          return ["name", "email", "gender"].includes(key)
        case "contact":
          return ["mobile", "location"].includes(key)
        case "roles":
          return ["roles"].includes(key)
        case "security":
          return ["password", "confirmPassword"].includes(key)
        case "preferences":
          return ["theme", "language"].includes(key)
        default:
          return false
      }
    })

    if (sectionErrors.length > 0) return "error"

    // Check if section has required data
    switch (sectionId) {
      case "basic-info":
        return "complete" // Assume complete for now
      case "roles":
        return "complete" // Assume complete for now
      default:
        return "incomplete"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Circle className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">User Information</h2>

        <nav className="space-y-2">
          {sections.map((section, index) => {
            const status = getSectionStatus(section.id)
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive ? "bg-orange-50 text-orange-700 border border-orange-200" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-gray-500 w-6">{String(index + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{section.label}</span>
                      {section.required && <span className="text-red-500 text-xs">*</span>}
                    </div>
                  </div>
                  {getStatusIcon(status)}
                </div>
              </button>
            )
          })}
        </nav>

        {/* Progress Indicator */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {sections.filter((s) => getSectionStatus(s.id) === "complete").length} / {sections.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(sections.filter((s) => getSectionStatus(s.id) === "complete").length / sections.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Tips</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Fill in all required fields marked with *</li>
            <li>• Use a strong password for security</li>
            <li>• Assign appropriate roles for access control</li>
            <li>• Verify email address for notifications</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserFormSidebar
