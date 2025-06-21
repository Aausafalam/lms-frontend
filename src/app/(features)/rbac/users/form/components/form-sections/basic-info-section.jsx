"use client"

import { useState } from "react"
import { User, Upload, X, Camera } from "lucide-react"

const BasicInfoSection = ({ data, onChange, errors, clearError }) => {
  const [profilePreview, setProfilePreview] = useState(data.profilePic || null)

  const handleInputChange = (field, value) => {
    onChange({ [field]: value })
    clearError(field)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setProfilePreview(imageUrl)
        handleInputChange("profilePic", imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeProfilePic = () => {
    setProfilePreview(null)
    handleInputChange("profilePic", "")
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <p className="text-sm text-gray-500">Enter the user's basic details</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {profilePreview ? (
                <div className="relative">
                  <img
                    src={profilePreview || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={removeProfilePic}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="cursor-pointer bg-orange-50 text-orange-600 px-4 py-2 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Photo
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              <p className="text-xs text-gray-500">JPG, PNG or GIF (max. 2MB)</p>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={data.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={data.gender || "PREFER_NOT_TO_SAY"}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={data.status || "ACTIVE"}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicInfoSection
