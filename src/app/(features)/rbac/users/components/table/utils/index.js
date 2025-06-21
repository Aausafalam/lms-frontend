export * from "./constants"
export * from "./filters"
export * from "./seeds"

export const formatUserName = (user) => {
  return user.name || "Unknown User"
}

export const formatUserEmail = (user) => {
  return user.email || "No email"
}

export const formatUserMobile = (user) => {
  return user.mobile || "No mobile"
}

export const formatUserGender = (gender) => {
  switch (gender) {
    case "MALE":
      return "Male"
    case "FEMALE":
      return "Female"
    case "OTHER":
      return "Other"
    case "PREFER_NOT_TO_SAY":
      return "Prefer not to say"
    default:
      return "Unknown"
  }
}

export const formatUserStatus = (status) => {
  switch (status) {
    case "ACTIVE":
      return "Active"
    case "INACTIVE":
      return "Inactive"
    case "SUSPENDED":
      return "Suspended"
    case "PENDING":
      return "Pending"
    default:
      return "Unknown"
  }
}

export const formatUserRoles = (roles) => {
  if (!roles || roles.length === 0) return "No roles"
  return roles.join(", ")
}

export const formatLastLogin = (dateString) => {
  if (!dateString) return "Never"

  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now - date
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays < 7) return `${diffInDays}d ago`

  return date.toLocaleDateString()
}

export const getUserInitials = (name) => {
  if (!name) return "?"

  const names = name.split(" ")
  if (names.length === 1) return names[0].charAt(0).toUpperCase()

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

export const getUserStatusColor = (status) => {
  switch (status) {
    case "ACTIVE":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      }
    case "INACTIVE":
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      }
    case "SUSPENDED":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      }
    case "PENDING":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
      }
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      }
  }
}

export const validateUserData = (userData) => {
  const errors = {}

  if (!userData.name || userData.name.trim().length === 0) {
    errors.name = "Name is required"
  }

  if (!userData.email || userData.email.trim().length === 0) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = "Invalid email format"
  }

  if (userData.mobile && !/^\+?[\d\s\-$$$$]+$/.test(userData.mobile)) {
    errors.mobile = "Invalid mobile number format"
  }

  if (!userData.password || userData.password.length < 6) {
    errors.password = "Password must be at least 6 characters"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
