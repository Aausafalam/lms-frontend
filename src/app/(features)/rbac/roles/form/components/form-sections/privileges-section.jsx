"use client";

import { memo, useEffect, useState, useCallback } from "react";
import { Key, ChevronDown, ChevronRight, Search, Shield, Users, Settings, BookOpen, Database } from "lucide-react";
import { FormSection } from "@/components/formSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePermissionGroupGetList } from "@/services/hooks/permissionGroup";
import { usePermissionList } from "@/services/hooks/permission";

// Icon mapping for different privilege groups
const getGroupIcon = (groupName) => {
    const iconMap = {
        user: Users,
        course: BookOpen,
        content: Settings,
        system: Database,
    };

    const key = groupName.toLowerCase();
    for (const [iconKey, Icon] of Object.entries(iconMap)) {
        if (key.includes(iconKey)) {
            return Icon;
        }
    }
    return Shield;
};

export const PrivilegesSection = memo(function PrivilegesSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handlePrivilegeChange } = handlers;
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedGroups, setExpandedGroups] = useState(new Set());
    const [groupPrivileges, setGroupPrivileges] = useState(new Map());
    const [loadingGroups, setLoadingGroups] = useState(new Set());

    const { permissionGroupList } = usePermissionGroupGetList();
    const { permissionList } = usePermissionList();

    const selectedPrivileges = formData.privileges || [];

    // Initialize with first group expanded and load its privileges
    useEffect(() => {
        permissionGroupList.fetch?.({
            onSuccess: (data) => {
                if (data && data.length > 0) {
                    const firstGroupId = data[0].id.toString();
                    setExpandedGroups(new Set([firstGroupId]));
                    loadGroupPrivileges(firstGroupId);
                }
            },
        });
    }, []);

    const loadGroupPrivileges = useCallback(
        async (groupId) => {
            if (groupPrivileges.has(groupId)) {
                return; // Already loaded
            }

            setLoadingGroups((prev) => new Set([...prev, groupId]));

            try {
                await permissionList.fetch({
                    params: { filterBy: { privilegeGroupId: groupId } },
                    onSuccess: (data) => {
                        console.log("permission", data);
                        setGroupPrivileges((prev) => new Map([...prev, [groupId, data || []]]));
                    },
                    onError: (error) => {
                        console.error(`Failed to load privileges for group ${groupId}:`, error);
                        setGroupPrivileges((prev) => new Map([...prev, [groupId, []]]));
                    },
                });
            } finally {
                setLoadingGroups((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(groupId);
                    return newSet;
                });
            }
        },
        [groupPrivileges, permissionList]
    );

    const toggleGroup = useCallback(
        async (groupId) => {
            const groupIdStr = groupId.toString();
            const newExpanded = new Set(expandedGroups);

            if (newExpanded.has(groupIdStr)) {
                newExpanded.delete(groupIdStr);
            } else {
                newExpanded.add(groupIdStr);
                // Load privileges when expanding
                await loadGroupPrivileges(groupIdStr);
            }

            setExpandedGroups(newExpanded);
        },
        [expandedGroups, loadGroupPrivileges]
    );

    const isPrivilegeSelected = useCallback(
        (privilegeId) => {
            return selectedPrivileges.some((p) => p.id === privilegeId);
        },
        [selectedPrivileges]
    );

    const handlePrivilegeToggle = useCallback(
        (privilege, checked) => {
            let newPrivileges = [...selectedPrivileges];
            if (checked) {
                newPrivileges.push(privilege);
            } else {
                newPrivileges = newPrivileges.filter((p) => p.id !== privilege.id);
            }
            handlePrivilegeChange?.(newPrivileges);
        },
        [selectedPrivileges, handlePrivilegeChange]
    );

    const selectAllInGroup = useCallback(
        (groupId) => {
            const privileges = groupPrivileges.get(groupId.toString()) || [];
            const unselectedPrivileges = privileges.filter((p) => !isPrivilegeSelected(p.id));
            const newPrivileges = [...selectedPrivileges, ...unselectedPrivileges];
            handlePrivilegeChange?.(newPrivileges);
        },
        [groupPrivileges, selectedPrivileges, isPrivilegeSelected, handlePrivilegeChange]
    );

    const deselectAllInGroup = useCallback(
        (groupId) => {
            const privileges = groupPrivileges.get(groupId.toString()) || [];
            const groupPrivilegeIds = privileges.map((p) => p.id);
            const newPrivileges = selectedPrivileges.filter((p) => !groupPrivilegeIds.includes(p.id));
            handlePrivilegeChange?.(newPrivileges);
        },
        [groupPrivileges, selectedPrivileges, handlePrivilegeChange]
    );

    const getGroupSelectedCount = useCallback(
        (groupId) => {
            const privileges = groupPrivileges.get(groupId.toString()) || [];
            return privileges.filter((p) => isPrivilegeSelected(p.id)).length;
        },
        [groupPrivileges, isPrivilegeSelected]
    );

    const getFilteredPrivileges = useCallback(
        (groupId) => {
            const privileges = groupPrivileges.get(groupId.toString()) || [];
            if (!searchTerm) return privileges;

            return privileges.filter((privilege) => privilege.name?.toLowerCase().includes(searchTerm.toLowerCase()) || privilege.description?.toLowerCase().includes(searchTerm.toLowerCase()));
        },
        [groupPrivileges, searchTerm]
    );

    const privilegeGroups = permissionGroupList.data || [];

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
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search privileges..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-background" />
                </div>

                {/* Selected Privileges Summary */}
                {selectedPrivileges.length > 0 && (
                    <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-800">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-orange-800 dark:text-orange-200 flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Selected Privileges
                                </h4>
                                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300">
                                    {selectedPrivileges.length} selected
                                </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedPrivileges.slice(0, 8).map((privilege) => (
                                    <Badge
                                        key={privilege.id}
                                        variant="outline"
                                        className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700"
                                    >
                                        {privilege.name}
                                    </Badge>
                                ))}
                                {selectedPrivileges.length > 8 && (
                                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                                        +{selectedPrivileges.length - 8} more
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Privilege Groups */}
                <div className="space-y-4">
                    {privilegeGroups.map((group) => {
                        const groupIdStr = group.id.toString();
                        const isExpanded = expandedGroups.has(groupIdStr);
                        const isLoading = loadingGroups.has(groupIdStr);
                        const privileges = getFilteredPrivileges(groupIdStr);
                        const selectedCount = getGroupSelectedCount(group.id);
                        const totalCount = groupPrivileges.get(groupIdStr)?.length || 0;
                        const GroupIcon = getGroupIcon(group.name);

                        return (
                            <Card key={group.id} className="overflow-hidden ">
                                <Collapsible open={isExpanded} onOpenChange={() => toggleGroup(group.id)}>
                                    <CollapsibleTrigger asChild>
                                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30">
                                                    <GroupIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="capitalize font-semibold text-foreground text-lg">{group.name}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                {totalCount > 0 && (
                                                    <Badge variant="outline" className="text-xs font-medium">
                                                        {selectedCount}/{totalCount} selected
                                                    </Badge>
                                                )}
                                                {isExpanded ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                                            </div>
                                        </div>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <div className="px-4 pb-4 border-t">
                                            {isLoading ? (
                                                <div className="space-y-4 pt-4">
                                                    <div className="flex items-center justify-between">
                                                        <Skeleton className="h-4 w-32" />
                                                        <div className="flex space-x-2">
                                                            <Skeleton className="h-8 w-20" />
                                                            <Skeleton className="h-8 w-24" />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                        {[...Array(6)].map((_, i) => (
                                                            <Skeleton key={i} className="h-24 rounded-lg" />
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* Group Actions */}
                                                    {privileges.length > 0 && (
                                                        <div className="flex items-center justify-between py-4">
                                                            <span className="text-sm font-medium text-muted-foreground">
                                                                {privileges.length} privilege{privileges.length !== 1 ? "s" : ""} in this group
                                                            </span>
                                                            <div className="flex space-x-2">
                                                                <Button variant="outline" size="sm" onClick={() => selectAllInGroup(group.id)} className="text-xs h-8">
                                                                    Select All
                                                                </Button>
                                                                <Button variant="outline" size="sm" onClick={() => deselectAllInGroup(group.id)} className="text-xs h-8">
                                                                    Deselect All
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Privileges Grid */}
                                                    {privileges.length > 0 ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                            {privileges.map((privilege) => (
                                                                <Card
                                                                    key={privilege.id}
                                                                    className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                                                                        isPrivilegeSelected(privilege.id) ? "ring-2 ring-orange-500 bg-orange-50/50 dark:bg-orange-950/20" : "hover:bg-muted/30"
                                                                    }`}
                                                                    onClick={() => handlePrivilegeToggle(privilege, !isPrivilegeSelected(privilege.id))}
                                                                >
                                                                    <CardContent className="p-4">
                                                                        <div className="flex items-start space-x-3">
                                                                            <Checkbox
                                                                                id={`privilege-${privilege.id}`}
                                                                                checked={isPrivilegeSelected(privilege.id)}
                                                                                onCheckedChange={(checked) => handlePrivilegeToggle(privilege, checked)}
                                                                                className="mt-1"
                                                                                onClick={(e) => e.stopPropagation()}
                                                                            />
                                                                            <div className="flex-1 min-w-0">
                                                                                <label
                                                                                    htmlFor={`privilege-${privilege.id}`}
                                                                                    className="block font-medium text-foreground cursor-pointer text-sm leading-tight"
                                                                                >
                                                                                    {privilege.name}
                                                                                </label>
                                                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{privilege.description}</p>
                                                                                {privilege.routeCount && (
                                                                                    <Badge variant="secondary" className="text-xs mt-2">
                                                                                        {privilege.routeCount} route{privilege.routeCount !== 1 ? "s" : ""}
                                                                                    </Badge>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-8 text-muted-foreground">
                                                            <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                                            <p className="text-sm">No privileges found in this group</p>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </Card>
                        );
                    })}
                </div>

                {/* Info Card */}
                <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/10 dark:to-amber-950/10 border-orange-200 dark:border-orange-900/20">
                    <CardContent className="p-4">
                        <p className="text-sm text-orange-700 dark:text-orange-400 flex items-start gap-3">
                            <Key className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>
                                Privileges define what actions users with this role can perform. Select privileges carefully based on the role's responsibilities. Click on privilege groups to expand
                                and view available permissions.
                            </span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </FormSection>
    );
});
