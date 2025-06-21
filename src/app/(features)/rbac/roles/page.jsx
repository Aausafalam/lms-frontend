"use client"

import React from "react"
import { Breadcrumb } from "@/components/Breadcrumb"
import { Shield, UserCheck } from "lucide-react"
import RolesTable from "./components/table"
import useModalHandler from "./hooks/useModalHandler"
import DeleteRole from "./components/delete"

const Roles = () => {
  const { modalType, roleId, closeModal, setModalState } = useModalHandler()
  const [refreshTable, setRefreshTable] = React.useState(false)
  const [selectedRole, setSelectedRole] = React.useState(null)

  const breadcrumbItems = [
    {
      title: "RBAC Management",
      href: "/rbac",
      icon: <Shield className="h-3.5 w-3.5" />,
    },
    {
      title: "Roles",
      href: "/rbac/roles",
      icon: <UserCheck className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-6" />
      <RolesTable setModalState={setModalState} refreshTable={refreshTable} setSelectedRole={setSelectedRole} />

      {/* Delete Role Modal */}
      <DeleteRole
        modalState={{ delete: modalType === "delete" }}
        closeModal={closeModal}
        roleId={roleId}
        setRefreshTable={setRefreshTable}
      />
    </div>
  )
}

export default Roles
