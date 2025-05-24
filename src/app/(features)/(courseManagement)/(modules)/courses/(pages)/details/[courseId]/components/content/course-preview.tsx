"use client"

import type { ReactNode } from "react"
import { Smartphone, Tablet, Monitor, X, Maximize2, Minimize2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { useDevice, devicePresets } from "./device-context"

interface CoursePreviewProps {
  children: ReactNode
}

export function CoursePreview({ children }: CoursePreviewProps) {
  const { activeDevice, setActiveDevice, previewWidth, showModal, setShowModal, isFullscreen, toggleFullscreen } =
    useDevice()

  // Handle device selection
  const handleDeviceSelect = (device: string) => {
    setActiveDevice(device as "mobile" | "tablet" | "desktop")

    // For mobile, just show inline preview
    if (device === "mobile") {
      setShowModal(false)
      return
    }

    // For tablet and desktop, show modal
    setShowModal(true)
  }

  return (
    <div>
      {/* Device Selection Tabs */}
      <Tabs defaultValue="mobile" className="w-full mb-6" onValueChange={handleDeviceSelect}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Mobile</span>
          </TabsTrigger>
          <TabsTrigger value="tablet" className="flex items-center gap-2">
            <Tablet className="h-4 w-4" />
            <span className="hidden sm:inline">Tablet</span>
          </TabsTrigger>
          <TabsTrigger value="desktop" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Desktop</span>
          </TabsTrigger>
        </TabsList>

        {/* Mobile Preview (Inline) */}
        <TabsContent value="mobile" className="mt-4">
          <div className="flex flex-col items-center">
            <div className="bg-white dark:bg-gray-800 rounded-t-xl px-4 py-2 flex items-center justify-between w-full max-w-[375px] border-b border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Preview</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.mobile}px</div>
            </div>
            <div
              className="bg-white dark:bg-gray-900 border-2 border-t-0 border-gray-200 dark:border-gray-700 rounded-b-xl overflow-hidden shadow-lg"
              style={{ width: `${devicePresets.mobile}px`, maxWidth: "100%" }}
            >
              <div className="overflow-hidden" style={{ width: devicePresets.mobile }}>
                {children}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tablet Preview (Modal) */}
        <TabsContent value="tablet">
          <div className="flex flex-col items-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-2 flex items-center justify-between w-full max-w-[375px] border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Tablet Preview</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.tablet}px</div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click the button below to open the tablet preview
              </p>
              <Button
                className="mt-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                onClick={() => setShowModal(true)}
              >
                <Tablet className="h-4 w-4 mr-2" />
                Open Tablet Preview
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Desktop Preview (Modal) */}
        <TabsContent value="desktop">
          <div className="flex flex-col items-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-2 flex items-center justify-between w-full max-w-[375px] border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop Preview</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{devicePresets.desktop}px</div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click the button below to open the desktop preview
              </p>
              <Button
                className="mt-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                onClick={() => setShowModal(true)}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Open Desktop Preview
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Modal for Tablet and Desktop */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent
          className={`p-0 ${isFullscreen ? "max-w-full w-full h-screen m-0 rounded-none" : "max-w-[90vw] w-full"}`}
        >
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="flex items-center">
              {activeDevice === "tablet" ? (
                <Tablet className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
              ) : (
                <Monitor className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
              )}
              {activeDevice.charAt(0).toUpperCase() + activeDevice.slice(1)} Preview ({devicePresets[activeDevice]}px)
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </Button>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
            </div>
          </div>

          <div
            className="overflow-auto p-4 flex justify-center"
            style={{
              maxHeight: isFullscreen ? "calc(100vh - 60px)" : "80vh",
            }}
          >
            <div
              className={`bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg ${isFullscreen ? "h-full" : ""}`}
              style={{ width: `${devicePresets[activeDevice]}px` }}
            >
              {children}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
