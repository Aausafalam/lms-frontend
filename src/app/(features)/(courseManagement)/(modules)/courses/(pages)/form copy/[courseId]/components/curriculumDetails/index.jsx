"use client";

import { useState, useEffect, useRef } from "react";
import {
    PlusCircle,
    Trash2,
    ChevronDown,
    ChevronUp,
    Clock,
    Check,
    X,
    Save,
    Video,
    FileText,
    BookOpen,
    GripVertical,
    Film,
    FileQuestion,
    Award,
    Plus,
    Search,
    ExternalLink,
    Edit3,
    Eye,
} from "lucide-react";

export default function CourseCurriculumDetails() {
    const [modules, setModules] = useState([
        {
            title: "Module 1: Introduction to Web Design",
            isOpen: true,
            items: [
                {
                    title: "Welcome to the Course",
                    duration: "5 min",
                    type: "video",
                    free: true,
                    contentId: "vid_001",
                },
                {
                    title: "Course Overview and Learning Path",
                    duration: "10 min",
                    type: "video",
                    free: true,
                    contentId: "vid_002",
                },
            ],
        },
    ]);

    const [darkMode, setDarkMode] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [currentContentType, setCurrentContentType] = useState("video");
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    // Mock content library
    const contentLibrary = {
        video: [
            { id: "vid_001", title: "Welcome to the Course", duration: "5 min" },
            { id: "vid_002", title: "Course Overview", duration: "10 min" },
            { id: "vid_003", title: "Design Principles", duration: "15 min" },
            { id: "vid_004", title: "Color Theory", duration: "20 min" },
        ],
        assignment: [
            { id: "asg_001", title: "Design Analysis", duration: "2h" },
            { id: "asg_002", title: "Portfolio Creation", duration: "3h" },
        ],
        quiz: [
            { id: "qz_001", title: "Design Fundamentals Quiz", duration: "30 min" },
            { id: "qz_002", title: "UI Principles Test", duration: "45 min" },
        ],
        text: [
            { id: "txt_001", title: "Design Resources", duration: "15 min read" },
            { id: "txt_002", title: "Additional References", duration: "10 min read" },
        ],
    };

    // Check system preference for dark mode
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setDarkMode(true);
            }

            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
                setDarkMode(event.matches);
            });
        }
    }, []);

    const addModule = () => {
        const newModuleNumber = modules.length + 1;
        setModules([
            ...modules,
            {
                title: `Module ${newModuleNumber}: New Module`,
                isOpen: true,
                items: [],
            },
        ]);
    };

    const updateModuleTitle = (index, title) => {
        const updatedModules = [...modules];
        updatedModules[index].title = title;
        setModules(updatedModules);
    };

    const toggleModuleOpen = (index) => {
        const updatedModules = [...modules];
        updatedModules[index].isOpen = !updatedModules[index].isOpen;
        setModules(updatedModules);
    };

    const removeModule = (index) => {
        const updatedModules = [...modules];
        updatedModules.splice(index, 1);
        setModules(updatedModules);
    };

    const addLesson = (moduleIndex) => {
        const updatedModules = [...modules];
        updatedModules[moduleIndex].items.push({
            title: "New Lesson",
            duration: "30 min",
            type: "video",
            free: false,
            contentId: "",
        });
        setModules(updatedModules);
    };

    const updateLesson = (moduleIndex, lessonIndex, field, value) => {
        const updatedModules = [...modules];
        updatedModules[moduleIndex].items[lessonIndex][field] = value;
        setModules(updatedModules);
    };

    const removeLesson = (moduleIndex, lessonIndex) => {
        const updatedModules = [...modules];
        updatedModules[moduleIndex].items.splice(lessonIndex, 1);
        setModules(updatedModules);
    };

    const openContentSelector = (moduleIndex, lessonIndex, type) => {
        setCurrentModuleIndex(moduleIndex);
        setCurrentLessonIndex(lessonIndex);
        setCurrentContentType(type);
        setShowContentModal(true);
    };

    const selectContent = (content) => {
        const updatedModules = [...modules];
        updatedModules[currentModuleIndex].items[currentLessonIndex] = {
            ...updatedModules[currentModuleIndex].items[currentLessonIndex],
            title: content.title,
            duration: content.duration,
            contentId: content.id,
        };
        setModules(updatedModules);
        setShowContentModal(false);
    };

    const addNewContent = () => {
        // This would typically open a form to create new content
        // For now, we'll just close the modal and keep the current lesson
        setShowContentModal(false);
    };

    const handleDragStart = (e, moduleIndex, lessonIndex) => {
        dragItem.current = { moduleIndex, lessonIndex };
    };

    const handleDragEnter = (e, moduleIndex, lessonIndex) => {
        dragOverItem.current = { moduleIndex, lessonIndex };
    };

    const handleDragEnd = () => {
        if (dragItem.current && dragOverItem.current) {
            const updatedModules = [...modules];
            const { moduleIndex: fromModuleIndex, lessonIndex: fromLessonIndex } = dragItem.current;
            const { moduleIndex: toModuleIndex, lessonIndex: toLessonIndex } = dragOverItem.current;

            // Only reorder if the positions are different
            if (fromModuleIndex === toModuleIndex && fromLessonIndex !== toLessonIndex) {
                // Reordering within the same module
                const items = [...updatedModules[fromModuleIndex].items];
                const [movedItem] = items.splice(fromLessonIndex, 1);
                items.splice(toLessonIndex, 0, movedItem);
                updatedModules[fromModuleIndex].items = items;
                setModules(updatedModules);
            } else if (fromModuleIndex !== toModuleIndex) {
                // Moving between modules
                const itemToMove = updatedModules[fromModuleIndex].items[fromLessonIndex];
                updatedModules[fromModuleIndex].items.splice(fromLessonIndex, 1);
                updatedModules[toModuleIndex].items.splice(toLessonIndex, 0, itemToMove);
                setModules(updatedModules);
            }
        }

        dragItem.current = null;
        dragOverItem.current = null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the data for submission (remove isOpen property)
        const formattedData = modules.map((module) => ({
            title: module.title,
            items: module.items.map((item) => ({
                title: item.title,
                duration: item.duration,
                type: item.type,
                free: item.free,
                contentId: item.contentId,
            })),
        }));

        console.log(JSON.stringify(formattedData, null, 2));

        // Show success message
        alert("Curriculum saved successfully!");
    };

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
                return <Video className="text-gray-500" size={18} />;
        }
    };

    const filteredContent = contentLibrary[currentContentType]?.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase())) || [];

    return (
        <div className={" border border-gray-200 dark:border-gray-600 rounded-lg"}>
            <div className="mx-auto px-4 py-8 ">
                {showPreview ? (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Course Curriculum Preview</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">This is how your curriculum will appear to students.</p>
                        </div>

                        {modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <div className="p-4 border-b dark:border-gray-700 bg-gradient-to-r from-orange-500/10 to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/20">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{module.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{module.items.length} lessons</p>
                                </div>
                                <div className="divide-y dark:divide-gray-700">
                                    {module.items.map((lesson, lessonIndex) => (
                                        <div key={lessonIndex} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <div className="flex items-center">
                                                {getContentTypeIcon(lesson.type)}
                                                <div className="ml-3">
                                                    <h4 className="font-medium text-gray-800 dark:text-white">{lesson.title}</h4>
                                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                        <Clock size={14} className="mr-1" />
                                                        {lesson.duration}
                                                    </div>
                                                </div>
                                            </div>
                                            {lesson.free && (
                                                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 font-medium">Free</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end mt-8">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 flex items-center"
                            >
                                <Edit3 size={18} className="mr-2" />
                                Back to Editor
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white mr-3">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Build Your Course Curriculum</h2>
                                    <p className="text-gray-600 dark:text-gray-300">Create modules and lessons for your course. Drag to reorder.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-center">
                                <div className="bg-orange-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{modules.length}</p>
                                    <p className="text-gray-600 dark:text-gray-400">Modules</p>
                                </div>
                                <div className="bg-orange-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{modules.reduce((total, module) => total + module.items.length, 0)}</p>
                                    <p className="text-gray-600 dark:text-gray-400">Lessons</p>
                                </div>
                                <div className="bg-orange-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                        {modules.reduce((total, module) => total + module.items.filter((item) => item.free).length, 0)}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">Free Lessons</p>
                                </div>
                            </div>
                        </div>

                        {modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750">
                                    <div className="flex items-center flex-grow">
                                        <button
                                            type="button"
                                            onClick={() => toggleModuleOpen(moduleIndex)}
                                            className="mr-2 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                                        >
                                            {module.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <input
                                            type="text"
                                            value={module.title}
                                            onChange={(e) => updateModuleTitle(moduleIndex, e.target.value)}
                                            className="flex-grow bg-transparent border-0 focus:ring-0 p-0 text-lg font-medium text-gray-800 dark:text-white focus:outline-none"
                                            placeholder="Module Title"
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                                            {module.items.length} {module.items.length === 1 ? "lesson" : "lessons"}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeModule(moduleIndex)}
                                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 ml-2 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                {module.isOpen && (
                                    <div className="p-4 space-y-4">
                                        {module.items.length === 0 ? (
                                            <div className="text-center py-8 px-4">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 mb-4">
                                                    <PlusCircle size={24} />
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No lessons yet</h3>
                                                <p className="text-gray-500 dark:text-gray-400 mb-4">Add your first lesson to this module</p>
                                                <button
                                                    type="button"
                                                    onClick={() => addLesson(moduleIndex)}
                                                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 inline-flex items-center"
                                                >
                                                    <Plus size={18} className="mr-2" />
                                                    Add First Lesson
                                                </button>
                                            </div>
                                        ) : (
                                            module.items.map((lesson, lessonIndex) => (
                                                <div
                                                    key={lessonIndex}
                                                    className="bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800 transition-colors duration-200 overflow-hidden"
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, moduleIndex, lessonIndex)}
                                                    onDragEnter={(e) => handleDragEnter(e, moduleIndex, lessonIndex)}
                                                    onDragEnd={handleDragEnd}
                                                    onDragOver={(e) => e.preventDefault()}
                                                >
                                                    <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                                        <div className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2">
                                                            <GripVertical size={16} />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="flex items-center">
                                                                {getContentTypeIcon(lesson.type)}
                                                                <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">Lesson {lessonIndex + 1}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLesson(moduleIndex, lessonIndex)}
                                                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>

                                                    <div className="p-4 dark:bg-gray-800">
                                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                                            <div className="md:col-span-6">
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lesson Title</label>
                                                                <input
                                                                    type="text"
                                                                    value={lesson.title}
                                                                    onChange={(e) => updateLesson(moduleIndex, lessonIndex, "title", e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                                    placeholder="Lesson Title"
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                                                                <div className="relative">
                                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                        <Clock size={16} className="text-gray-400" />
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        value={lesson.duration}
                                                                        onChange={(e) => updateLesson(moduleIndex, lessonIndex, "duration", e.target.value)}
                                                                        className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                                        placeholder="30 min"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="md:col-span-3">
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content Type</label>
                                                                <div className="flex">
                                                                    <select
                                                                        value={lesson.type}
                                                                        onChange={(e) => updateLesson(moduleIndex, lessonIndex, "type", e.target.value)}
                                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                                    >
                                                                        <option value="video">Video</option>
                                                                        <option value="assignment">Assignment</option>
                                                                        <option value="quiz">Quiz</option>
                                                                        <option value="text">Text</option>
                                                                    </select>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openContentSelector(moduleIndex, lessonIndex, lesson.type)}
                                                                        className="px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md shadow-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 focus:outline-none"
                                                                    >
                                                                        <Search size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="md:col-span-1">
                                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Free</label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => updateLesson(moduleIndex, lessonIndex, "free", !lesson.free)}
                                                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition-colors duration-200 ${
                                                                        lesson.free
                                                                            ? "bg-gradient-to-r from-orange-500 to-orange-600 border-orange-500 text-white dark:from-orange-600 dark:to-orange-700 dark:border-orange-600"
                                                                            : "bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                                                    }`}
                                                                >
                                                                    {lesson.free ? <Check size={16} className="mx-auto" /> : <X size={16} className="mx-auto" />}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {lesson.contentId && (
                                                            <div className="mt-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-md border border-orange-100 dark:border-orange-800/30 text-sm text-orange-700 dark:text-orange-300 flex items-center">
                                                                <div className="flex-grow">Content ID: {lesson.contentId}</div>
                                                                <button type="button" className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200">
                                                                    <ExternalLink size={14} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        )}

                                        {module.items.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => addLesson(moduleIndex)}
                                                className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500 dark:hover:border-orange-400 focus:outline-none transition-colors duration-200 flex items-center justify-center"
                                            >
                                                <PlusCircle size={18} className="mr-2" />
                                                Add Lesson
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addModule}
                            className="w-full py-4 px-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500 dark:hover:border-orange-400 focus:outline-none transition-colors duration-200 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm"
                        >
                            <PlusCircle size={20} className="mr-2" />
                            Add Module
                        </button>

                        <div className="flex justify-end mt-8">
                            <button
                                type="button"
                                onClick={() => setShowPreview(true)}
                                className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 flex items-center mr-3"
                            >
                                <Eye size={18} className="mr-2" />
                                Preview
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 flex items-center"
                            >
                                <Save size={18} className="mr-2" />
                                Save Curriculum
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Content Selection Modal */}
            {showContentModal && (
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Select {currentContentType.charAt(0).toUpperCase() + currentContentType.slice(1)} Content</h3>
                            <button onClick={() => setShowContentModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 border-b dark:border-gray-700">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={16} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder={`Search ${currentContentType}s...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto">
                            {filteredContent.length > 0 ? (
                                <div className="divide-y dark:divide-gray-700">
                                    {filteredContent.map((content) => (
                                        <button
                                            key={content.id}
                                            onClick={() => selectContent(content)}
                                            className="w-full text-left p-4 hover:bg-orange-50 dark:hover:bg-gray-800 flex items-center transition-colors duration-150"
                                        >
                                            <div className="mr-3">{getContentTypeIcon(currentContentType)}</div>
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
                            <button
                                onClick={() => setShowContentModal(false)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button onClick={addNewContent} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-sm flex items-center">
                                <Plus size={16} className="mr-2" />
                                Create New {currentContentType.charAt(0).toUpperCase() + currentContentType.slice(1)}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const response = {
    modules: [
        {
            title: "Module 1",
            items: [
                {
                    title: "Lesson 1",
                    duration: "30 min",
                    type: "video",
                    free: true,
                    contentId: "12345",
                },
                {
                    title: "Lesson 2",
                    duration: "45 min",
                    type: "assignment",
                    free: false,
                    contentId: "67890",
                },
            ],
        },
        {
            title: "Module 2",
            items: [
                {
                    title: "Lesson 3",
                    duration: "20 min",
                    type: "quiz",
                    free: false,
                    contentId: "54321",
                },
            ],
        },
    ],
};
