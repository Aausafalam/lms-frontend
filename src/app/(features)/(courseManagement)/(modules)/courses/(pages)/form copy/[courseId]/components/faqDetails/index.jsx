"use client";

import { useState, useEffect, useRef } from "react";
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Save, GripVertical, HelpCircle, MessageSquare, Eye, Edit3, Check, AlignLeft } from "lucide-react";

export default function FAQDetails() {
    const [faqItems, setFaqItems] = useState([
        {
            question: "Do I need prior experience to take this course?",
            answer: "No, this course is designed for beginners with no prior experience in web design or development. We start with the fundamentals and gradually build up to more advanced concepts. If you do have some experience, you can skip ahead to the sections that interest you most.",
            isOpen: true,
        },
        {
            question: "How long do I have access to the course materials?",
            answer: "You'll have lifetime access to all course materials, including any future updates. Once you enroll, you can revisit the lessons as many times as you need, even after you've completed the course.",
            isOpen: false,
        },
    ]);

    const [darkMode, setDarkMode] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

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

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const addFaqItem = () => {
        setFaqItems([
            ...faqItems,
            {
                question: "New Question",
                answer: "Your answer here...",
                isOpen: true,
            },
        ]);
    };

    const updateFaqItem = (index, field, value) => {
        const updatedItems = [...faqItems];
        updatedItems[index][field] = value;
        setFaqItems(updatedItems);
    };

    const toggleFaqItemOpen = (index) => {
        const updatedItems = [...faqItems];
        updatedItems[index].isOpen = !updatedItems[index].isOpen;
        setFaqItems(updatedItems);
    };

    const removeFaqItem = (index) => {
        const updatedItems = [...faqItems];
        updatedItems.splice(index, 1);
        setFaqItems(updatedItems);
    };

    const handleDragStart = (e, index) => {
        dragItem.current = index;
    };

    const handleDragEnter = (e, index) => {
        dragOverItem.current = index;
    };

    const handleDragEnd = () => {
        if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
            const updatedItems = [...faqItems];
            const draggedItem = updatedItems[dragItem.current];
            updatedItems.splice(dragItem.current, 1);
            updatedItems.splice(dragOverItem.current, 0, draggedItem);
            setFaqItems(updatedItems);
        }

        dragItem.current = null;
        dragOverItem.current = null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the data for submission (remove isOpen property)
        const formattedData = faqItems.map(({ question, answer }) => ({
            question,
            answer,
        }));

        console.log(JSON.stringify(formattedData, null, 2));

        // Show success message
        alert("FAQ section saved successfully!");
    };

    return (
        <div className={` border border-gray-200 dark:border-gray-600 rounded-lg`}>
            <div className="mx-auto px-4 py-8">
                {showPreview ? (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">Find answers to common questions about our course.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <div className="divide-y dark:divide-gray-700">
                                {faqItems.map((item, index) => (
                                    <div key={index} className="group">
                                        <button
                                            className="w-full text-left p-6 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                                            onClick={() => {
                                                const updatedItems = [...faqItems];
                                                updatedItems[index].isOpen = !updatedItems[index].isOpen;
                                                setFaqItems(updatedItems);
                                            }}
                                        >
                                            <div className="flex">
                                                <HelpCircle size={20} className="text-orange-500 dark:text-orange-400 mt-0.5 mr-3 flex-shrink-0" />
                                                <h3 className="text-lg font-medium text-gray-800 dark:text-white">{item.question}</h3>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                {item.isOpen ? (
                                                    <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                )}
                                            </div>
                                        </button>
                                        {item.isOpen && (
                                            <div className="px-6 pb-6 pt-0">
                                                <div className="pl-9 pr-6">
                                                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{item.answer}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

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
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Build Your FAQ Section</h2>
                                    <p className="text-gray-600 dark:text-gray-300">Create questions and answers for your course FAQ. Drag to reorder.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-center">
                                <div className="bg-orange-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{faqItems.length}</p>
                                    <p className="text-gray-600 dark:text-gray-400">FAQ Items</p>
                                </div>
                                <div className="bg-orange-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{faqItems.reduce((total, item) => total + (item.answer.length > 0 ? 1 : 0), 0)}</p>
                                    <p className="text-gray-600 dark:text-gray-400">Completed Answers</p>
                                </div>
                            </div>
                        </div>

                        {faqItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700"
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnter={(e) => handleDragEnter(e, index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750">
                                    <div className="flex items-center flex-grow">
                                        <div className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-2">
                                            <GripVertical size={18} />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => toggleFaqItemOpen(index)}
                                            className="mr-2 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                                        >
                                            {item.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <div className="flex items-center">
                                            <HelpCircle size={18} className="text-orange-500 dark:text-orange-400 mr-2" />
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">FAQ Item {index + 1}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => removeFaqItem(index)}
                                            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 ml-2 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                {item.isOpen && (
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <HelpCircle size={16} className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={item.question}
                                                    onChange={(e) => updateFaqItem(index, "question", e.target.value)}
                                                    className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                    placeholder="Enter your question here"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Answer</label>
                                            <div className="relative">
                                                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                                    <AlignLeft size={16} className="text-gray-400" />
                                                </div>
                                                <textarea
                                                    value={item.answer}
                                                    onChange={(e) => updateFaqItem(index, "answer", e.target.value)}
                                                    className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white min-h-[120px]"
                                                    placeholder="Enter your answer here"
                                                />
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                                                <span>Be clear and concise in your answer</span>
                                                <span>{item.answer.length} characters</span>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <Check size={16} className={`mr-1 ${item.question.length > 10 ? "text-green-500" : "text-gray-300 dark:text-gray-600"}`} />
                                                    <span>Question is descriptive</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <Check size={16} className={`mr-1 ${item.answer.length > 50 ? "text-green-500" : "text-gray-300 dark:text-gray-600"}`} />
                                                    <span>Answer is detailed</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addFaqItem}
                            className="w-full py-4 px-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500 dark:hover:border-orange-400 focus:outline-none transition-colors duration-200 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm"
                        >
                            <PlusCircle size={20} className="mr-2" />
                            Add FAQ Item
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
                                Save FAQ Section
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

const response = {
    faqItems: [
        {
            question: "Do I need prior experience to take this course?",
            answer: "No, this course is designed for beginners with no prior experience in web design or development. We start with the fundamentals and gradually build up to more advanced concepts. If you do have some experience, you can skip ahead to the sections that interest you most.",
            isOpen: true,
        },
        {
            question: "How long do I have access to the course materials?",
            answer: "You'll have lifetime access to all course materials, including any future updates. Once you enroll, you can revisit the lessons as many times as you need, even after you've completed the course.",
            isOpen: false,
        },
    ],
};
