"use client"
import { useEffect, useRef, useState } from "react"
import QuestionFormHeader from "./components/header"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"
import { SidebarNavigation } from "./components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormSections } from "./components/form-sections"
import GlobalUtils from "@/lib/utils"
import { useQuestionFormData } from "./hooks"
import { QuestionPreview } from "./components/preview"

const QuestionFormBase = ({ initialData = {}, questionId = null }) => {
  const { isSaving, handleSave, formData, handlers } = useQuestionFormData({ initialData })
  const [previewVisible, setPreviewVisible] = useState(true)
  const [activeSection, setActiveSection] = useState("basic-details")
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
  }, [sectionRefs.current])

  return (
    <div>
      <QuestionFormHeader
        togglePreview={togglePreview}
        previewVisible={previewVisible}
        formData={formData}
        handlers={handlers}
        questionId={questionId}
      />
      <div className="grid grid-cols-7 gap-3">
        <div className="col-span-1">
          <SidebarNavigation
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            formData={formData}
            handlers={handlers}
          />
        </div>

        <div
          className={GlobalUtils.cn(
            "transition-all duration-300 ease-in-out",
            previewVisible ? "col-span-4" : "col-span-6",
          )}
        >
          <ScrollArea className="h-[85vh]">
            <div className="pr-3">
              <FormSections
                handlers={handlers}
                formData={formData}
                sectionRefs={sectionRefs}
                activeSection={activeSection}
              />

              <div className="sticky bottom-0 ml-auto w-full text-right z-10">
                <Button className="ml-auto" disabled={isSaving} onClick={handleSave}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Question...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" /> Create Question
                    </>
                  )}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
        {previewVisible && (
          <div className="col-span-2">
            <QuestionPreview data={formData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionFormBase
