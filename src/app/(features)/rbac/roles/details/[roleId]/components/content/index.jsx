"use client"

import { OverviewTab } from "./tabs/overview"
import { PrivilegesTab } from "./tabs/privileges"
import { UsersTab } from "./tabs/users"
import { ActivityTab } from "./tabs/activity"

export function RoleDetailsContent({ activeTab, roleData }) {
  switch (activeTab) {
    case "overview":
      return <OverviewTab roleData={roleData} />
    case "privileges":
      return <PrivilegesTab roleData={roleData} />
    case "users":
      return <UsersTab roleData={roleData} />
    case "activity":
      return <ActivityTab roleData={roleData} />
    default:
      return <OverviewTab roleData={roleData} />
  }
}
