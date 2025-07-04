import DashboardLayout from "@/app/layouts/index"

const ExamPanelLayout = ({ children }) => {
  return (
    <DashboardLayout>
      <div id="exam_panel_module">{children}</div>
    </DashboardLayout>
  )
}

export default ExamPanelLayout
