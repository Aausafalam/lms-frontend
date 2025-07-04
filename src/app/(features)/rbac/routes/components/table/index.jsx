"use client";

import { useMemo } from "react";
import Table from "@/components/table";
import RoutesTableUtils from "./utils";
import sampleRoutesTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import routesTableConstants from "./utils/constants";
import RouteCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Route, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";

const RoutesTable = ({ setSelectedRoute, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();

    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: RoutesTableUtils.getTableActions({ data, setModalState, setSelectedRoute, navigate }),
        url: routesTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data?.pagination || {}),
        sorting: routesTableConstants.SORTING,
        rowClickHandler: (row) => RoutesTableUtils.handleRowClick({ row, data, setModalState, setSelectedRoute }),
        externalFilters: routesTableConstants.FILTERS,
        tableHeader: RoutesTableUtils.getTableHeader({ data, setModalState, navigate }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "table",
        multiView: true,
        grid: {
            column: 5,
            card: (row, view) => <RouteCard data={row} view={view} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={Route}
                title="No Routes Found"
                description="You haven't registered any API routes yet. Start by adding your first route."
                actionLabel="Add Route"
                actionIcon={Plus}
                onAction={() => navigate("/rbac/routes/form/add")}
            />
        ),
    });

    const tableData = useMemo(() => formatTableData(sampleRoutesTableData), [refreshTable]);

    return <Table tableData={tableData} />;
};

export default RoutesTable;
