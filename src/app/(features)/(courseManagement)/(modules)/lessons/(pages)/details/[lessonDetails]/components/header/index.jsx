import { Breadcrumb } from "@/components/Breadcrumb"
import { Copy, BookOpen, School, Trash2, GraduationCap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

const LessonDetailsHeader = ({ children, lessonId }) => {
  const breadcrumbItems = [
    {
      title: "Courses",
      href: "/courses",
      icon: <School className="h-3.5 w-3.5" />,
    },
    {
      title: "Lessons",
      href: "/lessons",
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
    {
      title: lessonId || "Lesson Details",
      href: `/lessons/details/${lessonId}`,
      icon: <GraduationCap className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate Lesson</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete Lesson</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {children}
      </div>
    </div>
  )
}

export default LessonDetailsHeader
