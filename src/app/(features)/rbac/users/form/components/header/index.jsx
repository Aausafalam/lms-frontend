"use client"

import { ArrowLeft, Save, X, User } from "lucide-react"

const UserFormHeader = ({ isEdit, formData, onSubmit, onCancel, loading }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Users</span>
            </button>

            <div className="h-6 w-px bg-gray-300" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {isEdit ? `Edit User: ${formData.name || "Unnamed User"}` : "Create New User"}
                </h1>
                <p className="text-sm text-gray-500">
                  {isEdit ? "Update user information and settings" : "Add a new user to the system"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>

            <button
              type="submit"
              onClick={onSubmit}
              disabled={loading}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEdit ? "Update User" : "Create User"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserFormHeader
