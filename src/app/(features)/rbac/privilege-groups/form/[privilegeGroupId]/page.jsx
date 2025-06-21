"use client"
import { useParams } from "next/navigation"
import PrivilegeGroupFormBase from ".."
import { samplePrivilegeGroupData } from "../utils/seeds"

const EditPrivilegeGroup = () => {
  const { privilegeGroupId } = useParams()

  // In a real app, you would fetch the privilege group data here
  const data = samplePrivilegeGroupData // Replace with actual API call

  if (!data) {
    return <div className="flex items-center justify-center h-64">Privilege Group data not found.</div>
  }

  return <PrivilegeGroupFormBase initialData={data} privilegeGroupId={privilegeGroupId} />
}

export default EditPrivilegeGroup
