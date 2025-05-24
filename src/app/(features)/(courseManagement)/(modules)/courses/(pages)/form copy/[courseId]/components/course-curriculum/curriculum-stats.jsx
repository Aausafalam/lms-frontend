import  React from "react"
import { Award, BookOpen, Clock } from "lucide-react"
import { useCurriculum } from "../../hooks/use-curriculum"

export default function CurriculumStats() {
  const { modules } = useCurriculum()

  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0)

  const totalFreeLessons = modules.reduce(
    (total, module) => total + module.lessons.filter((lesson) => lesson.free).length,
    0,
  )

  const totalTopics = modules.reduce(
    (total, module) =>
      total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + (lesson.topics?.length || 0), 0),
    0,
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm w-full">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center text-white mr-4 shadow-lg">
          <Award size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Build Your Course Curriculum</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Create modules, lessons, and topics for your course. Drag to reorder.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <StatCard icon={<BookOpen className="text-primary" size={20} />} value={modules.length} label="Modules" />
        <StatCard icon={<Clock className="text-primary" size={20} />} value={totalLessons} label="Lessons" />
        <StatCard icon={<BookOpen className="text-primary" size={20} />} value={totalTopics} label="Topics" />
        <StatCard icon={<Award className="text-primary" size={20} />} value={totalFreeLessons} label="Free Lessons" />
      </div>
    </div>
  )
}


function StatCard({ icon, value, label }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">{icon}</div>
        <div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  )
}
