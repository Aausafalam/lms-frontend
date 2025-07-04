import DashboardLayout from "@/app/layouts/index"

const SubscriptionsLayout = ({ children }) => {
  return (
    <DashboardLayout>
      <div id="subscriptions_module">{children}</div>
    </DashboardLayout>
  )
}

export default SubscriptionsLayout
