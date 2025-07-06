import TableUtils from "@/components/table/utils"
import TableIcon from "@/components/table/utils/icon"
import coursesTableConstants from "./constants"

/**
 * Courses Table Utilities
 * @description Utility functions for table configuration and actions
 */
class CoursesTableUtils {
  /**
   * Generate table header configuration
   * @param {Object} params - Configuration parameters
   * @returns {Object} Table header configuration
   */
  static getTableHeader({ data, navigate, title }) {
    const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "code", "summary"])

    return {
      title,
      limit: coursesTableConstants.LIMITS,
      actionButtons: [
        {
          icon: TableIcon.PLUS,
          label: "New Course",
          onClick: () => navigate("/courses/form/add"),
          variant: "primary",
        },
        TableUtils.getExportButton({
          url: "/course/export",
          filename: "courses-export",
        }),
      ],
      filters: [
        {
          name: "searchText",
          grid: 3,
          placeholder: "Search courses by name, code, or summary",
          autoSuggestion: {
            initialData: autoSuggestions,
            autoSuggestionUrl: "/api/suggestions",
          },
        },
        ...coursesTableConstants.FILTERS.filterFields,
      ],
    }
  }

  /**
   * Get available actions for each table row
   * @param {Object} params - Action configuration parameters
   * @returns {Array} Array of action configurations
   */
  static getTableActions({ data, setModalState, setSelectedCourse, navigate }) {
    const handleAction = (row, actionType) => {
      try {
        const selectedCourse = data?.records?.find((item) => row.id === item.id)

        if (!selectedCourse) {
          console.error("Course not found for action:", actionType)
          return
        }

        if (actionType === "edit") {
          navigate(`/courses/form/${row.id}`)
        } else if (actionType === "view") {
          navigate(`/courses/details/${row.id}`)
        } else {
          setSelectedCourse(selectedCourse)
          setModalState(actionType, selectedCourse.id)
        }
      } catch (error) {
        console.error("Error handling table action:", error)
      }
    }

    return [
      {
        name: "View",
        functions: (row) => handleAction(row, "view"),
        label: "View Details",
        icon: "eye",
      },
      {
        name: "Edit",
        functions: (row) => handleAction(row, "edit"),
        label: "Edit Course",
        icon: "edit",
      },
      {
        name: "Delete",
        functions: (row) => handleAction(row, "delete"),
        label: "Delete Course",
        icon: "trash",
        variant: "destructive",
      },
    ]
  }

  /**
   * Handle row click actions
   * @param {Object} params - Row click parameters
   */
  static handleRowClick({ row, data, setModalState, setSelectedCourse }) {
    try {
      const selectedCourse = data?.data?.find((item) => row.id.value === item.id)

      if (selectedCourse) {
        setSelectedCourse(selectedCourse)
        setModalState("view", selectedCourse.id)
      }
    } catch (error) {
      console.error("Error handling row click:", error)
    }
  }
}

export default CoursesTableUtils
