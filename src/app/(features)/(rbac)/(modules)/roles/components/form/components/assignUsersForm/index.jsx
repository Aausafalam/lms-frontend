import React from "react";
import { Button } from "../..";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRoles } from "@/services/context/roles";
import UsersTable from "@/app/(features)/(rbac)/(modules)/users/components/table";

const AssignUsersForm = ({ selectedUsers, setSelectedUsers }) => {
    const searchParams = useSearchParams();
    const roleId = searchParams.get("roleId");
    const { rolesAssignUsers } = useRoles();

    const handleSubmit = () => {
        rolesAssignUsers.execute({
            payload: { roleId, userIds: selectedUsers },
            onSuccess: (data) => {
                handleNextTab(data.data);
            },
            onError: (error) => {
                console.error("Failed to attach users:", error);
            },
        });
    };

    console.log("selectedUsers", selectedUsers);

    return (
        <div>
            <UsersTable setSelectedRow={setSelectedUsers} view="roles" key={"user-assign-table"} />
            <div className="mt-8 flex justify-end">
                <Button onClick={handleSubmit}>
                    Save <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default AssignUsersForm;
