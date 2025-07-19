const FILTER_OPTIONS = {
  type: {
    type: "select",
    grid: 3,
    options: [
      { label: "Multiple Choice (MCQ)", value: "MCQ" },
      { label: "True/False", value: "TRUE_FALSE" },
      { label: "Fill in the Blanks", value: "FILL_BLANKS" },
      { label: "Essay/Descriptive", value: "ESSAY" },
      { label: "Numeric Answer", value: "NUMERIC" },
      { label: "Match the Following", value: "MATCH" },
      { label: "Ordering/Sequence", value: "ORDER" },
      { label: "Multiple Select", value: "MULTI_SELECT" },
    ],
    placeholder: "Select Question Type",
  },
  difficulty: {
    type: "select",
    grid: 3,
    options: [
      { label: "Very Easy", value: "very_easy" },
      { label: "Easy", value: "easy" },
      { label: "Medium", value: "medium" },
      { label: "Hard", value: "hard" },
      { label: "Very Hard", value: "very_hard" },
    ],
    placeholder: "Select Difficulty",
  },
  category: {
    type: "select",
    grid: 3,
    options: [
      { label: "Mathematics", value: "mathematics" },
      { label: "Science", value: "science" },
      { label: "English", value: "english" },
      { label: "History", value: "history" },
      { label: "Geography", value: "geography" },
      { label: "Computer Science", value: "computer_science" },
      { label: "Physics", value: "physics" },
      { label: "Chemistry", value: "chemistry" },
      { label: "Biology", value: "biology" },
    ],
    placeholder: "Select Category",
  },
  status: {
    type: "select",
    grid: 3,
    options: [
      { label: "Draft", value: "DRAFT" },
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
      { label: "Archived", value: "ARCHIVED" },
    ],
    placeholder: "Select Status",
  },
  isPublic: {
    type: "select",
    grid: 3,
    options: [
      { label: "Public", value: "true" },
      { label: "Private", value: "false" },
    ],
    placeholder: "Visibility",
  },
  language: {
    type: "select",
    grid: 3,
    options: [
      { label: "English", value: "en" },
      { label: "Hindi", value: "hi" },
      { label: "Spanish", value: "es" },
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
    ],
    placeholder: "Select Language",
  },
}

export default FILTER_OPTIONS
