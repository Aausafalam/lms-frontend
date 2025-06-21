"use client"

import { memo, useState } from "react"
import { Key, ChevronDown, ChevronRight, Search, Shield } from "lucide-react"
import { FormSection } from "@/components/formSection"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"

export const PrivilegesSection = memo(function PrivilegesSection({
  handlers = {},
  formData = {},
  sectionRef,
  isActive,
}) {
  const { handlePrivilegeChange } = handlers
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedGroups, setExpandedGroups] = useState(new Set(["1"]))

  // Mock privilege groups data - in real app, this would come from API
  const privilegeGroups = [
    {
      id: "1",
      name: "User Management",
      description: "Permissions related to user account management",
      privileges: [
        {
          id: "1",
          name: "User Create",
          description: "Permission to create new user accounts",
          routeCount: 2,
        },
        {
          id: "2",
          name: "User Read",
          description: "Permission to view user profiles",
          routeCount: 2,
        },
        {
          id: "3",
          name: "User Update",
          description: "Permission to modify user accounts",
          routeCount: 2,
        },
        {
          id: "4",
          name: "User Delete",
          description: "Permission to delete user accounts",
          routeCount: 1,
        },
      ],
    },
    {
      id: "2",
      name: "Course Management",
      description: "Permissions for managing educational courses",
      privileges: [
        {
          id: "5",
          name: "Course Create",
          description: "Permission to create new courses",
          routeCount: 2,
        },
        {
          id: "6",
          name: "Course Read",
          description: "Permission to view course details",
          routeCount: 2,
        },
        {
          id: "7",
          name: "Course Update",
          description: "Permission to modify courses",
          routeCount: 2,
        },
        {
          id: "8",
          name: "Course Delete",
          description: "Permission to delete courses",
          routeCount: 1,
        },
      ],
    },
    {
      id: "3",
      name: "Content Administration",
      description: "Administrative permissions for content management",
      privileges: [
        {
          id: "9",
          name: "Content Publish",
          description: "Permission to publish content",
          routeCount: 2,
        },
        {
          id: "10",
          name: "Content Moderate",
          description: "Permission to review and moderate content",
          routeCount: 3,
        },
      ],
    },
    {
      id: "4",
      name: "System Configuration",
      description: "High-level system configuration permissions",
      privileges: [
        {
          id: "11",
          name: "System Settings",
          description: "Permission to modify system-wide settings",
          routeCount: 2,
        },
        {
          id: "12",
          name: "System Backup",
          description: "Permission to create and manage backups",
          routeCount: 2,
        },
      ],
    },
  ]

  const selectedPrivileges = formData.privileges || []

  const toggleGroup = (groupId) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  const isPrivilegeSelected = (privilegeId) => {
    return selectedPrivileges.some((p) => p.id === privilegeId)
  }

  const handlePrivilegeToggle = (privilege, checked) => {
    let newPrivileges = [...selectedPrivileges]
    if (checked) {
      newPrivileges.push(privilege)
    } else {
      newPrivileges = newPrivileges.filter((p) => p.id !== privilege.id)
    }
    handlePrivilegeChange(newPrivileges)
  }

  const selectAllInGroup = (group) => {
    const groupPrivileges = group.privileges.filter((p) => !isPrivilegeSelected(p.id))
    const newPrivileges = [...selectedPrivileges, ...groupPrivileges]
    handlePrivilegeChange(newPrivileges)
  }

  const deselectAllInGroup = (group) => {
    const groupPrivilegeIds = group.privileges.map((p) => p.id)
    const newPrivileges = selectedPrivileges.filter((p) => !groupPrivilegeIds.includes(p.id))
    handlePrivilegeChange(newPrivileges)
  }

  const getGroupSelectedCount = (group) => {
    return group.privileges.filter((p) => isPrivilegeSelected(p.id)).length
  }

  const filteredGroups = privilegeGroups.map((group) => ({
    ...group,
    privileges: group.privileges.filter(
      (privilege) =>
        privilege.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        privilege.description.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  }))

  return (
    <FormSection
      id="privileges"
      title="Role Privileges"
      icon={<Key className="h-5 w-5" />}
      description="Select the privileges that this role should have access to"
      sectionRef={sectionRef}
      isActive={isActive}
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search privileges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Selected Privileges Summary */}
        {selectedPrivileges.length > 0 && (
          <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-orange-800 dark:text-orange-200">Selected Privileges</h4>
              <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                {selectedPrivileges.length} selected
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPrivileges.slice(0, 6).map((privilege) => (
                <Badge
                  key={privilege.id}
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                >
                  {privilege.name}
                </Badge>
              ))}
              {selectedPrivileges.length > 6 && (
                <Badge variant="outline" className="text-orange-600">
                  +{selectedPrivileges.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Privilege Groups */}
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            >
              <Collapsible open={expandedGroups.has(group.id)} onOpenChange={() => toggleGroup(group.id)}>
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                        <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{group.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{group.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        {getGroupSelectedCount(group)}/{group.privileges.length} selected
                      </Badge>
                      {expandedGroups.has(group.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4">
                    {/* Group Actions */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {group.privileges.length} privileges in this group
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => selectAllInGroup(group)} className="text-xs">
                          Select All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deselectAllInGroup(group)}
                          className="text-xs"
                        >
                          Deselect All
                        </Button>
                      </div>
                    </div>

                    {/* Privileges List */}
                    <div className="space-y-3">
                      {group.privileges.map((privilege) => (
                        <div
                          key={privilege.id}
                          className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <Checkbox
                            id={`privilege-${privilege.id}`}
                            checked={isPrivilegeSelected(privilege.id)}
                            onCheckedChange={(checked) => handlePrivilegeToggle(privilege, checked)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <label
                              htmlFor={`privilege-${privilege.id}`}
                              className="block font-medium text-gray-900 dark:text-white cursor-pointer"
                            >
                              {privilege.name}
                            </label>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{privilege.description}</p>
                            <div className="flex items-center mt-2">
                              <Badge variant="outline" className="text-xs">
                                {privilege.routeCount} routes
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>
              Privileges define what actions users with this role can perform. Select privileges carefully based on the
              role's responsibilities.
            </span>
          </p>
        </div>
      </div>
    </FormSection>
  )
})
