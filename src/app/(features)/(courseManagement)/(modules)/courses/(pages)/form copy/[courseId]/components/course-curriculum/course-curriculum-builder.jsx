"use client";

import React from "react";

import { useState } from "react";
import { Save, Eye, Loader2, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ModuleList from "./module-list";
import CurriculumPreview from "./curriculum-preview";
import CurriculumStats from "./curriculum-stats";
import { useCurriculum } from "../../hooks/use-curriculum";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function CourseCurriculumBuilder() {
    const { modules, setModules } = useCurriculum();
    const [showPreview, setShowPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showImportDialog, setShowImportDialog] = useState(false);
    const [importData, setImportData] = useState("");
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        // Format the data for submission
        const formattedData = modules.map((module) => ({
            title: module.title,
            lessons: module.lessons.map((lesson) => ({
                title: lesson.title,
                duration: lesson.duration,
                type: lesson.type,
                free: lesson.free,
                contentId: lesson.contentId,
                publishDate: lesson.publishDate,
                instructor: lesson.instructor,
                topics: lesson.topics,
            })),
        }));

        try {
            // Simulate API call
            console.log("Sending data to API:", JSON.stringify(formattedData, null, 2));

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast({
                title: "Success!",
                description: "Curriculum saved successfully.",
                variant: "default",
            });
        } catch (error) {
            console.error("Error saving curriculum:", error);
            toast({
                title: "Error",
                description: "Failed to save curriculum. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleExport = () => {
        try {
            const dataStr = JSON.stringify(modules, null, 2);
            const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

            const exportFileDefaultName = `course-curriculum-${new Date().toISOString().slice(0, 10)}.json`;

            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", dataUri);
            linkElement.setAttribute("download", exportFileDefaultName);
            linkElement.click();

            toast({
                title: "Exported Successfully",
                description: "Your curriculum has been exported as JSON",
            });
        } catch (error) {
            toast({
                title: "Export Failed",
                description: "There was an error exporting your curriculum",
                variant: "destructive",
            });
        }
    };

    const handleImport = () => {
        try {
            const importedModules = JSON.parse(importData);
            if (Array.isArray(importedModules)) {
                setModules(importedModules);
                setShowImportDialog(false);
                setImportData("");
                toast({
                    title: "Import Successful",
                    description: "Your curriculum has been imported",
                });
            } else {
                throw new Error("Invalid format");
            }
        } catch (error) {
            toast({
                title: "Import Failed",
                description: "The JSON format is invalid. Please check and try again.",
                variant: "destructive",
            });
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                setImportData(event.target.result);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <div className="mx-auto px-4 py-8">
                {showPreview ? (
                    <CurriculumPreview modules={modules} onBackToEditor={() => setShowPreview(false)} />
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <CurriculumStats modules={modules} />

                            <div className="flex flex-wrap gap-2">
                                <Button type="button" onClick={handleExport} variant="outline" className="gap-2">
                                    <Download size={16} />
                                    Export
                                </Button>
                                <Button type="button" onClick={() => setShowImportDialog(true)} variant="outline" className="gap-2">
                                    <Upload size={16} />
                                    Import
                                </Button>
                            </div>
                        </div>

                        <ModuleList />

                        <div className="flex justify-end mt-8 gap-3">
                            <Button type="button" onClick={() => setShowPreview(true)} variant="outline" className="gap-2">
                                <Eye size={18} />
                                Preview
                            </Button>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={18} />}
                                {isSaving ? "Saving..." : "Save Curriculum"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>

            <AlertDialog open={showImportDialog} onOpenChange={setShowImportDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Import Curriculum</AlertDialogTitle>
                        <AlertDialogDescription>Upload a JSON file or paste JSON data to import a curriculum. This will replace your current curriculum.</AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="file-upload" className="text-sm font-medium">
                                Upload JSON File
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".json"
                                onChange={handleFileUpload}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="json-data" className="text-sm font-medium">
                                Or Paste JSON Data
                            </label>
                            <textarea
                                id="json-data"
                                value={importData}
                                onChange={(e) => setImportData(e.target.value)}
                                rows={5}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                                placeholder='[{"id": "module-1", "title": "Module 1", "lessons": [...]}]'
                            />
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleImport} disabled={!importData}>
                            Import
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
