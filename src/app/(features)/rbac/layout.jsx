import DashboardLayout from "@/app/layouts/index"

const RBACLayout = ({ children }) => {
  return (
    <DashboardLayout>
      <div id="rbac_management_module">{children}</div>
    </DashboardLayout>
  )
}

export default RBACLayout
