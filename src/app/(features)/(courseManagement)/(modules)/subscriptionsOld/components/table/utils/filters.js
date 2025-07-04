const FILTER_OPTIONS = {
  planType: {
    type: "select",
    options: [
      { label: "Monthly", value: "monthly" },
      { label: "Yearly", value: "yearly" },
      { label: "One-Time", value: "one-time" },
      { label: "Lifetime", value: "lifetime" },
    ],
    placeholder: "Select Plan Type",
    grid: 3,
  },
  status: {
    type: "select",
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
      { label: "Draft", value: "DRAFT" },
    ],
    placeholder: "Select Status",
    grid: 3,
  },
}

export default FILTER_OPTIONS
