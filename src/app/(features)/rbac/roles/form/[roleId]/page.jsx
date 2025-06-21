"use client"
import { useParams } from "next/navigation"
import RoleFormBase from ".."
import { sampleRoleData } from "../utils/seeds"

const EditRole = () => {
  const { roleId } = useParams()

  // In a real app, you would fetch the role data here
  const data = sampleRoleData // Replace with actual API call

  if (!data) {
    return <div className="flex items-center justify-center h-64">Role data not found.</div>
  }

  return <RoleFormBase initialData={data} roleId={roleId} />
}

export default EditRole
