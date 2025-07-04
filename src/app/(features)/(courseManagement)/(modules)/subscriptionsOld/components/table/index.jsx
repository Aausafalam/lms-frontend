"use client";

import { useMemo } from "react";
import Table from "@/components/table";
import SubscriptionsTableUtils from "./utils";
import sampleSubscriptionsTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import subscriptionsTableConstants from "./utils/constants";
import SubscriptionCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CreditCard, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";

const SubscriptionsTable = ({ onCourseDetailsPage = false, setSelectedSubscription, setModalState, refreshTable, hideBreadcrumb }) => {
    const { navigate } = useNavigation();

    const breadcrumbItems = [
        {
            title: "Subscriptions",
            href: `/subscriptions`,
            icon: <CreditCard className="h-3.5 w-3.5" />,
        },
    ];

    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: SubscriptionsTableUtils.getTableActions({
            data,
            setModalState,
            setSelectedSubscription,
            navigate,
        }),
        url: `/subscription`,
        pagination: GlobalUtils.tablePagination(data),
        sorting: subscriptionsTableConstants.SORTING,
        externalFilters: subscriptionsTableConstants.FILTERS,
        tableHeader: SubscriptionsTableUtils.getTableHeader({
            data,
            setModalState,
            navigate,
            title: onCourseDetailsPage ? "Subscription Plans" : <Breadcrumb items={breadcrumbItems} />,
            hideBreadcrumb,
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        grid: {
            column: onCourseDetailsPage ? 3 : 4,
            card: (row) => <SubscriptionCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={CreditCard}
                title="No Subscription Plans Found"
                description="You haven't created any subscription plans yet. Start by creating your first plan."
                actionLabel="Create Plan"
                actionIcon={Plus}
                onAction={() => navigate("/subscriptions/form/add")}
                className="bg-blue-50/50 dark:bg-blue-950/10 border-blue-200 dark:border-blue-800/30 my-3"
            />
        ),
    });

    const tableData = useMemo(() => formatTableData(sampleSubscriptionsTableData), [refreshTable, onCourseDetailsPage]);

    return (
        <div className="w-full">
            <Table tableData={tableData} />
        </div>
    );
};

export default SubscriptionsTable;
