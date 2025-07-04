"use client";

import { useMemo } from "react";
import Table from "@/components/table";
import RolesTableUtils from "./utils";
import sampleRolesTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import rolesTableConstants from "./utils/constants";
import RoleCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { UserCheck, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";

const RolesTable = ({ setSelectedRole, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();

    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: RolesTableUtils.getTableActions({ data, setModalState, setSelectedRole, navigate }),
        url: rolesTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data.pagination),
        sorting: rolesTableConstants.SORTING,
        rowClickHandler: (row) => RolesTableUtils.handleRowClick({ row, data, setModalState, setSelectedRole }),
        externalFilters: rolesTableConstants.FILTERS,
        tableHeader: RolesTableUtils.getTableHeader({ data, setModalState, navigate }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: true,
        grid: {
            column: 3,
            card: (row, view) => <RoleCard data={row} view={view} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={UserCheck}
                title="No Roles Found"
                description="You haven't created any roles yet. Start by creating your first role to define user permissions."
                actionLabel="Create Role"
                actionIcon={Plus}
                onAction={() => navigate("/rbac/roles/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    const tableData = useMemo(() => formatTableData(sampleRolesTableData), [refreshTable]);

    return <Table tableData={tableData} />;
};

export default RolesTable;
