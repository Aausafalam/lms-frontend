"use client";

import { useState } from "react";
import { X, Search, Plus, Clock, Film, FileText, FileQuestion, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contentLibrary } from "../../data/initial-data";

export function ContentLibraryModal({ contentType, onSelect, onClose }) {
    const [searchTerm, setSearchTerm] = useState("");

    const getContentTypeIcon = (type) => {
        switch (type) {
            case "video":
                return <Film className="text-blue-500" size={18} />;
            case "assignment":
                return <FileText className="text-green-500" size={18} />;
            case "quiz":
                return <FileQuestion className="text-purple-500" size={18} />;
            case "text":
                return <BookOpen className="text-yellow-500" size={18} />;
            default:
                return <Film className="text-gray-500" size={18} />;
        }
    };

    const filteredContent = contentLibrary[contentType]?.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())) || [];

    return (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Select {contentType.charAt(0).toUpperCase() + contentType.slice(1)} Content</h3>
                    <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X size={20} />
                    </Button>
                </div>

                <div className="p-4 border-b dark:border-gray-700">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder={`Search ${contentType}s...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto">
                    {filteredContent.length > 0 ? (
                        <div className="divide-y dark:divide-gray-700">
                            {filteredContent.map((content) => (
                                <button
                                    key={content.id}
                                    onClick={() => onSelect(content)}
                                    className="w-full text-left p-4 hover:bg-indigo-50 dark:hover:bg-gray-800 flex items-center transition-colors duration-150"
                                >
                                    <div className="mr-3">{getContentTypeIcon(contentType)}</div>
                                    <div className="flex-grow">
                                        <h4 className="font-medium text-gray-800 dark:text-white">{content.title}</h4>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <Clock size={14} className="mr-1" />
                                            {content.duration}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 px-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 mb-4">
                                <Search size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No content found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">Try a different search term or create new content</p>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t dark:border-gray-700 flex justify-between">
                    <Button onClick={onClose} variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                        Cancel
                    </Button>
                    <Button onClick={onClose} className="">
                        <Plus size={16} />
                        Create New {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                    </Button>
                </div>
            </div>
        </div>
    );
}
