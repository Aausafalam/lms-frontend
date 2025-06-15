import DashboardLayout from "@/app/layouts/index"

const QuestionPanelLayout = ({ children }) => {
  return (
    <DashboardLayout>
      <div id="question_panel_module">{children}</div>
    </DashboardLayout>
  )
}

export default QuestionPanelLayout
