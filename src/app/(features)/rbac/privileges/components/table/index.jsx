"use client"

import { useMemo } from "react"
import Table from "@/components/table"
import PrivilegesTableUtils from "./utils"
import samplePrivilegesTableData from "./utils/seeds"
import GlobalUtils from "@/lib/utils"
import privilegesTableConstants from "./utils/constants"
import PrivilegeCard from "./components/gridCard"
import { useNavigation } from "@/components/navigation"
import { Key, Plus } from "lucide-react"
import { EmptyState } from "@/components/emptyState"

const PrivilegesTable = ({ setSelectedPrivilege, setModalState, refreshTable }) => {
  const { navigate } = useNavigation()

  const formatTableData = (data) => ({
    rows: data?.records,
    actionData: PrivilegesTableUtils.getTableActions({ data, setModalState, setSelectedPrivilege, navigate }),
    url: "/rbac/privileges",
    pagination: GlobalUtils.tablePagination(data),
    sorting: privilegesTableConstants.SORTING,
    rowClickHandler: (row) => PrivilegesTableUtils.handleRowClick({ row, data, setModalState, setSelectedPrivilege }),
    externalFilters: privilegesTableConstants.FILTERS,
    tableHeader: PrivilegesTableUtils.getTableHeader({ data, setModalState, navigate }),
    checkbox: true,
    refreshTable: refreshTable || false,
    formatTableData,
    initialView: "grid",
    multiView: true,
    grid: {
      column: 4,
      card: (row) => <PrivilegeCard data={row} />,
    },
    emptyStateComponent: () => (
      <EmptyState
        icon={Key}
        title="No Privileges Found"
        description="You haven't created any privileges yet. Start by creating your first privilege to define specific permissions."
        actionLabel="Create Privilege"
        actionIcon={Plus}
        onAction={() => navigate("/rbac/privileges/form/add")}
        className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
      />
    ),
  })

  const tableData = useMemo(() => formatTableData(samplePrivilegesTableData), [refreshTable])

  return <Table tableData={tableData} />
}

export default PrivilegesTable
