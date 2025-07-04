"use client"
import { X, AlertTriangle, User, Mail, Shield } from "lucide-react"
import { useEffect } from "react"
import GlobalUtils from "@/lib/utils"

const DeleteUser = ({ isOpen, user, modalState, userId, setRefreshTable, onCancel, onConfirm }) => {
  // Mock delete function - replace with actual API call
  const userDelete = {
    execute: ({ recordId, onSuccess }) => {
      // Simulate API call
      setTimeout(() => {
        console.log(`Deleting user with ID: ${recordId}`)
        onSuccess?.()
      }, 1000)
    },
  }

  const closeModal = () => {
    // Function to close the modal
  }

  useEffect(() => {
    if (modalState.delete && userId) {
      const deletePayload = {
        recordId: userId,
        onShowDetails: () => {},
        deleteAction: userDelete,
        toggleRefreshData: setRefreshTable,
      }
      GlobalUtils.handleDelete(deletePayload)
      closeModal()
    }
  }, [modalState.delete, userId])

  if (!isOpen || !user) return null

  const handleConfirm = () => {
    onConfirm(user.id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
            <p className="text-gray-600">This action cannot be undone</p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {user.profilePic ? (
                <img
                  src={user.profilePic || "/placeholder.svg"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            </div>
          </div>

          {user.roles && user.roles.length > 0 && (
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {user.roles.map((role, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Warning</h4>
              <p className="text-sm text-yellow-700">Deleting this user will:</p>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Remove all user data permanently</li>
                <li>• Revoke all assigned roles and permissions</li>
                <li>• Disable user access to the system</li>
                <li>• Cannot be undone</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUser
