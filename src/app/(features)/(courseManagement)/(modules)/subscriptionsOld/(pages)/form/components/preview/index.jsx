"use client"

import { useState } from "react"
import { Smartphone, Tablet, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import Tabs from "@/components/tab"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { SubscriptionDetailPreview } from "./subscription-detail-preview"

const devicePresets = {
  mobile: 400,
  tablet: 768,
  desktop: 1224,
}

export function SubscriptionPreview({ data }) {
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState({ id: "mobile", label: "Mobile" })

  const tabs = [
    {
      id: "mobile",
      label: "Mobile",
      icon: <Smartphone className="h-3.5 w-3.5" />,
      content: (
        <div className="flex flex-col items-center">
          <div className="bg-white dark:bg-gray-800 rounded-t-lg px-4 py-2 flex items-center justify-between w-full border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Preview</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.mobile}px</div>
          </div>
          <div className="dark:bg-gray-900 border-2 border-t-0 border-white dark:border-gray-900 rounded-b-xl overflow-hidden shadow-sm w-full">
            <div className="overflow-auto p-2 max-h-[70vh]">
              <SubscriptionDetailPreview initialData={data} viewportWidth={devicePresets.mobile} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tablet",
      label: "Tablet",
      icon: <Tablet className="h-3.5 w-3.5" />,
      content: (
        <div className="flex flex-col items-center">
          <div className="bg-white dark:bg-gray-800 rounded-md px-4 py-2 flex items-center justify-between w-full border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Tablet Preview</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.tablet}px</div>
          </div>
          <div className="mt-4 w-full ml-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click the button below to open the tablet preview
            </p>
            <Button
              className="mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              <Tablet className="h-4 w-4 mr-2" />
              Open Tablet Preview
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "desktop",
      label: "Desktop",
      icon: <Monitor className="h-3.5 w-3.5" />,
      content: (
        <div className="flex flex-col items-center">
          <div className="bg-white dark:bg-gray-800 rounded-md px-4 py-2 flex items-center justify-between w-full border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop Preview</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.desktop}px</div>
          </div>
          <div className="mt-4 ml-2 w-full">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click the button below to open the desktop preview
            </p>
            <Button
              className="mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              <Monitor className="h-4 w-4 mr-2" />
              Open Desktop Preview
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Tabs defaultTab={activeTab} tabs={tabs} variant="pills" onTabChange={(tab) => setActiveTab(tab)} />

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="p-0 max-w-[90vw] w-full" style={{ width: `${devicePresets[activeTab.id]}px` }}>
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="flex items-center">
              {activeTab.id === "tablet" ? (
                <Tablet className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              ) : (
                <Monitor className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              )}
              {activeTab.id.charAt(0).toUpperCase() + activeTab.id.slice(1)} Preview ({devicePresets[activeTab.id]}px)
            </DialogTitle>
          </div>

          <div className="overflow-auto p-4 flex justify-center" style={{ maxHeight: "80vh" }}>
            <div
              className="bg-gray-100 dark:bg-gray-900 p-4 rounded-2xl overflow-hidden"
              style={{ width: `${devicePresets[activeTab.id]}px` }}
            >
              <SubscriptionDetailPreview initialData={data} viewportWidth={devicePresets[activeTab.id]} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
