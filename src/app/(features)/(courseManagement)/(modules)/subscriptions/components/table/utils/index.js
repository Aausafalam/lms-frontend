import TableUtils from "@/components/table/utils"
import TableIcon from "@/components/table/utils/icon"
import subscriptionsTableConstants from "./constants"
import { CreditCard } from "lucide-react"

class SubscriptionsTableUtils {
  static getTableHeader({ data, setModalState, navigate, title, hideBreadcrumb }) {
    const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"])

    return {
      title: hideBreadcrumb ? "Subscription Plans" : title,
      limit: subscriptionsTableConstants.LIMITS,
      actionButtons: [
        {
          icon: TableIcon.PLUS,
          label: "New Plan",
          onClick: () => navigate("/subscriptions/form/add"),
        },
        TableUtils.getExportButton({ url: "/subscriptions" }),
        {
          icon: <CreditCard />,
          iconOnly: true,
          onClick: () => navigate("/subscriptions/form/add"),
        },
      ],
      filters: [
        {
          name: "searchText",
          grid: 2,
          placeholder: "Search Plans",
          autoSuggestion: {
            initialData: autoSuggestions,
            autoSuggestionUrl: "/api/suggestions",
          },
        },
      ],
    }
  }

  static getTableActions({ data, setModalState, setSelectedSubscription, navigate }) {
    const handleAction = (row, actionType) => {
      const selectedSubscription = data?.records?.find((item) => row["id"] === item.id)

      if (actionType === "edit") {
        navigate(`/subscriptions/form/${row["id"]}`)
      } else {
        setSelectedSubscription(selectedSubscription)
        setModalState(actionType, selectedSubscription.id)
      }
    }

    return [
      { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Plan" },
      { name: "View", functions: (row) => handleAction(row, "view"), label: "View Details" },
      { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Plan" },
    ]
  }

  static handleRowClick({ row, data, setModalState, setSelectedSubscription }) {
    const selectedSubscription = data?.data?.find((item) => row["id"].value === item.id)
    setSelectedSubscription(selectedSubscription)
    setModalState("view", selectedSubscription?.id)
  }
}

export default SubscriptionsTableUtils
