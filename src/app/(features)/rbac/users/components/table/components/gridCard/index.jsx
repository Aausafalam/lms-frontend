"use client"
import { Edit, Trash2, Eye, Mail, Phone, Shield, Clock, User, Crown } from "lucide-react"

const UserGridCard = ({ user, onDeleteClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200"
      case "INACTIVE":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "SUSPENDED":
        return "bg-red-100 text-red-800 border-red-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Crown className="w-3 h-3" />
      case "manager":
        return <Shield className="w-3 h-3" />
      default:
        return <User className="w-3 h-3" />
    }
  }

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "manager":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatLastLogin = (dateString) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getGradientByRole = (roles) => {
    if (roles.includes("Admin")) return "from-purple-500 to-pink-500"
    if (roles.includes("Manager")) return "from-blue-500 to-cyan-500"
    return "from-orange-500 to-red-500"
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Header with gradient */}
      <div className={`h-20 bg-gradient-to-r ${getGradientByRole(user.roles)} relative`}>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(user.status)}`}
          >
            {user.status}
          </span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6 -mt-8 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg flex-shrink-0">
              {user.profilePic ? (
                <img
                  src={user.profilePic || "/placeholder.svg"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-xl bg-gray-100">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="mt-2">
              <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{user.gender.toLowerCase().replace("_", " ")}</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="truncate">{user.email}</span>
          </div>
          {user.mobile && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{user.mobile}</span>
            </div>
          )}
        </div>

        {/* Roles */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {user.roles.map((role, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(role)}`}
              >
                {getRoleIcon(role)}
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Last Login */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4" />
          <span>Last login: {formatLastLogin(user.lastLogin)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <a
              href={`/rbac/users/details/${user.id}`}
              className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </a>
            <a
              href={`/rbac/users/form/${user.id}`}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit User"
            >
              <Edit className="w-4 h-4" />
            </a>
            <button
              onClick={() => onDeleteClick(user)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete User"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-gray-400">ID: {user.id}</div>
        </div>
      </div>
    </div>
  )
}

export default UserGridCard
