"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, List, ListOrdered } from "lucide-react";

export default function RichTextEditor({ value, onChange, placeholder }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command, value) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    return (
        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden focus-within:border-orange-300 dark:focus-within:border-orange-700">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("bold")} className="h-8 w-8 p-0">
                    <Bold className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("italic")} className="h-8 w-8 p-0">
                    <Italic className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("underline")} className="h-8 w-8 p-0">
                    <Underline className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
                <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("insertUnorderedList")} className="h-8 w-8 p-0">
                    <List className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("insertOrderedList")} className="h-8 w-8 p-0">
                    <ListOrdered className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
                <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "h3")} className="h-8 px-2 text-xs">
                    H3
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("removeFormat")} className="h-8 px-2 text-xs">
                    Clear
                </Button>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="min-h-40 p-4 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                style={{ minHeight: "160px" }}
                data-placeholder={placeholder}
                suppressContentEditableWarning={true}
            />

            <style jsx>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
