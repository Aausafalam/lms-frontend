"use client"

import React from "react"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Shield, Key } from "lucide-react"
import PrivilegesTable from "./components/table"
import useModalHandler from "./hooks/useModalHandler"
import DeletePrivilege from "./components/delete"

const Privileges = () => {
  const { modalType, privilegeId, closeModal, setModalState } = useModalHandler()
  const [refreshTable, setRefreshTable] = React.useState(false)
  const [selectedPrivilege, setSelectedPrivilege] = React.useState(null)

  const breadcrumbItems = [
    {
      title: "RBAC Management",
      href: "/rbac",
      icon: <Shield className="h-3.5 w-3.5" />,
    },
    {
      title: "Privileges",
      href: "/rbac/privileges",
      icon: <Key className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      <PrivilegesTable
        setModalState={setModalState}
        refreshTable={refreshTable}
        setSelectedPrivilege={setSelectedPrivilege}
      />

      {/* Delete Privilege Modal */}
      <DeletePrivilege
        modalState={{ delete: modalType === "delete" }}
        closeModal={closeModal}
        privilegeId={privilegeId}
        setRefreshTable={setRefreshTable}
      />
    </div>
  )
}

export default Privileges
