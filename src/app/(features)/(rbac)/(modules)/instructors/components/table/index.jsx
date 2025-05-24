"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import InstructorsTableUtils from "./utils";
import sampleInstructorsTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import instructorsTableConstants from "./utils/constants";
import { InstructorCard } from "./components/gridCard";
import { useNavigation } from "@/components/navigation";

const InstructorsTable = ({ setSelectedInstructor, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: InstructorsTableUtils.getTableActions({ data, setModalState, setSelectedInstructor }),
        url: instructorsTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: instructorsTableConstants.SORTING,
        rowClickHandler: (row) => InstructorsTableUtils.handleRowClick({ row, data, setModalState, setSelectedInstructor }),
        externalFilters: instructorsTableConstants.FILTERS,
        tableHeader: InstructorsTableUtils.getTableHeader({ data, setModalState, styles, navigate }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: 4,
            card: (row) => <InstructorCard data={row} />,
        },
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleInstructorsTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default InstructorsTable;
