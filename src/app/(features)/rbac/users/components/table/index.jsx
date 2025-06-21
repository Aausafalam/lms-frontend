"use client"
import { Edit, Trash2, Eye, Shield, Clock, Mail, Phone } from "lucide-react"
import UserGridCard from "./components/gridCard"

const UserTable = ({ users, viewMode, onDeleteClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "INACTIVE":
        return "bg-gray-100 text-gray-800"
      case "SUSPENDED":
        return "bg-red-100 text-red-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
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

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserGridCard key={user.id} user={user} onDeleteClick={onDeleteClick} />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-900">User</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Contact</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Roles</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Last Login</th>
              <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
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
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                    {user.mobile && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {user.mobile}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                      >
                        <Shield className="w-3 h-3" />
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {formatLastLogin(user.lastLogin)}
                  </div>
                </td>
                <td className="py-4 px-6">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable
