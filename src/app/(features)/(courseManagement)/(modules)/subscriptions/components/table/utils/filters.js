const FILTER_OPTIONS = {
  planType: {
    type: "select",
    options: [
      { label: "Tiered Plan", value: "TIERED" },
      { label: "Recurring Plan", value: "RECURRING" },
      { label: "Lifetime Access", value: "LIFETIME_ACCESS" },
    ],
    placeholder: "Select Plan Type",
    grid: 3,
  },
  accessType: {
    type: "select",
    options: [
      { label: "All Features", value: "ALL_FEATURES" },
      { label: "Exam Only", value: "EXAM_ONLY" },
      { label: "Video Only", value: "VIDEO_ONLY" },
      { label: "Read Only Content", value: "READ_ONLY_CONTENT" },
    ],
    placeholder: "Select Access Type",
    grid: 3,
  },
  isActive: {
    type: "select",
    options: [
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
    placeholder: "Select Status",
    grid: 3,
  },
}

export default FILTER_OPTIONS
