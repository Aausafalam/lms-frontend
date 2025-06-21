const FILTER_OPTIONS = {
  privilegeGroupId: {
    type: "select",
    grid: 2,
    options: [
      { label: "User Management", value: "1" },
      { label: "Course Management", value: "2" },
      { label: "Content Administration", value: "3" },
      { label: "System Configuration", value: "4" },
      { label: "Reporting & Analytics", value: "5" },
    ],
    placeholder: "Filter by Group",
  },
  // isActive: {
  //   type: "select",
  //   grid: 2,
  //   options: [
  //     { label: "Active", value: true },
  //     { label: "Inactive", value: false },
  //   ],
  //   placeholder: "Filter by Status",
  // },
}

export default FILTER_OPTIONS
