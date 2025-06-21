"use client"
import {
  ArrowLeft,
  Edit,
  MoreHorizontal,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Clock,
  MapPin,
  Globe,
} from "lucide-react"

const UserDetailsSidebar = ({ user }) => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <a href="/rbac/users" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Users</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href={`/rbac/users/form/${user.id}`}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit User"
            >
              <Edit className="w-4 h-4" />
            </a>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4">
            {user.profilePic ? (
              <img src={user.profilePic || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
          <p className="text-gray-600 mb-3">{user.email}</p>
          <span
            className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(user.status)}`}
          >
            {user.status}
          </span>
        </div>
      </div>

      {/* Quick Info */}
      <div className="p-6 space-y-4">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Information</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium text-gray-900 capitalize">{user.gender.toLowerCase().replace("_", " ")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
          </div>

          {user.mobile && (
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium text-gray-900">{user.mobile}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="font-medium text-gray-900">{formatDate(user.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="font-medium text-gray-900">{formatLastLogin(user.lastLogin)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Roles */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Assigned Roles</h3>
        <div className="space-y-2">
          {user.roles.map((role, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
              <Shield className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-orange-900">{role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      {user.location && (
        <div className="p-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Location</h3>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{user.location}</span>
          </div>
        </div>
      )}

      {user.timezone && (
        <div className="p-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Timezone</h3>
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{user.timezone}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetailsSidebar
