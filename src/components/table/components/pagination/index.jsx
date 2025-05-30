import React, { useCallback, useMemo, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import styles from "./index.module.css";
import ICON from "../../utils/icon";
import { useSearchParams } from "next/navigation";
import SelectField from "@/components/form/components/FieldTemplates/SelectField";

const TablePagination = ({ initialValues, router, data }) => {
    const searchParams = useSearchParams();
    const urlPage = Number(searchParams.get("page")) || initialValues?.page || 1;
    const itemsPerPage = initialValues?.limit || 10;
    const [formValues, setFormValues] = useState(initialValues);
    const [pagination, setPagination] = useState({
        page: urlPage,
    });

    useEffect(() => {
        setPagination((prev) => ({ ...prev, page: urlPage }));
    }, [urlPage]);

    const setQueryParam = useCallback(
        (key, value) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            router.replace(`?${params.toString()}`);
        },
        [searchParams, router]
    );

    const itemRange = useMemo(() => {
        if (!data?.pagination?.totalItemCount) return "";
        const start = (pagination.page - 1) * itemsPerPage + 1;
        const end = Math.min(pagination.page * itemsPerPage, data?.pagination?.totalItemCount);
        return `${start} to ${end}`;
    }, [pagination.page, itemsPerPage, data?.pagination?.totalItemCount]);

    // Update both local state and URL
    const handlePageClick = useCallback(
        (event) => {
            const newPage = event.selected + 1;
            setPagination((prev) => ({ ...prev, page: newPage }));
            setQueryParam("page", newPage);
        },
        [setQueryParam]
    );

    // Jump to first page handlers
    const handleFirstPage = useCallback(() => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        setQueryParam("page", 1);
    }, [setQueryParam]);

    // Jump to last page handlers
    const handleLastPage = useCallback(() => {
        setPagination((prev) => ({ ...prev, page: data?.pagination?.totalPage }));
        setQueryParam("page", data?.pagination?.totalPage);
    }, [setQueryParam, data?.pagination?.totalPage]);

    if (!data?.pagination) return null;

    const generateOptions = (limitConfig) => {
        const options = [];
        const start = parseInt(limitConfig?.limitStart || 10, 10);
        const end = parseInt(limitConfig?.limitEnd || 50, 10);
        const step = parseInt(limitConfig?.multipleOf || 10, 10);

        for (let i = start; i <= end; i += step) {
            options.push({ label: i.toString(), value: i.toString() });
        }

        return options;
    };

    return (
        <div className={styles.container}>
            <div className="flex gap-4 align-middle justify-center mb-[-0.5rem] mt-2">
                <div className={styles.limit}>
                    {data.tableHeader.limit && (
                        <SelectField
                            formField={{
                                id: "limit",
                                name: "limit",
                                options: generateOptions(data.tableHeader.limit),
                                defaultValue: formValues?.["limit"] || data.tableHeader?.limit?.defaultValue || "10",
                                onChange: (event) => {
                                    const { name, value } = event.target;
                                    setFormValues((prev) => ({ ...prev, [name]: value }));
                                    setQueryParam(name, value);
                                },
                            }}
                        />
                    )}
                </div>
                <div>
                    <p className="relative top-[-0.4rem]">
                        Showing {itemRange} of {data?.pagination?.totalItemCount} entries
                    </p>
                </div>
            </div>
            <div>
                <button onClick={handleFirstPage} className={`pagination_arrow ${pagination.page === 1 ? "disabled" : ""}`} disabled={pagination.page === 1}>
                    {ICON.CHEVRONS_LEFT}
                </button>

                <ReactPaginate
                    previousLabel={ICON.LEFT}
                    previousClassName="pagination_arrow"
                    nextLabel={ICON.RIGHT}
                    nextClassName="pagination_arrow"
                    breakLabel="..."
                    pageCount={data.pagination.totalPage}
                    marginPagesDisplayed={data.marginPagesDisplayed || 2}
                    pageRangeDisplayed={data.pageRangeDisplayed || 3}
                    onPageChange={handlePageClick}
                    containerClassName={styles.pagination}
                    activeClassName={styles.active}
                    forcePage={pagination.page - 1}
                />

                <button
                    onClick={handleLastPage}
                    className={`pagination_arrow ${pagination.page === data?.pagination?.totalPage ? "disabled" : ""}`}
                    disabled={pagination.page === data?.pagination?.totalPage}
                >
                    {ICON.CHEVRONS_RIGHT}
                </button>
            </div>
        </div>
    );
};

export default React.memo(TablePagination);
