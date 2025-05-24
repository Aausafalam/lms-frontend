"use client"
import { memo, useState } from "react"
import { motion } from "framer-motion"
import { Users, Plus, Trash2, Edit, Save, X, User, Mail, Link2 } from "lucide-react"
import { CourseFormSection } from "./course-form-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import FileUploadField from "@/components/ui/file"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

/**
 * CourseInstructorsSection - A form section component for managing course instructors
 *
 * This component allows course creators to add, edit, and remove instructors for their course.
 * Each instructor has a profile with name, bio, avatar, and social links.
 *
 * @param {Object} props - Component props
 * @param {Object} props.handlers - Object containing event handlers for the form
 * @param {Object} props.formData - Form data object containing instructors array
 * @param {Object} props.sectionRef - React ref for scrolling to this section
 * @param {boolean} props.isActive - Whether this section is currently active
 * @returns {JSX.Element} Rendered instructors section
 */
export const CourseInstructorsSection = memo(function CourseInstructorsSection({
  handlers = {},
  formData = { instructors: [] },
  sectionRef,
  isActive,
}) {
  // Local state for editing instructors
  const [editingInstructorId, setEditingInstructorId] = useState(null)
  const [newInstructor, setNewInstructor] = useState({
    name: "",
    role: "",
    bio: "",
    avatar: "",
    email: "",
    website: "",
    socialLinks: {
      twitter: "",
      linkedin: "",
      github: "",
    },
  })
  const [showAddForm, setShowAddForm] = useState(false)

  // Ensure instructors array exists
  const instructors = Array.isArray(formData.instructors) ? formData.instructors : []

  // Handler functions
  const { addInstructor, updateInstructor, removeInstructor, handleInstructorImageUpload } = handlers

  // Start editing an instructor
  const startEditingInstructor = (instructorId) => {
    setEditingInstructorId(instructorId)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingInstructorId(null)
  }

  // Handle new instructor form changes
  const handleNewInstructorChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      // Handle nested properties like socialLinks.twitter
      const [parent, child] = name.split(".")
      setNewInstructor((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setNewInstructor((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Submit new instructor
  const submitNewInstructor = () => {
    addInstructor(newInstructor)
    setNewInstructor({
      name: "",
      role: "",
      bio: "",
      avatar: "",
      email: "",
      website: "",
      socialLinks: {
        twitter: "",
        linkedin: "",
        github: "",
      },
    })
    setShowAddForm(false)
  }

  // Handle instructor field changes
  const handleInstructorChange = (instructorId, field, value) => {
    if (field.includes(".")) {
      // Handle nested properties like socialLinks.twitter
      const [parent, child] = field.split(".")
      updateInstructor(instructorId, {
        [parent]: {
          ...instructors.find((i) => i.id === instructorId)[parent],
          [child]: value,
        },
      })
    } else {
      updateInstructor(instructorId, { [field]: value })
    }
  }

  return (
    <CourseFormSection
      id="instructors"
      title="Instructors"
      icon={<Users className="h-5 w-5" />}
      description="Add instructors and their information to your course"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Info box with guidance */}
        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Add information about the instructors who will be teaching this course. A complete instructor profile helps
            build credibility with potential students.
          </p>
        </div>

        {/* Instructors list */}
        <div className="space-y-4">
          {instructors.length === 0 && !showAddForm ? (
            <div className="text-center py-8 border border-dashed rounded-lg">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-500">No instructors added yet</p>
              <p className="text-sm text-gray-400 mb-4">Add your first instructor to get started</p>
            </div>
          ) : (
            instructors.map((instructor) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg overflow-hidden"
              >
                {editingInstructorId === instructor.id ? (
                  // Edit instructor form
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Edit Instructor</h3>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingInstructorId(null)}
                          className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900/30 dark:hover:bg-green-900/20"
                        >
                          <Save className="h-3.5 w-3.5 mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                          className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Name"
                        labelIcon={<User className="h-3.5 w-3.5" />}
                        value={instructor.name || ""}
                        onChange={(e) => handleInstructorChange(instructor.id, "name", e.target.value)}
                        placeholder="Instructor name"
                      />

                      <Input
                        label="Role"
                        value={instructor.role || ""}
                        onChange={(e) => handleInstructorChange(instructor.id, "role", e.target.value)}
                        placeholder="e.g. Lead Instructor, Subject Expert"
                      />
                    </div>

                    <Textarea
                      label="Bio"
                      value={instructor.bio || ""}
                      onChange={(e) => handleInstructorChange(instructor.id, "bio", e.target.value)}
                      placeholder="Brief biography of the instructor"
                      minRows={3}
                    />

                    <FileUploadField
                      label="Avatar"
                      value={instructor.avatarPreview || ""}
                      onChange={(file) => handleInstructorImageUpload(instructor.id, file)}
                      name={`instructor-${instructor.id}-avatar`}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Email"
                        labelIcon={<Mail className="h-3.5 w-3.5" />}
                        value={instructor.email || ""}
                        onChange={(e) => handleInstructorChange(instructor.id, "email", e.target.value)}
                        placeholder="Email address"
                        type="email"
                      />

                      <Input
                        label="Website"
                        labelIcon={<Link2 className="h-3.5 w-3.5" />}
                        value={instructor.website || ""}
                        onChange={(e) => handleInstructorChange(instructor.id, "website", e.target.value)}
                        placeholder="Personal website URL"
                      />
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Social Links</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Twitter URL"
                          value={instructor.socialLinks?.twitter || ""}
                          onChange={(e) => handleInstructorChange(instructor.id, "socialLinks.twitter", e.target.value)}
                        />

                        <Input
                          placeholder="LinkedIn URL"
                          value={instructor.socialLinks?.linkedin || ""}
                          onChange={(e) =>
                            handleInstructorChange(instructor.id, "socialLinks.linkedin", e.target.value)
                          }
                        />

                        <Input
                          placeholder="GitHub URL"
                          value={instructor.socialLinks?.github || ""}
                          onChange={(e) => handleInstructorChange(instructor.id, "socialLinks.github", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Instructor display card
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <Avatar className="h-20 w-20">
                            {instructor.avatar ? (
                              <AvatarImage src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} />
                            ) : (
                              <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                {instructor.name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase() || "IN"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-lg">{instructor.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{instructor.role}</p>
                            </div>

                            <div className="flex gap-2 mt-2 md:mt-0">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startEditingInstructor(instructor.id)}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-900/30 dark:hover:bg-blue-900/20"
                              >
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeInstructor(instructor.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm mb-3">{instructor.bio}</p>

                          <div className="flex flex-wrap gap-3 text-sm">
                            {instructor.email && (
                              <a
                                href={`mailto:${instructor.email}`}
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                <Mail className="h-3.5 w-3.5 mr-1" />
                                {instructor.email}
                              </a>
                            )}

                            {instructor.website && (
                              <a
                                href={instructor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:underline"
                              >
                                <Link2 className="h-3.5 w-3.5 mr-1" />
                                Website
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))
          )}

          {/* Add instructor form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-lg overflow-hidden p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Add New Instructor</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={submitNewInstructor}
                    className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900/30 dark:hover:bg-green-900/20"
                    disabled={!newInstructor.name}
                  >
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  labelIcon={<User className="h-3.5 w-3.5" />}
                  name="name"
                  value={newInstructor.name}
                  onChange={handleNewInstructorChange}
                  placeholder="Instructor name"
                  required
                />

                <Input
                  label="Role"
                  name="role"
                  value={newInstructor.role}
                  onChange={handleNewInstructorChange}
                  placeholder="e.g. Lead Instructor, Subject Expert"
                />
              </div>

              <Textarea
                label="Bio"
                name="bio"
                value={newInstructor.bio}
                onChange={handleNewInstructorChange}
                placeholder="Brief biography of the instructor"
                minRows={3}
              />

              <FileUploadField
                label="Avatar"
                value={newInstructor.avatarPreview || ""}
                onChange={(file) =>
                  setNewInstructor((prev) => ({ ...prev, avatar: file, avatarPreview: URL.createObjectURL(file) }))
                }
                name="new-instructor-avatar"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  labelIcon={<Mail className="h-3.5 w-3.5" />}
                  name="email"
                  value={newInstructor.email}
                  onChange={handleNewInstructorChange}
                  placeholder="Email address"
                  type="email"
                />

                <Input
                  label="Website"
                  labelIcon={<Link2 className="h-3.5 w-3.5" />}
                  name="website"
                  value={newInstructor.website}
                  onChange={handleNewInstructorChange}
                  placeholder="Personal website URL"
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Social Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Twitter URL"
                    name="socialLinks.twitter"
                    value={newInstructor.socialLinks.twitter}
                    onChange={handleNewInstructorChange}
                  />

                  <Input
                    placeholder="LinkedIn URL"
                    name="socialLinks.linkedin"
                    value={newInstructor.socialLinks.linkedin}
                    onChange={handleNewInstructorChange}
                  />

                  <Input
                    placeholder="GitHub URL"
                    name="socialLinks.github"
                    value={newInstructor.socialLinks.github}
                    onChange={handleNewInstructorChange}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Add instructor button */}
          {!showAddForm && (
            <Button
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="mt-2 bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 dark:hover:bg-blue-950/30"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Instructor
            </Button>
          )}
        </div>
      </div>
    </CourseFormSection>
  )
})
