export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  PENDING: "PENDING",
}

export const GENDER = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
  PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
}

export const USER_ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  USER: "User",
  MODERATOR: "Moderator",
}

export const TABLE_COLUMNS = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "mobile", label: "Mobile", sortable: false },
  { key: "gender", label: "Gender", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "roles", label: "Roles", sortable: false },
  { key: "lastLogin", label: "Last Login", sortable: true },
  { key: "createdAt", label: "Created", sortable: true },
  { key: "actions", label: "Actions", sortable: false },
]

export const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100]

export const DEFAULT_FILTERS = {
  search: "",
  status: "all",
  role: "all",
  gender: "all",
  sortBy: "name",
  sortOrder: "asc",
  page: 1,
  itemsPerPage: 25,
}
