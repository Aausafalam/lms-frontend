"use client";

import { useMemo } from "react";
import Table from "@/components/table";
import PrivilegeGroupsTableUtils from "./utils";
import samplePrivilegeGroupsTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import privilegeGroupsTableConstants from "./utils/constants";
import PrivilegeGroupCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Settings, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";

const PrivilegeGroupsTable = ({ setSelectedPrivilegeGroup, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();

    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: PrivilegeGroupsTableUtils.getTableActions({ data, setModalState, setSelectedPrivilegeGroup, navigate }),
        url: "/rbac/privilege-groups",
        pagination: GlobalUtils.tablePagination(data),
        sorting: privilegeGroupsTableConstants.SORTING,
        rowClickHandler: (row) => PrivilegeGroupsTableUtils.handleRowClick({ row, data, setModalState, setSelectedPrivilegeGroup }),
        externalFilters: privilegeGroupsTableConstants.FILTERS,
        tableHeader: PrivilegeGroupsTableUtils.getTableHeader({ data, setModalState, navigate }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: true,
        grid: {
            column: 4,
            card: (row) => <PrivilegeGroupCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={Settings}
                title="No Privilege Groups Found"
                description="You haven't created any privilege groups yet. Start by creating your first privilege group to organize permissions."
                actionLabel="Create Privilege Group"
                actionIcon={Plus}
                onAction={() => navigate("/rbac/privilege-groups/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    const tableData = useMemo(() => formatTableData(samplePrivilegeGroupsTableData), [refreshTable]);

    return <Table tableData={tableData} />;
};

export default PrivilegeGroupsTable;
