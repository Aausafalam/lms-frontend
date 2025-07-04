const FILTER_OPTIONS = {
  examType: {
    type: "select",
    grid: 3,
    options: [
      { label: "Practice Test", value: "practice" },
      { label: "Mock Test", value: "mock" },
      { label: "Final Exam", value: "final" },
      { label: "Quiz", value: "quiz" },
      { label: "Assessment", value: "assessment" },
    ],
    placeholder: "Select Exam Type",
  },
  status: {
    type: "select",
    grid: 3,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Published", value: "PUBLISHED" },
      { label: "Scheduled", value: "SCHEDULED" },
      { label: "Completed", value: "COMPLETED" },
      { label: "Cancelled", value: "CANCELLED" },
    ],
    placeholder: "Select Status",
  },
  isPublished: {
    type: "select",
    grid: 3,
    options: [
      { label: "Published", value: "true" },
      { label: "Draft", value: "false" },
    ],
    placeholder: "Publication Status",
  },
}

export default FILTER_OPTIONS
