"use client";
import { useParams } from "next/navigation";
import PrivilegeGroupFormBase from "..";
import { samplePrivilegeGroupData } from "../utils/seeds";
import { usePermissionGroupGetDetails } from "@/services/hooks/permissionGroup";
import { useEffect } from "react";

const EditPrivilegeGroup = () => {
    const { privilegeGroupId } = useParams();
    const { permissionGroupDetails } = usePermissionGroupGetDetails();

    useEffect(() => {
        permissionGroupDetails.fetch({
            dynamicRoute: privilegeGroupId,
        });
    }, []);

    // In a real app, you would fetch the privilege group data here
    const data = permissionGroupDetails?.data?.data || samplePrivilegeGroupData;

    if (!data) {
        return <div className="flex items-center justify-center h-64">Privilege Group data not found.</div>;
    }

    return <PrivilegeGroupFormBase initialData={data} privilegeGroupId={privilegeGroupId} />;
};

export default EditPrivilegeGroup;
