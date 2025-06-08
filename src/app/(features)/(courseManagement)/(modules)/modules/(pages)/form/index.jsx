"use client"

import { useEffect, useRef, useState } from "react"
import ModuleFormHeader from "./components/header"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles, CheckCircle, AlertCircle } from "lucide-react"
import { SidebarNavigation } from "./components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormSections } from "./components/form-sections"
import GlobalUtils from "@/lib/utils"
import { useModuleFormData } from "./hooks"
import { ModulePreview } from "./components/preview"
import { Alert, AlertDescription } from "@/components/ui/alert"

const ModuleFormBase = ({ initialData = {}, moduleId = null }) => {
  const { isSaving, handleSave, formData, handlers, error, success } = useModuleFormData({ initialData })
  const [previewVisible, setPreviewVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("basic")
  const sectionRefs = useRef({})

  const scrollToSection = (sectionId) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth", block: "start" })
    setActiveSection(sectionId)
  }

  const togglePreview = () => {
    setPreviewVisible(!previewVisible)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div className="">
      <div className="">
        <ModuleFormHeader
          togglePreview={togglePreview}
          previewVisible={previewVisible}
          formData={formData}
          handlers={handlers}
          moduleId={moduleId}
        />

        {/* Error/Success Messages */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Module saved successfully!</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <SidebarNavigation
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              formData={formData}
              handlers={handlers}
            />
          </div>

          {/* Main Content */}
          <div
            className={GlobalUtils.cn(
              "transition-all duration-300 ease-in-out",
              previewVisible ? "lg:col-span-4" : "lg:col-span-6",
              "col-span-1",
            )}
          >
            <ScrollArea className="h-[85vh]">
              <div className="pr-3 space-y-8">
                <FormSections
                  handlers={handlers}
                  formData={formData}
                  sectionRefs={sectionRefs}
                  activeSection={activeSection}
                />

                {/* Save Button */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                  <Button className="w-full sm:w-auto ml-auto flex" disabled={isSaving} onClick={handleSave} size="lg">
                    {isSaving ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Saving Module...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Save Module
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Preview Panel - Hidden on mobile when preview is off */}
          {previewVisible && (
            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-6">
                <ModulePreview data={formData} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={togglePreview} className="flex items-center gap-2">
              {previewVisible ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button disabled={isSaving} onClick={handleSave} size="sm">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleFormBase
