"use client"

import { useState } from "react"
import SubscriptionsTable from "./components/table"
import useModalHandler from "./hooks/useModalHandler"
import DeleteSubscription from "./components/delete"

const SubscriptionPlans = () => {
  const { modalType, subscriptionId, closeModal, setModalState } = useModalHandler()
  const [refreshTable, setRefreshTable] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState(null)

  return (
    <div className="min-h-screen">
      <div className="">
        <SubscriptionsTable
          setModalState={setModalState}
          refreshTable={refreshTable}
          setSelectedSubscription={setSelectedSubscription}
        />
        <DeleteSubscription
          modalState={{ delete: modalType === "delete" }}
          closeModal={closeModal}
          subscriptionId={subscriptionId}
          setRefreshTable={setRefreshTable}
        />
      </div>
    </div>
  )
}

export default SubscriptionPlans
