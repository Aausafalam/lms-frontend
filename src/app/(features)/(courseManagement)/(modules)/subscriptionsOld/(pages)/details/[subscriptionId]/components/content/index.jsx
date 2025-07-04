import { SubscriptionDetailPreview } from "../../../../form/components/preview/subscription-detail-preview"
import { sampleSubscriptionData } from "../../../../form/utils/seeds"

const SubscriptionDetailsContent = ({ activeTab }) => {
  switch (activeTab) {
    case "overview":
      return (
        <SubscriptionDetailPreview initialData={sampleSubscriptionData} viewportWidth={1024} onDetailsPage={true} />
      )
    case "features":
      return <div className="p-6 text-center text-gray-500">Features management will be displayed here</div>
    case "analytics":
      return <div className="p-6 text-center text-gray-500">Analytics and metrics will be displayed here</div>
    case "settings":
      return <div className="p-6 text-center text-gray-500">Plan settings will be displayed here</div>
    default:
      return (
        <SubscriptionDetailPreview initialData={sampleSubscriptionData} viewportWidth={1024} onDetailsPage={true} />
      )
  }
}

export default SubscriptionDetailsContent
