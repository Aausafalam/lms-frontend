const FILTER_OPTIONS = {
  isActive: {
    type: "select",
    grid: 2,
    options: [
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
    placeholder: "Filter by Status",
  },
}

export default FILTER_OPTIONS
