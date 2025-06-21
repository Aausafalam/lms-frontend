"use client"

import React from "react"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Shield, Settings } from "lucide-react"
import PrivilegeGroupsTable from "./components/table"
import useModalHandler from "./hooks/useModalHandler"
import DeletePrivilegeGroup from "./components/delete"

const PrivilegeGroups = () => {
  const { modalType, privilegeGroupId, closeModal, setModalState } = useModalHandler()
  const [refreshTable, setRefreshTable] = React.useState(false)
  const [selectedPrivilegeGroup, setSelectedPrivilegeGroup] = React.useState(null)

  const breadcrumbItems = [
    {
      title: "RBAC Management",
      href: "/rbac",
      icon: <Shield className="h-3.5 w-3.5" />,
    },
    {
      title: "Privilege Groups",
      href: "/rbac/privilege-groups",
      icon: <Settings className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      <PrivilegeGroupsTable
        setModalState={setModalState}
        refreshTable={refreshTable}
        setSelectedPrivilegeGroup={setSelectedPrivilegeGroup}
      />

      {/* Delete Privilege Group Modal */}
      <DeletePrivilegeGroup
        modalState={{ delete: modalType === "delete" }}
        closeModal={closeModal}
        privilegeGroupId={privilegeGroupId}
        setRefreshTable={setRefreshTable}
      />
    </div>
  )
}

export default PrivilegeGroups
