"use client"
import { Mail, Phone } from "lucide-react"

const ContactSection = ({ data, onChange, errors, clearError }) => {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value })
    clearError(field)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <p className="text-sm text-gray-500">Enter the user's contact details</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                value={data.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter email address"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="tel"
                value={data.mobile || ""}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.mobile ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Enter mobile number"
              />
            </div>
            {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
            <p className="mt-1 text-sm text-gray-500">Include country code (e.g., +1 234 567 8900)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
