"use client"

import { Breadcrumb } from "@/components/Breadcrumb"
import { Briefcase, Copy, LayoutDashboard, SquarePen, Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/components/navigation"
import { useCourse } from "@/services/context/course"
import { toast } from "@/components/ui/toast"
import DeleteCourse from "../../../../../components/delete"
import { useState } from "react"

/**
 * Course Details Header Component
 * @description Header with breadcrumb navigation and action buttons
 */
const CourseDetailsHeader = ({ courseId }) => {
  const { navigate } = useNavigation()
  const { courseDetails } = useCourse()
  const [modalType, setModalType] = useState("")
  const breadcrumbItems = [
    {
      title: "Courses",
      href: "/courses",
      icon: <LayoutDashboard className="h-3.5 w-3.5" />,
    },
    {
      title: "Course Details",
      href: `courses/details/${courseId}`,
      icon: <Briefcase className="h-3.5 w-3.5" />,
    },
  ]

  const handleDuplicateCourse = () => {
    try {
      if (!courseDetails?.data?.data) {
        toast.error("Course data not available for duplication")
        return
      }

      const data = { ...courseDetails.data.data }
      delete data.id

      const encodedData = encodeURIComponent(JSON.stringify(data))
      navigate(`/courses/form/add?initialData=${encodedData}`)
    } catch (error) {
      console.error("Error duplicating course:", error)
      toast.error("Failed to duplicate course")
    }
  }

  const handleEditCourse = () => {
    navigate(`/courses/form/${courseId}`)
  }

  const handleDeleteCourse = () => {
    setModalType("delete")
  }
  const closeModal = () => {
    setModalType("")
  }

  const handleRefresh = () => {
    courseDetails.fetch({ dynamicRoute: courseId })
  }

  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center justify-between mb-4 gap-4 px-4 sm:px-0">
      <div className="flex-1 min-w-0">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleEditCourse}
                variant="outline"
                size="sm"
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
              >
                <SquarePen className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Course</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleDuplicateCourse}
                variant="outline"
                size="sm"
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
              >
                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate Course</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleDeleteCourse}
                variant="outline"
                size="sm"
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete Course</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DeleteCourse
          modalState={{ delete: modalType === "delete" }}
          closeModal={closeModal}
          courseId={courseId}
          setRefreshTable={handleRefresh}
        />
      </div>
    </div>
  )
}

export default CourseDetailsHeader
