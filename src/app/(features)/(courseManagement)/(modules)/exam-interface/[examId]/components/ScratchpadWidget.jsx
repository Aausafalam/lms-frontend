"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, FileText, Trash2, Save } from "lucide-react";

export default function ScratchpadWidget({ onClose }) {
    const [notes, setNotes] = useState("");
    const [savedNotes, setSavedNotes] = useState([]);

    const saveNote = () => {
        if (notes.trim()) {
            setSavedNotes([...savedNotes, notes]);
            setNotes("");
        }
    };

    const clearAll = () => {
        setNotes("");
        setSavedNotes([]);
    };

    const deleteNote = (index) => {
        setSavedNotes(savedNotes.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl w-80">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="w-5 h-5 text-blue-500" />
                            Scratchpad
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Current Note */}
                    <div className="space-y-2">
                        <Textarea placeholder="Write your rough work, formulas, or notes here..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={saveNote} disabled={!notes.trim()} className="flex-1">
                                <Save className="w-4 h-4 mr-1" />
                                Save Note
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setNotes("")} disabled={!notes}>
                                Clear
                            </Button>
                        </div>
                    </div>

                    {/* Saved Notes */}
                    {savedNotes.length > 0 && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Saved Notes</h4>
                                <Button variant="ghost" size="sm" onClick={clearAll}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                            <div className="max-h-48 overflow-y-auto space-y-2">
                                {savedNotes.map((note, index) => (
                                    <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm relative group">
                                        <div className="pr-6">{note}</div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteNote(index)}
                                            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Formulas */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quick Formulas</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <Button variant="outline" size="sm" onClick={() => setNotes(notes + "a² + b² = c²\n")} className="text-xs h-8">
                                Pythagorean
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setNotes(notes + "ax² + bx + c = 0\n")} className="text-xs h-8">
                                Quadratic
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setNotes(notes + "sin²θ + cos²θ = 1\n")} className="text-xs h-8">
                                Trig Identity
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setNotes(notes + "e^(iπ) + 1 = 0\n")} className="text-xs h-8">
                                Euler's
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
