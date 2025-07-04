"use client";
import { useParams } from "next/navigation";
import PrivilegeFormBase from "..";
import { samplePrivilegeData } from "../utils/seeds";
import { usePermissionGetDetails } from "@/services/hooks/permission";
import { useEffect } from "react";

const EditPrivilege = () => {
    const { privilegeId } = useParams();

    const { permissionDetails } = usePermissionGetDetails();

    useEffect(() => {
        permissionDetails.fetch({
            dynamicRoute: privilegeId,
        });
    }, []);

    // In a real app, you would fetch the privilege data here
    const data = permissionDetails?.data?.data || samplePrivilegeData;

    if (!data) {
        return <div className="flex items-center justify-center h-64">Privilege data not found.</div>;
    }

    return <PrivilegeFormBase initialData={data} privilegeId={privilegeId} />;
};

export default EditPrivilege;
