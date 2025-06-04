"use client"

import { memo, useState } from "react"
import { motion } from "framer-motion"
import { Layers, Plus, ChevronDown, ChevronUp, Trash2, Copy, Shuffle } from "lucide-react"
import { FormSection } from "./form-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { QuestionGroupForm } from "./question-group-form"

export const SectionsManager = memo(function SectionsManager({
  handlers = {},
  formData = { sections: [] },
  sectionRef,
  isActive,
}) {
  const {
    handleSectionChange,
    addSection,
    removeSection,
    addQuestionGroup,
    removeQuestionGroup,
    handleQuestionGroupChange,
  } = handlers
  const [expandedSections, setExpandedSections] = useState({})

  // Ensure sections array exists
  const sections = Array.isArray(formData.sections) ? formData.sections : []

  const toggleSectionExpand = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const duplicateSection = (index) => {
    const sectionToDuplicate = { ...sections[index] }
    const newSection = {
      ...sectionToDuplicate,
      sectionId: `S${sections.length + 1}`,
      name: `${sectionToDuplicate.name} (Copy)`,
    }
    addSection(newSection)
  }

  return (
    <FormSection
      id="sections"
      title="Exam Sections"
      icon={<Layers className="h-5 w-5" />}
      description="Configure the different sections of your exam"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Add multiple sections to your exam. Each section can have its own settings and question groups.</span>
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.sectionId || sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
            >
              <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full mr-3">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {section.name || `Section ${sectionIndex + 1}`}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {section.questionsCount} questions • {section.questionsToAttempt} to attempt
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => duplicateSection(sectionIndex)}
                    className="h-8 w-8 rounded-full"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSection(sectionIndex)}
                    className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSectionExpand(section.sectionId)}
                    className="h-8 w-8 rounded-full"
                  >
                    {expandedSections[section.sectionId] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {expandedSections[section.sectionId] && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Section Name"
                      id={`section-${sectionIndex}-name`}
                      name="name"
                      value={section.name || ""}
                      onChange={(e) => handleSectionChange(sectionIndex, "name", e.target.value)}
                      placeholder="Enter section name"
                    />

                    <Input
                      label="Section Code"
                      id={`section-${sectionIndex}-sectionId`}
                      name="sectionId"
                      value={section.sectionId || ""}
                      onChange={(e) => handleSectionChange(sectionIndex, "sectionId", e.target.value)}
                      placeholder="Enter section code"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Total Questions"
                      id={`section-${sectionIndex}-questionsCount`}
                      name="questionsCount"
                      type="number"
                      min="1"
                      value={section.questionsCount || ""}
                      onChange={(e) =>
                        handleSectionChange(sectionIndex, "questionsCount", Number.parseInt(e.target.value, 10))
                      }
                      placeholder="Enter total questions"
                    />

                    <Input
                      label="Questions to Attempt"
                      id={`section-${sectionIndex}-questionsToAttempt`}
                      name="questionsToAttempt"
                      type="number"
                      min="1"
                      value={section.questionsToAttempt || ""}
                      onChange={(e) =>
                        handleSectionChange(sectionIndex, "questionsToAttempt", Number.parseInt(e.target.value, 10))
                      }
                      placeholder="Enter questions to attempt"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Subject Tag"
                      id={`section-${sectionIndex}-subjectTag`}
                      name="subjectTag"
                      value={section.subjectTag || ""}
                      onChange={(e) => handleSectionChange(sectionIndex, "subjectTag", e.target.value)}
                      placeholder="Enter subject tag"
                    />

                    <Input
                      label="Section Time Limit (minutes, optional)"
                      id={`section-${sectionIndex}-sectionTimeLimit`}
                      name="sectionTimeLimit"
                      type="number"
                      min="1"
                      value={section.sectionTimeLimit || ""}
                      onChange={(e) =>
                        handleSectionChange(
                          sectionIndex,
                          "sectionTimeLimit",
                          e.target.value ? Number.parseInt(e.target.value, 10) : null,
                        )
                      }
                      placeholder="Enter time limit (optional)"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-6 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="space-y-0.5">
                      <Label className="text-base">Compulsory Section</Label>
                      <p className="text-sm text-muted-foreground">Students must attempt this section</p>
                    </div>
                    <Switch
                      checked={section.isCompulsory || false}
                      onCheckedChange={(checked) => handleSectionChange(sectionIndex, "isCompulsory", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between mb-6 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="space-y-0.5">
                      <Label className="text-base">Shuffle Questions</Label>
                      <p className="text-sm text-muted-foreground">Randomize the order of questions in this section</p>
                    </div>
                    <Switch
                      checked={section.shuffleQuestions || false}
                      onCheckedChange={(checked) => handleSectionChange(sectionIndex, "shuffleQuestions", checked)}
                    />
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Question Groups
                    </h4>

                    <Accordion type="multiple" className="w-full">
                      {section.questionGroups?.map((group, groupIndex) => (
                        <AccordionItem
                          key={groupIndex}
                          value={`section-${sectionIndex}-group-${groupIndex}`}
                          className="border border-gray-200 dark:border-gray-700 rounded-md mb-3 overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <div className="flex items-center">
                              <span className="font-medium">
                                Questions {group.range?.[0] || "?"} - {group.range?.[1] || "?"}
                              </span>
                              <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                                {group.questionType || "MCQ"} • {group.marksPerQuestion || 0} marks
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                            <QuestionGroupForm
                              group={group}
                              onChange={(field, value) =>
                                handleQuestionGroupChange(sectionIndex, groupIndex, field, value)
                              }
                              onRemove={() => removeQuestionGroup(sectionIndex, groupIndex)}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    <Button
                      variant="outline"
                      onClick={() => addQuestionGroup(sectionIndex)}
                      className="mt-3 w-full bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question Group
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {sections.length === 0 && (
            <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <Layers className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
              <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">No Sections Added</h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
                Add your first exam section to get started
              </p>
            </div>
          )}

          <Button
            variant="outline"
            onClick={() =>
              addSection({
                sectionId: `S${sections.length + 1}`,
                name: `Section ${sections.length + 1}`,
                isCompulsory: true,
                questionsCount: 10,
                questionsToAttempt: 10,
                shuffleQuestions: true,
                questionGroups: [
                  {
                    range: [1, 10],
                    marksPerQuestion: 1,
                    negativeMarks: 0.33,
                    questionType: "MCQ",
                  },
                ],
                subjectTag: "",
                sectionTimeLimit: null,
              })
            }
            className="mt-4 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>
      </div>
    </FormSection>
  )
})
