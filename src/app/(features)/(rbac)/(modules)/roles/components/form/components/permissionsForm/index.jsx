import { Search } from "lucide-react";
import React from "react";

const PermissionForm = ({ searchQuery, setSearchQuery }) => {

    return (
        <div className="p-6 md:p-8">
            <div className="space-y-6">
                {/* Search and stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input id="search-permissions" type="text" placeholder="Search permissions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="font-medium">
                            {selectedPermissionsCount} of {totalPermissions} selected
                        </span>
                        <Progress value={percentSelected} className="w-24" />
                        <span>{percentSelected}%</span>
                    </div>
                </div>

                {/* Module tabs */}
                <div className="mb-6 border-b overflow-x-auto hide-scrollbar">
                    <div className="flex space-x-1 min-w-max">
                        {permissionGroups.map((group) => (
                            <button
                                key={group.id}
                                type="button"
                                onClick={() => setPermissionActiveTab(group.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
                                    permissionActiveTab === group.id ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                {group.name}
                                <Badge variant={permissionActiveTab === group.id ? "outline" : "secondary"} className={permissionActiveTab === group.id ? "ml-2 bg-white/20 text-white" : "ml-2"}>
                                    {group.permissions.length}
                                </Badge>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bulk actions */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">{permissionGroups.find((g) => g.id === permissionActiveTab)?.name} Permissions</h3>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleSelectAllInGroup(permissionActiveTab)}>
                            Select All
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                const group = permissionGroups.find((g) => g.id === permissionActiveTab);
                                if (group) {
                                    const groupPermissionIds = group.permissions.map((p) => p.id);
                                    setSelectedPermissions((prev) => prev.filter((id) => !groupPermissionIds.includes(id)));
                                }
                            }}
                        >
                            Deselect All
                        </Button>
                    </div>
                </div>

                {/* Permissions grid */}
                <div className="bg-gray-50 rounded-lg border overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto p-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
                            {isLoadingPermissions
                                ? Array.from({ length: 21 }).map((_, index) => <div key={index} className="bg-gray-200 animate-pulse h-12 rounded-lg" />)
                                : permissionGroups
                                      .find((g) => g.id === permissionActiveTab)
                                      ?.permissions.filter((permission) => permission.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                      .map((permission) => (
                                          <label
                                              key={permission.id}
                                              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-150 ${
                                                  selectedPermissions.includes(permission.id) ? "bg-purple-50 border border-purple-200" : "bg-white border hover:bg-gray-50"
                                              }`}
                                          >
                                              <Checkbox checked={selectedPermissions.includes(permission.id)} onCheckedChange={() => handlePermissionChange(permission.id)} className="mr-2" />
                                              <span className="text-sm truncate">{permission.name}</span>
                                          </label>
                                      ))}
                        </div>
                    </div>
                </div>

                {/* No results message */}
                {searchQuery && filteredPermissionGroups.length === 0 && (
                    <div className="text-center py-8">
                        <div className="mx-auto h-12 w-12 text-gray-400">
                            <Search className="h-12 w-12" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No permissions found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={handleNextTab}>
                    Save and Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default PermissionForm;
