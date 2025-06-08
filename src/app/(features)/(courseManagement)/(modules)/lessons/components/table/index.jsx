"use client"

import { useMemo } from "react"
import Table from "@/components/table"
import LessonsTableUtils from "./utils"
import sampleLessonsTableData from "./utils/seeds"
import GlobalUtils from "@/lib/utils"
import lessonsTableConstants from "./utils/constants"
import LessonCard from "./components/gridCard"
import { useNavigation } from "@/components/navigation"
import { Breadcrumb } from "@/components/Breadcrumb"
import { ImageIcon, Package, Plus } from "lucide-react"
import { EmptyState } from "@/components/emptyState"
import { useParams } from "next/navigation"
import { useQueryParams } from "@/lib/hooks/useQuery"

const LessonsTable = ({
  onModuleDetailsPage = false,
  setSelectedLesson,
  setModalState,
  refreshTable,
  hideBreadcrumb,
}) => {
  const { navigate } = useNavigation()
  const { moduleDetailsId } = useParams()
  const { courseId } = useQueryParams()

  const breadcrumbItems = [
    {
      title: "Courses",
      href: "/courses",
      icon: <Package className="h-3.5 w-3.5" />,
    },
    {
      title: "Modules",
      href: "/modules",
      icon: <Package className="h-3.5 w-3.5" />,
    },
    {
      title: "Lessons",
      href: "/lessons",
      icon: <Package className="h-3.5 w-3.5" />,
    },
  ]

  const formatTableData = (data) => ({
    rows: data?.records,
    actionData: LessonsTableUtils.getTableActions({
      data,
      setModalState,
      setSelectedLesson,
      navigate,
      moduleId: moduleDetailsId,
      courseId,
    }),
    url: `course/${courseId}/module/${moduleDetailsId}/lesson`,
    pagination: GlobalUtils.tablePagination(data),
    sorting: lessonsTableConstants.SORTING,
    externalFilters: lessonsTableConstants.FILTERS,
    tableHeader: LessonsTableUtils.getTableHeader({
      data,
      courseId,
      moduleDetailsId,
      setModalState,
      navigate,
      title: onModuleDetailsPage ? "Lesson List" : <Breadcrumb items={breadcrumbItems} />,
      hideBreadcrumb,
    }),
    checkbox: true,
    refreshTable: refreshTable || false,
    formatTableData,
    initialView: "grid",
    multiView: false,
    grid: {
      column: onModuleDetailsPage ? 4 : 5,
      card: (row) => <LessonCard data={row} />,
    },
    emptyStateComponent: () => (
      <EmptyState
        icon={ImageIcon}
        title="No Lessons Found"
        description="You haven't created any lessons yet. Start by creating your first lesson."
        actionLabel="Create Lesson"
        actionIcon={Plus}
        onAction={() => navigate("/lessons/form/add")}
        className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
      />
    ),
  })

  const tableData = useMemo(
    () => formatTableData(sampleLessonsTableData),
    [refreshTable, onModuleDetailsPage, courseId, moduleDetailsId],
  )

  return (
    <div className="w-full">
      <Table tableData={tableData} />
    </div>
  )
}

export default LessonsTable
