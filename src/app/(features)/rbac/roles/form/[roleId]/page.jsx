"use client";
import { useParams } from "next/navigation";
import RoleFormBase from "..";
import { sampleRoleData } from "../utils/seeds";
import { useRolesGetDetails } from "@/services/hooks/roles";
import { useEffect } from "react";

const EditRole = () => {
    const { roleId } = useParams();
    const { rolesDetails } = useRolesGetDetails();

    useEffect(() => {
        rolesDetails.fetch({
            dynamicRoute: roleId,
        });
    }, []);

    // In a real app, you would fetch the privilege data here
    const data = rolesDetails?.data?.data || sampleRoleData;

    if (!data) {
        return <div className="flex items-center justify-center h-64">Role data not found.</div>;
    }

    return <RoleFormBase initialData={data} roleId={roleId} />;
};

export default EditRole;
