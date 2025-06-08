"use client"

import { memo, useState } from "react"
import { ArrowUpDown, GripVertical } from "lucide-react"
import { FormSection } from "@/components/formSection"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const SortableModuleItem = memo(function SortableModuleItem({ module, index }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: module.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
                group relative flex items-center gap-2 p-2 rounded-lg border transition-all duration-200
                ${
                  isDragging
                    ? "bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-700 shadow-lg scale-105 z-10"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600"
                }
                hover:shadow-md cursor-grab active:cursor-grabbing
            `}
      {...attributes}
      {...listeners}
    >
      <div className="flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
        <GripVertical className="h-3 w-3" />
      </div>

      <div
        className={`
                flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200
                ${
                  isDragging
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 group-hover:bg-orange-500 group-hover:text-white"
                }
            `}
      >
        {index + 1}
      </div>

      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
          {module.name}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"></div>
        </div>
      </div>
    </div>
  )
})

export const ModuleOrderSection = memo(function ModuleOrderSection({
  formData,
  handlers,
  sectionRef,
  isActive,
  modules = [
    { id: "1", name: "Introduction to Course Fundamentals" },
    { id: "2", name: "Core Concepts and Theory" },
    { id: "3", name: "Practical Applications" },
    { id: "4", name: "Advanced Topics and Patterns" },
    { id: "5", name: "Final Project and Assessment" },
  ],
  onModulesReorder,
}) {
  const [items, setItems] = useState(modules)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        onModulesReorder?.(newItems)
        return newItems
      })
    }
  }

  return (
    <FormSection
      id="module-order"
      title="Module Order"
      icon={<ArrowUpDown className="h-5 w-5" />}
      description="Drag and drop to reorder modules"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between px-3 py-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800 text-xs">
          <div className="text-orange-700 dark:text-orange-300">
            <span className="font-semibold">{items.length}</span> modules
          </div>
          <div className="text-orange-600 dark:text-orange-400">Hover for titles</div>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-orange-300 dark:scrollbar-thumb-orange-700 scrollbar-track-transparent">
              {items.map((module, index) => (
                <SortableModuleItem key={module.id} module={module} index={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-1 border-t border-gray-200 dark:border-gray-700">
          Changes auto-saved
        </div>
      </div>
    </FormSection>
  )
})
