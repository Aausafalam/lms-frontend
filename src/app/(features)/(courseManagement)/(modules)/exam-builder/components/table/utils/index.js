import TableUtils from "@/components/table/utils"
import TableIcon from "@/components/table/utils/icon"
import examBuilderTableConstants from "./constants"
import { List } from "lucide-react"

class ExamBuilderTableUtils {
  /**
   * Generates table header configuration.
   */
  static getTableHeader({ data, setModalState, styles, navigate, title, courseId }) {
    const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "examCode"])

    return {
      title: title,
      limit: examBuilderTableConstants.LIMITS,
      actionButtons: [
        {
          icon: TableIcon.PLUS,
          label: "New Exam",
          onClick: () => navigate(`/exam-builder/form/add?courseId=${courseId}`),
        },
        TableUtils.getExportButton({ url: "/exam-builder" }),
        {
          icon: <List />,
          iconOnly: true,
          onClick: () => navigate("/exam-builder/form/add"),
        },
      ],
      filters: [
        {
          name: "searchText",
          grid: 2,
          placeholder: "Search Exams",
          autoSuggestion: {
            initialData: autoSuggestions,
            autoSuggestionUrl: "/api/suggestions",
          },
        },
      ],
    }
  }

  /**
   * Returns available actions for each row.
   */
  static getTableActions({ data, setModalState, setSelectedExamBuilder, navigate }) {
    const handleAction = (row, actionType) => {
      const selectedExamBuilder = data?.records?.find((item) => row["id"] === item.id)

      if (actionType === "edit") {
        navigate(`/exam-builder/form/${row["id"]}`)
      } else {
        setSelectedExamBuilder(selectedExamBuilder)
        setModalState(actionType, selectedExamBuilder.id)
      }
    }

    return [
      { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Entry" },
      { name: "View", functions: (row) => handleAction(row, "view"), label: "View Details" },
      { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Details" },
    ]
  }

  /**
   * Handles row click actions.
   */
  static handleRowClick({ row, data, setModalState, setSelectedExamBuilder }) {
    const selectedExamBuilder = data?.data?.find((item) => row["id"].value === item.id)
    setSelectedExamBuilder(selectedExamBuilder)
    setModalState("view", selectedExamBuilder?.id)
  }
}

export default ExamBuilderTableUtils
