export const filterUsers = (users, filters) => {
  let filtered = [...users]

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        (user.mobile && user.mobile.includes(searchTerm)),
    )
  }

  // Status filter
  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((user) => user.status === filters.status)
  }

  // Role filter
  if (filters.role && filters.role !== "all") {
    filtered = filtered.filter((user) => user.roles.some((role) => role === filters.role))
  }

  // Gender filter
  if (filters.gender && filters.gender !== "all") {
    filtered = filtered.filter((user) => user.gender === filters.gender)
  }

  return filtered
}

export const sortUsers = (users, sortBy, sortOrder) => {
  return [...users].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    // Handle special cases
    if (sortBy === "roles") {
      aValue = a.roles.join(", ")
      bValue = b.roles.join(", ")
    } else if (sortBy === "lastLogin") {
      aValue = new Date(a.lastLogin || 0)
      bValue = new Date(b.lastLogin || 0)
    } else if (sortBy === "createdAt") {
      aValue = new Date(a.createdAt)
      bValue = new Date(b.createdAt)
    }

    // Convert to string for comparison if needed
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
}

export const paginateUsers = (users, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return users.slice(startIndex, endIndex)
}

export const getFilterOptions = (users) => {
  const statuses = [...new Set(users.map((user) => user.status))]
  const roles = [...new Set(users.flatMap((user) => user.roles))]
  const genders = [...new Set(users.map((user) => user.gender))]

  return {
    statuses: statuses.map((status) => ({ value: status, label: status })),
    roles: roles.map((role) => ({ value: role, label: role })),
    genders: genders.map((gender) => ({
      value: gender,
      label: gender
        .replace("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    })),
  }
}
