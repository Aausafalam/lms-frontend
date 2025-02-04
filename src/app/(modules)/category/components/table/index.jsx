"use client";
import React, { useState, useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import Modal from "@/components/Popup/Popup";
import categoryTableConstants from "./utils/constants";
import CategoryTableUtils from "./utils";
import sampleCategoryTableData from "./utils/seeds";
import GlobalICONS from "@/lib/utils/icons";
import CategoryForm from "../form";
import Details from "../details";

const CategoryTable = () => {
    const [show, setShow] = useState({});
    const [categoryDetails, setCategoryDetails] = useState(null);

    const closeModal = () => setShow({ add: false, edit: false, delete: false });

    const getTableData = (data) => ({
        rows: CategoryTableUtils.tableRow(data),
        actionData: CategoryTableUtils.tableActionData({ data, setShow, setCategoryDetails }),
        url: categoryTableConstants.TABLE_API_URL,
        pagination: CategoryTableUtils.tablePagination(data),
        sorting: categoryTableConstants.TABLE_SORTING,
        getTableData,
        rowClickHandler: (row) => console.log(row),
        externalFilters: categoryTableConstants.externalFilters,
        tableHeader: CategoryTableUtils.tableHeader({ data, setShow, styles }),
        checkbox: true,
    });

    const tableData = useMemo(() => getTableData(sampleCategoryTableData), []);

    return (
        <div className={styles.container}>
            {<Table tableData={tableData} />}

            <Modal
                show={show.add}
                onClose={closeModal}
                title={"Add Category"}
                maxWidth={"1200px"}
                icon={GlobalICONS.CATEGORY}
                description="Provide the required details to configure and register a new category"
            >
                <CategoryForm />
            </Modal>
            <Modal show={show.edit} onClose={closeModal} title={"Edit Category Details"} maxWidth={"1200px"} icon={GlobalICONS.CATEGORY} description="Edit the specified category details">
                <CategoryForm data={categoryDetails} />
            </Modal>
            <Modal
                show={show.view}
                onClose={closeModal}
                title={"Category Details"}
                maxWidth={"1600px"}
                icon={GlobalICONS.CATEGORY}
                description="Provide the required details to configure and register a new desktop"
            >
                <Details data={categoryDetails} />
            </Modal>
        </div>
    );
};

export default CategoryTable;
