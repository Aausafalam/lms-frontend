import { Laptop, Palette, Target } from "lucide-react"

const LessonFormUtils = {
  instructors: [
    { id: "1", name: "Dr. Jane Smith", role: "Lead Instructor", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Prof. John Doe", role: "Subject Expert", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Dr. Emily Johnson", role: "Module Designer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "4", name: "Prof. Michael Brown", role: "Guest Lecturer", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "5", name: "Dr. Sarah Williams", role: "Teaching Assistant", avatar: "/placeholder.svg?height=40&width=40" },
  ],
  categories: [
    { value: "f5c81acb-2451-402f-9b6f-a4ee980f44b0", label: "Programming", icon: <Laptop /> },
    { value: "design", label: "Design", icon: <Palette /> },
    { value: "business", label: "Business", icon: <Briefcase /> },
    { value: "marketing", label: "Marketing", icon: <Target /> },
    { value: "science", label: "Science", icon: <Flask /> },
    { value: "mathematics", label: "Mathematics", icon: <PiFunction /> },
    { value: "language", label: "Language", icon: <Languages /> },
    { value: "arts", label: "Arts", icon: <Paintbrush /> },
  ],
  tags: [
    { id: "1", name: "Essential" },
    { id: "2", name: "Advanced" },
    { id: "3", name: "Popular" },
    { id: "4", name: "Hands-on" },
    { id: "5", name: "Theory" },
    { id: "6", name: "Practical" },
  ],
}
export default LessonFormUtils

export function Briefcase(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

export function Flask(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v7.31" />
      <path d="M14 9.3V2" />
      <path d="M8.5 2h7" />
      <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
      <path d="M5.52 16h12.96" />
    </svg>
  )
}

export function PiFunction(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6h16a2 2 0 0 1 2 2v12" />
      <path d="M4 10h.01" />
      <path d="M4 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M20 10h.01" />
      <path d="M20 14h.01" />
    </svg>
  )
}

export function Languages(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  )
}

export function Paintbrush(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z" />
      <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
      <path d="M14.5 17.5 4.5 15" />
    </svg>
  )
}
