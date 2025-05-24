"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import ModulesTableUtils from "./utils";
import sampleModulesTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import modulesTableConstants from "./utils/constants";
import ModuleCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Package } from "lucide-react";

const ModulesTable = ({ setSelectedModule, setModalState, refreshTable, hideBreadcrumb }) => {
    const { navigate } = useNavigation();
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: "/modules",
            icon: <Package className="h-3.5 w-3.5" />,
        },
    ];
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: ModulesTableUtils.getTableActions({ data, setModalState, setSelectedModule }),
        url: modulesTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: modulesTableConstants.SORTING,
        rowClickHandler: (row) => ModulesTableUtils.handleRowClick({ row, data, setModalState, setSelectedModule }),
        externalFilters: modulesTableConstants.FILTERS,
        tableHeader: ModulesTableUtils.getTableHeader({ data, setModalState, styles, navigate, title: <Breadcrumb items={breadcrumbItems} />, hideBreadcrumb }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: 5,
            card: (row) => <ModuleCard data={row} />,
        },
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleModulesTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default ModulesTable;
