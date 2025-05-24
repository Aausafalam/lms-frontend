"use client"
import { memo, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Plus, Trash2, ChevronDown, ChevronUp, GripVertical, Edit, Save, X } from "lucide-react"
import { CourseFormSection } from "./course-form-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

/**
 * CourseCurriculumSection - A form section component for organizing course curriculum
 *
 * This component allows course creators to organize their course into sections and modules,
 * with drag-and-drop functionality for reordering. It supports adding, editing, and removing
 * sections and modules.
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @param {Object} props.formData - Form data object containing curriculum structure
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @returns {JSX.Element} Rendered curriculum section
 */
export const CourseCurriculumSection = memo(function CourseCurriculumSection({
  handlers = {},
  formData = { curriculum: [] },
  sectionRef,
  isActive,
}) {
  // Local state for editing sections and modules
  const [editingSectionId, setEditingSectionId] = useState(null)
  const [editingModuleId, setEditingModuleId] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  // Ensure curriculum array exists
  const curriculum = Array.isArray(formData.curriculum) ? formData.curriculum : []

  // Handler functions
  const {
    addCurriculumSection,
    updateCurriculumSection,
    removeCurriculumSection,
    addModule,
    updateModule,
    removeModule,
    reorderSection,
    reorderModule,
  } = handlers

  // Toggle section expansion
  const toggleSectionExpand = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Start editing a section
  const startEditingSection = (sectionId) => {
    setEditingSectionId(sectionId)
    setEditingModuleId(null)
  }

  // Start editing a module
  const startEditingModule = (moduleId) => {
    setEditingModuleId(moduleId)
    setEditingSectionId(null)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingSectionId(null)
    setEditingModuleId(null)
  }

  return (
    <CourseFormSection
      id="curriculum"
      title="Curriculum"
      icon={<BookOpen className="h-5 w-5" />}
      description="Organize your course into sections and modules"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Info box with guidance */}
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Organize your course into sections (like chapters) and modules (individual lessons). Drag and drop to
            reorder them as needed.
          </p>
        </div>

        {/* Curriculum sections */}
        <div className="space-y-4">
          {curriculum.length === 0 ? (
            <div className="text-center py-8 border border-dashed rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-500">No curriculum sections added yet</p>
              <p className="text-sm text-gray-400 mb-4">Add your first section to get started</p>
            </div>
          ) : (
            curriculum.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg overflow-hidden"
              >
                {/* Section header */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center gap-3">
                  <div className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <GripVertical className="h-5 w-5" />
                  </div>

                  {editingSectionId === section.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={section.title}
                        onChange={(e) => updateCurriculumSection(section.id, { title: e.target.value })}
                        placeholder="Section title"
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingSectionId(null)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={cancelEditing}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="flex-1 font-medium">
                        Section {sectionIndex + 1}: {section.title}
                      </h3>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEditingSection(section.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeCurriculumSection(section.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleSectionExpand(section.id)}
                        className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                      >
                        {expandedSections[section.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </>
                  )}
                </div>

                {/* Section content (modules) */}
                {expandedSections[section.id] && (
                  <div className="p-4 space-y-3">
                    {/* Module list */}
                    {section.modules && section.modules.length > 0 ? (
                      <div className="space-y-2">
                        {section.modules.map((module, moduleIndex) => (
                          <Card key={module.id} className="p-3 flex items-center gap-2">
                            <div className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                              <GripVertical className="h-4 w-4" />
                            </div>

                            {editingModuleId === module.id ? (
                              <div className="flex-1 flex gap-2">
                                <Input
                                  value={module.title}
                                  onChange={(e) => updateModule(section.id, module.id, { title: e.target.value })}
                                  placeholder="Module title"
                                  className="flex-1"
                                />
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => setEditingModuleId(null)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={cancelEditing}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                <span className="flex-1">
                                  {moduleIndex + 1}. {module.title}
                                </span>

                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => startEditingModule(module.id)}
                                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>

                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => removeModule(section.id, module.id)}
                                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </>
                            )}
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 border border-dashed rounded-lg">
                        <p className="text-sm text-gray-500">No modules in this section</p>
                      </div>
                    )}

                    {/* Add module button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addModule(section.id)}
                      className="mt-2 w-full bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add Module
                    </Button>
                  </div>
                )}
              </motion.div>
            ))
          )}

          {/* Add section button */}
          <Button
            variant="outline"
            onClick={addCurriculumSection}
            className="mt-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>
      </div>
    </CourseFormSection>
  )
})
