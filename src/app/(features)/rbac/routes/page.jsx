"use client"

import React from "react"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Shield, Route } from "lucide-react"
import RoutesTable from "./components/table"
import useModalHandler from "./hooks/useModalHandler"
import DeleteRoute from "./components/delete"

const APIRoutes = () => {
  const { modalType, routeId, closeModal, setModalState } = useModalHandler()
  const [refreshTable, setRefreshTable] = React.useState(false)
  const [selectedRoute, setSelectedRoute] = React.useState(null)

  const breadcrumbItems = [
    {
      title: "RBAC Management",
      href: "/rbac",
      icon: <Shield className="h-3.5 w-3.5" />,
    },
    {
      title: "API Routes",
      href: "/rbac/routes",
      icon: <Route className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      <RoutesTable setModalState={setModalState} refreshTable={refreshTable} setSelectedRoute={setSelectedRoute} />

      {/* Delete Route Modal */}
      <DeleteRoute
        modalState={{ delete: modalType === "delete" }}
        closeModal={closeModal}
        routeId={routeId}
        setRefreshTable={setRefreshTable}
      />
    </div>
  )
}

export default APIRoutes
