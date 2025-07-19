"use client"

import { Breadcrumb } from "@/components/Breadcrumb"
import { Copy, HelpCircle, List, Trash2, SquarePen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/components/navigation"

const QuestionFormHeader = ({ children, questionId }) => {
  const { navigate } = useNavigation()
  const breadcrumbItems = [
    {
      title: "Question Bank",
      href: `/questions`,
      icon: <List className="h-3.5 w-3.5" />,
    },
    {
      title: questionId ? `Question ${questionId}` : "Question Details",
      href: questionId ? `/questions/form/${questionId}` : "/questions/form/add",
      icon: <HelpCircle className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div className="flex items-center justify-between mb-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => navigate(`/questions/form/${questionId}`)}
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-800"
              >
                <SquarePen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Question</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
            <TooltipContent>Duplicate Question</TooltipContent>
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
            <TooltipContent>Delete Question</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {children}
      </div>
    </div>
  )
}

export default QuestionFormHeader
