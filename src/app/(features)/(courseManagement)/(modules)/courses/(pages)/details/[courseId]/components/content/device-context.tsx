"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Device presets with their respective widths
export const devicePresets = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
}

type DeviceType = "mobile" | "tablet" | "desktop"

interface DeviceContextType {
  activeDevice: DeviceType
  setActiveDevice: (device: DeviceType) => void
  previewWidth: number
  showModal: boolean
  setShowModal: (show: boolean) => void
  isFullscreen: boolean
  toggleFullscreen: () => void
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("mobile")
  const [showModal, setShowModal] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <DeviceContext.Provider
      value={{
        activeDevice,
        setActiveDevice,
        previewWidth: devicePresets[activeDevice],
        showModal,
        setShowModal,
        isFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevice() {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error("useDevice must be used within a DeviceProvider")
  }
  return context
}
