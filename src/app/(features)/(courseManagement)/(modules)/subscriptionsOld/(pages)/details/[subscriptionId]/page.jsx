"use client"

import { Breadcrumb } from "@/components/Breadcrumb"
import { LayoutDashboard, CreditCard } from "lucide-react"
import { SidebarNavigation } from "./components/sidebar"
import SubscriptionDetailsContent from "./components/content"
import { useState } from "react"

export default function SubscriptionDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const breadcrumbItems = [
    {
      title: "Courses",
      href: "/courses",
      icon: <LayoutDashboard className="h-3.5 w-3.5" />,
    },
    {
      title: "Subscriptions",
      href: "/subscriptions",
      icon: <CreditCard className="h-3.5 w-3.5" />,
    },
    {
      title: "Plan Details",
      href: "subscriptions/details/1",
      icon: <CreditCard className="h-3.5 w-3.5" />,
    },
  ]

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="">
        <Breadcrumb items={breadcrumbItems} className="mb-4" />

        <div className="flex gap-4">
          <div className="">
            <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="w-full">
            <div className="dark:border-gray-700 overflow-hidden">
              <div className="">
                <SubscriptionDetailsContent activeTab={activeTab} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-around">
            {["overview", "features", "analytics", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
