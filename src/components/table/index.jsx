import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles/index.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import DataNotFound from "../DataNotFound";
import apiClient from "@/services/api/config";
import "./styles/index.css";
import "./styles/root.css";
import TableFilter from "./components/filters";
import TableSearch from "./components/searches";
import TablePagination from "./components/pagination";
import TableError from "./components/tableError";
import TableView from "./components/tableView";
import GridView from "./components/gridView";

const Table = ({ tableData }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialValues = React.useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

    const [data, setData] = useState(tableData);
    const [dataView, setDataView] = useState({ [tableData.initialView || "table"]: true });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [checkboxState, setCheckboxState] = useState({});

    // Function to fetch paginated data
    const fetchData = useCallback(
        async (payload) => {
            const url = tableData?.url;
            if (!url) return;
            //  setIsLoading(true);
            setError(null);
            try {
                const response = await apiClient.get(data.url, { params: payload });
                const newData = tableData.formatTableData(response.data.data);
                setData(newData);
            } catch (err) {
                console.error("Error fetching data:", err);
                // setError("Failed to fetch data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        },
        [tableData?.url]
    );

    useEffect(() => {
        if (tableData) {
            setData(tableData);
        }
    }, [tableData]);

    useEffect(() => {
        tableData.setSelectedRow?.(
            Object.values(checkboxState || {})
                .map((row) => (row === true ? false : row))
                .filter(Boolean)
        );
    }, [checkboxState, tableData]);

    useEffect(() => {
        fetchData(initialValues);
    }, [initialValues, tableData?.url, tableData?.refreshTable]);

    console.log("checkboxState", checkboxState);

    return (
        <div key={tableData?.url} className={styles.table_container}>
            {/* Filters and Search */}
            <TableFilter router={router} initialValues={initialValues} data={data.externalFilters} />
            <TableSearch
                dataView={dataView}
                showDataViewButton={data.grid || data?.customView ? true : false}
                setDataView={setDataView}
                initialValues={initialValues}
                router={router}
                data={data.tableHeader}
            />

            <TableError error={error} />

            {/* Table View */}
            {dataView.table && <TableView isLoading={isLoading} checkboxState={checkboxState} setCheckboxState={setCheckboxState} data={data} router={router} initialValues={initialValues} />}

            {/* Grid View */}
            {dataView.grid && <GridView isLoading={isLoading} checkboxState={checkboxState} setCheckboxState={setCheckboxState} data={data} router={router} initialValues={initialValues} />}

            {/* Custom View */}
            {dataView.customView && <div className={styles.grid_view_container}>{data.rows?.length > 0 ? data.customView() : <DataNotFound message="Empty List" />}</div>}

            {/* Pagination */}
            <TablePagination data={data} router={router} initialValues={initialValues} />
        </div>
    );
};

export default React.memo(Table);
