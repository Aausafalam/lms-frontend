"use client"

import { useMemo } from "react"
import { LayoutDashboard, Plus, School } from "lucide-react"
import Table from "@/components/table"
import CoursesTableUtils from "./utils"
import GlobalUtils from "@/lib/utils"
import coursesTableConstants from "./utils/constants"
import CourseCard from "./components/gridCard"
import { useNavigation } from "@/components/navigation"
import { Breadcrumb } from "@/components/Breadcrumb"
import { EmptyState } from "@/components/emptyState"
import { ErrorBoundary } from "@/components/ErrorBoundary"

/**
 * Courses Table Component
 * @description Main table component for displaying and managing courses
 */
const CoursesTable = ({ setSelectedCourse, setModalState, refreshTable }) => {
  const { navigate } = useNavigation()

  const breadcrumbItems = [
    {
      title: "Courses",
      href: "/courses",
      icon: <LayoutDashboard className="h-3.5 w-3.5" />,
    },
  ]

  /**
   * Format data for table configuration
   */
  const formatTableData = (data) => ({
    rows: data?.records || [],
    actionData: CoursesTableUtils.getTableActions({
      data,
      setModalState,
      setSelectedCourse,
      navigate,
    }),
    url: coursesTableConstants.API_URL,
    pagination: GlobalUtils.tablePagination(data?.pagination),
    sorting: coursesTableConstants.SORTING,
    externalFilters: coursesTableConstants.FILTERS,
    tableHeader: CoursesTableUtils.getTableHeader({
      data,
      setModalState,
      navigate,
      title: <Breadcrumb items={breadcrumbItems} />,
    }),
    checkbox: true,
    refreshTable: refreshTable || false,
    formatTableData,
    initialView: "grid",
    multiView: true,
    grid: {
      column: 4,
      card: (row, view) => (
        <CourseCard
          data={row}
          view={view}
          onEdit={(id) => navigate(`/courses/form/${id}`)}
          onDelete={(id) => setModalState("delete", id)}
          onView={(id) => navigate(`/courses/details/${id}`)}
        />
      ),
    },
    emptyStateComponent: () => (
      <EmptyState
        icon={School}
        title="No Courses Found"
        description="You haven't created any course yet. Start by creating your first course."
        actionLabel="Create Course"
        actionIcon={Plus}
        onAction={() => navigate("/courses/form/add")}
        className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
      />
    ),
  })

  const tableData = useMemo(() => formatTableData({}), [refreshTable])

  return (
    <ErrorBoundary>
      <div className="courses-table-container">
        <Table tableData={tableData} />
      </div>
    </ErrorBoundary>
  )
}

export default CoursesTable
