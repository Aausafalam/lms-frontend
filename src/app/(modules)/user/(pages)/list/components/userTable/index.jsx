"use client";
import Table from "@/components/table";
import ICON from "@/components/table/utils/icon";
import UserAvatar from "@/components/UserAvatar";
import Utils from "@/lib/utils";
import React, { useState } from "react";
import styles from "./index.module.css";
import TableUtils from "@/components/table/utils";
import UserICONS from "@/app/(modules)/user/utils/icons";
import UserForm from "../userForm";
import Modal from "@/components/Popup/Popup";
import GlobalUtils from "@/lib/utils";

const UserTable = () => {
    const [show, setShow] = useState({});
    const [userDetails, setUserDetails] = useState(null);

    const closeModel = () => setShow({ add: false, edit: false, delete: false });
    const initializeTableData = {
        totalPages: 16,
        totalDocuments: 156,
        data: [
            {
                _id: "6486cae128ee4e1728606f902c",
                name: "Beverlie Krabbe",
                email: "bkrabbe1d@home.pl",
                role: "Editor",
                plan: "Company",
                billing: "Manual-Case",
                status: "Active",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-1-DMk2FF1-.png",
            },
            {
                _id: "6486caeeee1284e1728606f902c",
                name: "Paulie Durber",
                email: "pdurber1c@gov.uk",
                role: "Subscriber",
                plan: "Team",
                billing: "Manual-PayPal",
                status: "Inactive",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-2-D5OQ4OGs.png",
            },
            {
                _id: "e45436565",
                name: "Onfre Wind",
                email: "owind1b@yandex.ru",
                role: "Admin",
                plan: "Basic",
                billing: "Manual-PayPal",
                status: "Pending",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-3-BxDW4ia1.png",
            },
            {
                Id: "e454365",
                name: "Karena Courtliff",
                email: "kcourtliff1a@bbc.co.uk",
                role: "Admin",
                plan: "Basic",
                billing: "Manual-Credit Card",
                status: "Active",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-6-B6-OBpiL.png",
            },
            {
                Id: "e454365",
                name: "Saunder Offner",
                email: "soffner19@mac.com",
                role: "maintainer",
                plan: "enterprise",
                billing: "Manual-Credit Card",
                status: "Pending",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-4-CtU30128.png",
            },
            {
                Id: "e454365",
                name: "Corrie Perot",
                email: "cperot18@goo.ne.jp",
                role: "subscriber",
                plan: "team",
                billing: "Manual-Credit Card",
                status: "Pending",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-5-CmycerLe.png",
            },
            {
                Id: "e454365",
                name: "Vladamir Koschek",
                email: "vkoschek17@abc.net.au",
                role: "author",
                plan: "team",
                billing: "Manual-Credit Card",
                status: "Active",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-1-DMk2FF1-.png",
            },
            {
                Id: "e454365",
                name: "Micaela McNirlan",
                email: "mmcnirlan16@hc360.com",
                role: "admin",
                plan: "basic",
                billing: "Auto Debit",
                status: "Inactive",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-2-D5OQ4OGs.png",
            },
            {
                Id: "e454365",
                name: "Benedetto Rossiter",
                email: "brossiter15@craigslist.org",
                role: "editor",
                plan: "team",
                billing: "Auto Debit",
                status: "Inactive",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-1-DMk2FF1-.png",
            },
            {
                Id: "e454365",
                name: "Edwina Baldetti",
                email: "ebaldetti14@theguardian.com",
                role: "maintainer",
                plan: "team",
                billing: "Auto Debit",
                status: "Pending",
                image: "https://demos.pixinvent.com/vuexy-vuejs-laravel-admin-template/demo-1/build/assets/avatar-1-DMk2FF1-.png",
            },
        ],
    };
    const externalFilters = {
        title: "Users List",
        // filterOnSubmit: true,
        filterFields: [],
    };

    const tableHeader = {
        limit: {
            defaultValue: "20",
            limitStart: "10",
            limitEnd: "50",
            multipleOf: "10",
        },
        actionButtons: [
            {
                variant: "primary",
                icon: ICON.PLUS,
                label: "Add  User",
                onClick: () => {
                    setShow({ add: true });
                    console.log("user clicked add user button");
                },
            },
            TableUtils.getExportButton({ url: "/export" }),
        ],
        filters: [
            {
                type: "text",
                name: "searchText",
                grid: 2,
                placeholder: "Select User",
                autoSuggestion: {
                    initialData: TableUtils.formatDataForAutoSuggestion(initializeTableData.data, ["name", "email", "role"]),
                    autoSuggestionUrl: "/api/suggestions",
                    minChars: 1,
                    maxSuggestions: 5,
                },
            },
        ],
    };

    function formatTableData(data) {
        return {
            title: "Active Employees List",
            rows: data?.data?.map((item) => {
                item.userDetails = {
                    name: item.name,
                    image: item.image,
                    email: item.email,
                    _id: item._id,
                };

                const data = {
                    Id: { key: "_id", value: item._id, type: "hidden" },
                    User: {
                        key: "name",
                        value: <UserAvatar userDetails={item.userDetails} />,
                        originalValue: Utils.capitalizeEachWord(item.userDetails?.name) || "",
                        suggestionValue: Utils.capitalizeEachWord(item.userDetails?.name) || "",
                    },
                    Role: {
                        key: "role",
                        value: (
                            <p className={styles.role}>
                                <span className={styles[item.role.toLowerCase()]}>{UserICONS?.[item.role.toUpperCase()]}</span>
                                <span>{item.role}</span>
                            </p>
                        ),
                    },
                    Plan: { key: "plan", value: item.plan },
                    billing: { key: "billing", value: <span className={styles.billing}>{item.billing}</span> },
                    status: { key: "status", value: <span className={`${styles.status} ${styles[item.status]}`}>{item.status}</span> },
                };
                return data;
            }),
            actionData: [
                {
                    name: "Delete",
                    functions: (row) => {
                        console.log(row);
                    },
                    label: "Delete User",
                    Id: "Id",
                },
                {
                    name: "View",
                    functions: (row) => {},
                    label: "View  Details",
                    Id: "Id",
                },
                {
                    name: "Edit",
                    functions: (row) => {
                        setUserDetails(data?.data?.find((item) => row["Id"].value === item._id));
                        setShow({ edit: true, add: false, remove: false });
                    },
                    label: "Edit Details",
                    Id: "Id",
                },
                {
                    name: "Duplicate",
                    functions: (row) => {
                        setUserDetails(data?.data?.find((item) => row["Id"].value === item._id));
                        setShow({ edit: true, add: false, remove: false });
                    },
                    label: "Duplicate User",
                    Id: "Id",
                },
            ],
            url: `/getlistofuserdata`,
            pagination: {
                totalPage: data.totalPages || "0",
                totalItemCount: data.totalDocuments || "0",
            },
            sorting: {
                initialSort: "User",
                initialSortOrder: "asc",
            },
            formatTableData: formatTableData,
            rowClickHandler: (row) => {
                console.log(row);
            },
            externalFilters,
            tableHeader,
            checkbox: true,
        };
    }

    const tableData = React.useMemo(() => formatTableData(initializeTableData), []);

    return (
        <div>
            {<Table tableData={tableData} />}

            <Modal show={show.add} onClose={closeModel} title={"Add User"} maxWidth={"800px"}>
                <UserForm onCancel={closeModel} />
            </Modal>
            <Modal show={show.edit} onClose={closeModel} title={"Edit User"} maxWidth={"800px"}>
                <UserForm onCancel={closeModel} data={userDetails} />
            </Modal>
        </div>
    );
};

export default UserTable;
