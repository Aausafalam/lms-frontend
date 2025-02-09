"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import categoryTableConstants from "./utils/constants";
import CategoryTableUtils from "./utils";
import sampleCategoryTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";

const CategoryTable = ({ setDetails, setShow }) => {
    const formatTableData = (data) => ({
        rows: CategoryTableUtils.tableRow(data),
        actionData: CategoryTableUtils.tableActionData({ data, setShow, setDetails }),
        url: categoryTableConstants.TABLE_API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: categoryTableConstants.TABLE_SORTING,
        formatTableData,
        rowClickHandler: (row) => console.log(row),
        externalFilters: categoryTableConstants.externalFilters,
        tableHeader: CategoryTableUtils.tableHeader({ data, setShow, styles }),
        checkbox: true,
    });

    const tableData = useMemo(() => formatTableData(sampleCategoryTableData), []);

    return <div className={styles.container}>{<Table tableData={tableData} />}</div>;
};

export default CategoryTable;
