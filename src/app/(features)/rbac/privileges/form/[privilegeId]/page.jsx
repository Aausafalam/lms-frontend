"use client"
import { useParams } from "next/navigation"
import PrivilegeFormBase from ".."
import { samplePrivilegeData } from "../utils/seeds"

const EditPrivilege = () => {
  const { privilegeId } = useParams()

  // In a real app, you would fetch the privilege data here
  const data = samplePrivilegeData // Replace with actual API call

  if (!data) {
    return <div className="flex items-center justify-center h-64">Privilege data not found.</div>
  }

  return <PrivilegeFormBase initialData={data} privilegeId={privilegeId} />
}

export default EditPrivilege
