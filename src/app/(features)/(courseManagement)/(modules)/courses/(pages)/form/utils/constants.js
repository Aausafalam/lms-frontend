import {
  Lightbulb,
  Zap,
  Flame,
  Award,
  Laptop,
  Palette,
  Target,
  Briefcase,
  FlaskRoundIcon as Flask,
  Languages,
  Paintbrush,
} from "lucide-react"

/**
 * Course form utility constants and configurations
 * @description Centralized configuration for form options and data
 */
const CourseFormUtils = {
  instructors: [
    { id: "1", name: "Dr. Jane Smith", role: "Lead Instructor", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Prof. John Doe", role: "Subject Expert", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Dr. Emily Johnson", role: "Course Designer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "4", name: "Prof. Michael Brown", role: "Guest Lecturer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "5", name: "Dr. Sarah Williams", role: "Teaching Assistant", avatar: "/placeholder.svg?height=40&width=40" },
  ],

  difficultyLevels: [
    { value: "BEGINNER", label: "Beginner", icon: <Lightbulb className="h-4 w-4" /> },
    { value: "INTERMEDIATE", label: "Intermediate", icon: <Zap className="h-4 w-4" /> },
    { value: "ADVANCED", label: "Advanced", icon: <Flame className="h-4 w-4" /> },
    { value: "EXPERT", label: "Expert", icon: <Award className="h-4 w-4" /> },
  ],

  categories: [
    { value: "115d9494-9fbd-40ef-ba5d-c9004580a7d9", label: "Programming", icon: <Laptop className="h-4 w-4" /> },
    { value: "design", label: "Design", icon: <Palette className="h-4 w-4" /> },
    { value: "business", label: "Business", icon: <Briefcase className="h-4 w-4" /> },
    { value: "marketing", label: "Marketing", icon: <Target className="h-4 w-4" /> },
    { value: "science", label: "Science", icon: <Flask className="h-4 w-4" /> },
    { value: "language", label: "Language", icon: <Languages className="h-4 w-4" /> },
    { value: "arts", label: "Arts", icon: <Paintbrush className="h-4 w-4" /> },
  ],

  tags: [
    { id: "1", name: "Bestseller" },
    { id: "2", name: "New" },
    { id: "3", name: "Popular" },
    { id: "4", name: "Trending" },
    { id: "5", name: "Featured" },
    { id: "6", name: "Staff Pick" },
  ],

  languages: [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Hinglish", label: "Hinglish" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
  ],

  skillLevels: [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
    { label: "Expert", value: "Expert" },
  ],
}

export default CourseFormUtils
