"use client";

import React from "react";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModuleItem from "./module-item";
import { useCurriculum } from "../../hooks/use-curriculum";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function ModuleList() {
    const { modules, addModule, reorderModules, removeModule } = useCurriculum();
    const [draggedModuleIndex, setDraggedModuleIndex] = useState(null);
    const [moduleToDelete, setModuleToDelete] = useState(null);

    const handleDragStart = (index) => {
        setDraggedModuleIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedModuleIndex === null || draggedModuleIndex === index) return;

        reorderModules(draggedModuleIndex, index);
        setDraggedModuleIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedModuleIndex(null);
    };

    return (
        <div className="space-y-6">
            {modules.map((module, moduleIndex) => (
                <ModuleItem
                    key={module.id}
                    module={module}
                    moduleIndex={moduleIndex}
                    onDragStart={() => handleDragStart(moduleIndex)}
                    onDragOver={(e) => handleDragOver(e, moduleIndex)}
                    onDragEnd={handleDragEnd}
                    onDeleteRequest={() => setModuleToDelete(moduleIndex)}
                />
            ))}

            <Button
                type="button"
                onClick={addModule}
                variant="outline"
                className="w-full py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary bg-white dark:bg-gray-800 shadow-sm gap-2"
            >
                <PlusCircle size={20} />
                Add Module
            </Button>

            <AlertDialog open={moduleToDelete !== null} onOpenChange={(open) => !open && setModuleToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete this module and all its lessons and topics. This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (moduleToDelete !== null) {
                                    removeModule(moduleToDelete);
                                    setModuleToDelete(null);
                                }
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
