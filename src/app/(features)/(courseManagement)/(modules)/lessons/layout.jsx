import DashboardLayout from "@/app/layouts/index"

const LessonsLayout = ({ children }) => {
  return (
    <DashboardLayout>
      <div id="lessons_module">{children}</div>
    </DashboardLayout>
  )
}

export default LessonsLayout
