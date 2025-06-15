import TableUtils from "@/components/table/utils"
import TableIcon from "@/components/table/utils/icon"
import questionTableConstants from "./constants"
import { List } from "lucide-react"

class QuestionTableUtils {
  /**
   * Generates table header configuration.
   */
  static getTableHeader({ data, setModalState, styles, navigate, title, courseId }) {
    const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["text", "questionId", "category"])

    return {
      title: title,
      limit: questionTableConstants.LIMITS,
      actionButtons: [
        {
          icon: TableIcon.PLUS,
          label: "New Question",
          onClick: () => navigate(`/question-panel/form/add?courseId=${courseId}`),
        },
        TableUtils.getExportButton({ url: "/question-panel" }),
        {
          icon: <List />,
          iconOnly: true,
          onClick: () => navigate("/question-panel/form/add"),
        },
      ],
      filters: [
        {
          name: "searchText",
          grid: 2,
          placeholder: "Search Questions",
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
  static getTableActions({ data, setModalState, setSelectedQuestion, navigate }) {
    const handleAction = (row, actionType) => {
      const selectedQuestion = data?.records?.find((item) => row["id"] === item.id)

      if (actionType === "edit") {
        navigate(`/question-panel/form/${row["id"]}`)
      } else {
        setSelectedQuestion(selectedQuestion)
        setModalState(actionType, selectedQuestion.id)
      }
    }

    return [
      { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Question" },
      { name: "View", functions: (row) => handleAction(row, "view"), label: "View Details" },
      { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Question" },
    ]
  }

  /**
   * Handles row click actions.
   */
  static handleRowClick({ row, data, setModalState, setSelectedQuestion }) {
    const selectedQuestion = data?.data?.find((item) => row["id"].value === item.id)
    setSelectedQuestion(selectedQuestion)
    setModalState("view", selectedQuestion?.id)
  }
}

export default QuestionTableUtils
