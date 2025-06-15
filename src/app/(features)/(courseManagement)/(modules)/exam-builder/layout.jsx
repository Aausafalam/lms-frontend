import DashboardLayout from "@/app/layouts/index"

const ExamBuilderLayout = ({ children }) => {
  return (
    <DashboardLayout>
      <div id="exam_builder_module">{children}</div>
    </DashboardLayout>
  )
}

export default ExamBuilderLayout
