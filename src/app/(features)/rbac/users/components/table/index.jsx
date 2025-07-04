"use client";

import { useMemo } from "react";
import Table from "@/components/table";
import UsersTableUtils from "./utils";
import sampleUsersTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import usersTableConstants from "./utils/constants";
import UserCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Users, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";

const UsersTable = ({ setSelectedUser, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();

    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: UsersTableUtils.getTableActions({ data, setModalState, setSelectedUser, navigate }),
        url: "/rbac/users",
        pagination: GlobalUtils.tablePagination(data),
        sorting: usersTableConstants.SORTING,
        rowClickHandler: (row) => UsersTableUtils.handleRowClick({ row, data, setModalState, setSelectedUser }),
        externalFilters: usersTableConstants.FILTERS,
        tableHeader: UsersTableUtils.getTableHeader({ data, setModalState, navigate }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: true,
        grid: {
            column: 4,
            card: (row) => <UserCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={Users}
                title="No Users Found"
                description="You haven't created any users yet. Start by creating your first user to manage system access."
                actionLabel="Create User"
                actionIcon={Plus}
                onAction={() => navigate("/rbac/users/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    const tableData = useMemo(() => formatTableData(sampleUsersTableData), [refreshTable]);

    return <Table tableData={tableData} />;
};

export default UsersTable;
