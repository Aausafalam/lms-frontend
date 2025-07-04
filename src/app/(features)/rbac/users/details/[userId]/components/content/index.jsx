"use client"

import { useState } from "react"
import OverviewTab from "./tabs/overview"
import RolesTab from "./tabs/roles"
import ActivityTab from "./tabs/activity"
import SecurityTab from "./tabs/security"
import SettingsTab from "./tabs/settings"

const UserDetailsContent = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", component: OverviewTab },
    { id: "roles", label: "Roles & Permissions", component: RolesTab },
    { id: "activity", label: "Activity", component: ActivityTab },
    { id: "security", label: "Security", component: SecurityTab },
    { id: "settings", label: "Settings", component: SettingsTab },
  ]

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component

  return (
    <div className="flex-1 min-h-screen">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 ">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">{ActiveComponent && <ActiveComponent user={user} />}</div>
    </div>
  )
}

export default UserDetailsContent
