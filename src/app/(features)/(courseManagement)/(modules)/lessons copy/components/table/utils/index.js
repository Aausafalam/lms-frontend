import TableUtils from "@/components/table/utils"
import TableIcon from "@/components/table/utils/icon"
import lessonsTableConstants from "./constants"
import { List } from "lucide-react"

class LessonsTableUtils {
  static getTableHeader({ data, setModalState, navigate, title, hideBreadcrumb, courseId, moduleDetailsId }) {
    const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"])

    return {
      title: hideBreadcrumb ? "Lesson List" : title,
      limit: lessonsTableConstants.LIMITS,
      actionButtons: [
        {
          icon: TableIcon.PLUS,
          label: "New Lesson",
          onClick: () => navigate(`/lessons/form/add?courseId=${courseId}&moduleId=${moduleDetailsId}`),
        },
        TableUtils.getExportButton({ url: "/lessons" }),
        {
          icon: <List />,
          iconOnly: true,
          onClick: () => navigate("/lessons/form/add"),
        },
      ],
      filters: [
        {
          name: "searchText",
          grid: 2,
          placeholder: "Search Lessons",
          autoSuggestion: {
            initialData: autoSuggestions,
            autoSuggestionUrl: "/api/suggestions",
          },
        },
      ],
    }
  }

  static getTableActions({ data, setModalState, setSelectedLesson, navigate, courseId, moduleId }) {
    const handleAction = (row, actionType) => {
      const selectedLesson = data?.records?.find((item) => row["id"] === item.id)

      if (actionType === "edit") {
        navigate(`/lessons/form/${row["id"]}?courseId=${courseId}&moduleId=${moduleId}`)
      } else {
        setSelectedLesson(selectedLesson)
        setModalState(actionType, selectedLesson.id)
      }
    }

    return [
      { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Entry" },
      { name: "View", functions: (row) => handleAction(row, "view"), label: "View Details" },
      { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Details" },
    ]
  }

  static handleRowClick({ row, data, setModalState, setSelectedLesson }) {
    const selectedLesson = data?.data?.find((item) => row["id"].value === item.id)
    setSelectedLesson(selectedLesson)
    setModalState("view", selectedLesson?.id)
  }
}

export default LessonsTableUtils
