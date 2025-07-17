"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send, ChevronRight, ChevronLeft, Calculator, PieChart, Layers, Save, Bookmark } from "lucide-react";

// Component imports
import QuestionCard from "./components/QuestionCard";
import QuestionNavigation from "./components/QuestionNavigation";
import ExamHeader from "./components/ExamHeader";
import CompactTimer from "./components/CompactTimer";
import WebcamMonitor from "./components/WebcamMonitor";
import CalculatorWidget from "./components/CalculatorWidget";
import ScratchpadWidget from "./components/ScratchpadWidget";
import ProctoringSidebar from "./components/ProctoringSidebar";
import QuestionPaperWidget from "./components/QuestionPaperWidget";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ExamDetails from "./components/exam-details";
import { sampleExamData } from "../../exams/(pages)/form/utils/seeds";
import "./styles/index.css";
/**
 * Mock exam data with comprehensive question types and proctoring settings
 * In a real application, this would be fetched from an API
 */
const mockExam = {
    id: "1",
    title: "Advanced Mathematics Comprehensive Exam",
    subtitle: "Final Assessment - Spring 2024",
    duration: 180, // 3 hours in minutes
    totalQuestions: 30,
    difficulty: "Advanced",
    instructor: "Dr. Sarah Johnson",
    course: "MATH 401",
    maxScore: 100,
    passingScore: 70,
    proctoring: {
        webcamRequired: false,
        screenRecording: true,
        tabSwitchLimit: 3,
        faceDetection: true,
        photoInterval: 300, // 5 minutes in seconds
    },
    sections: [
        {
            id: "calculus",
            name: "Calculus",
            icon: Calculator,
            color: "from-blue-500 to-blue-600",
            questions: 10,
            description: "Derivatives, integrals, and applications",
            difficulty: "Hard",
        },
        {
            id: "algebra",
            name: "Linear Algebra",
            icon: Layers,
            color: "from-purple-500 to-purple-600",
            questions: 10,
            description: "Matrices, vectors, and transformations",
            difficulty: "Medium",
        },
        {
            id: "statistics",
            name: "Statistics",
            icon: PieChart,
            color: "from-green-500 to-green-600",
            questions: 10,
            description: "Probability, distributions, and inference",
            difficulty: "Medium",
        },
    ],
    questions: [
        {
            id: 1,
            section: "calculus",
            type: "mcq",
            difficulty: "hard",
            points: 4,
            question: "Find the derivative of f(x) = x³ sin(2x) using the product rule.",
            explanation: "Use the product rule: (uv)' = u'v + uv'",
            options: ["3x² sin(2x) + 2x³ cos(2x)", "3x² sin(2x) + x³ cos(2x)", "x² sin(2x) + 2x³ cos(2x)", "3x² cos(2x) + 2x³ sin(2x)"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 2,
            section: "calculus",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The derivative of a constant function is always zero.",
            explanation: "Constants have zero rate of change",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 3,
            section: "calculus",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "What is the integral of 3x² dx?",
            explanation: "The integral of x^n dx is (x^(n+1))/(n+1) + C",
            options: ["x³ + C", "3x³ + C", "x² + C", "9x + C"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 4,
            section: "algebra",
            type: "true-false",
            difficulty: "medium",
            points: 3,
            question: "The quadratic formula always provides real roots for any quadratic equation.",
            explanation: "The discriminant determines the nature of roots",
            correctAnswer: false,
            timeEstimate: 2,
        },
        {
            id: 5,
            section: "statistics",
            type: "fill-blanks",
            difficulty: "hard",
            points: 4,
            question: "The mean of a dataset is calculated as _____ divided by the number of observations.",
            explanation: "Mean is the sum of all values divided by the count",
            blanks: ["sum of all values"],
            correctAnswer: ["sum of all values"],
            timeEstimate: 3,
        },
        {
            id: 6,
            section: "calculus",
            type: "subjective",
            difficulty: "medium",
            points: 3,
            question: "Explain the significance of the Fundamental Theorem of Calculus.",
            explanation: "Links differentiation and integration",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 7,
            section: "algebra",
            type: "match-following",
            difficulty: "easy",
            points: 2,
            question: "Match the equation with its type.",
            leftItems: ["x² + 2x + 1 = 0", "2x + 3 = 0", "x³ - 4x = 0"],
            rightItems: ["Linear", "Quadratic", "Cubic"],
            correctAnswer: [1, 0, 2],
            timeEstimate: 3,
        },
        {
            id: 8,
            section: "statistics",
            type: "multi-choice",
            difficulty: "medium",
            points: 3,
            question: "Which measures are affected by extreme values in a dataset?",
            options: ["Mean", "Median", "Mode", "Midrange"],
            correctAnswer: [0, 3],
            timeEstimate: 3,
        },
        {
            id: 9,
            section: "calculus",
            type: "subjective-rich",
            difficulty: "hard",
            points: 5,
            question: "Describe the process of finding critical points of a function and their significance.",
            explanation: "Critical points occur where derivative is zero or undefined",
            maxWords: 150,
            timeEstimate: 6,
        },
        {
            id: 10,
            section: "algebra",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "Solve for x: 2x + 5 = 11",
            options: ["3", "4", "5", "6"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 11,
            section: "statistics",
            type: "true-false",
            difficulty: "easy",
            points: 2,
            question: "The median is always one of the values in a dataset.",
            explanation: "Median is the middle value in an ordered dataset",
            correctAnswer: false,
            timeEstimate: 1,
        },
        {
            id: 12,
            section: "calculus",
            type: "fill-blanks",
            difficulty: "medium",
            points: 3,
            question: "The derivative of sin(x) is _____",
            blanks: ["cos(x)"],
            correctAnswer: ["cos(x)"],
            timeEstimate: 2,
        },
        {
            id: 13,
            section: "algebra",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain how to solve a system of linear equations using substitution.",
            explanation: "Solve one equation for one variable and substitute",
            maxWords: 120,
            timeEstimate: 5,
        },
        {
            id: 14,
            section: "statistics",
            type: "match-following",
            difficulty: "medium",
            points: 3,
            question: "Match the statistical term with its definition.",
            leftItems: ["Mean", "Median", "Mode"],
            rightItems: ["Average", "Middle value", "Most frequent"],
            correctAnswer: [0, 1, 2],
            timeEstimate: 3,
        },
        {
            id: 15,
            section: "calculus",
            type: "multi-choice",
            difficulty: "hard",
            points: 4,
            question: "Which functions are continuous everywhere?",
            options: ["Polynomial", "Rational", "Exponential", "Trigonometric"],
            correctAnswer: [0, 2, 3],
            timeEstimate: 4,
        },
        {
            id: 16,
            section: "algebra",
            type: "mcq",
            difficulty: "medium",
            points: 3,
            question: "What is the vertex of the parabola y = x² - 4x + 3?",
            options: ["(2, -1)", "(2, 1)", "(-2, 1)", "(1, 2)"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 17,
            section: "statistics",
            type: "true-false",
            difficulty: "easy",
            points: 2,
            question: "A histogram is used to represent categorical data.",
            explanation: "Histograms represent numerical data",
            correctAnswer: false,
            timeEstimate: 1,
        },
        {
            id: 18,
            section: "calculus",
            type: "subjective-rich",
            difficulty: "medium",
            points: 4,
            question: "Explain the concept of limits in calculus with examples.",
            explanation: "Limits describe the behavior of functions as inputs approach a value",
            maxWords: 150,
            timeEstimate: 6,
        },
        {
            id: 19,
            section: "algebra",
            type: "fill-blanks",
            difficulty: "easy",
            points: 2,
            question: "The slope of a line is given by _____",
            blanks: ["(y₂-y₁)/(x₂-x₁)"],
            correctAnswer: ["(y₂-y₁)/(x₂-x₁)"],
            timeEstimate: 2,
        },
        {
            id: 20,
            section: "statistics",
            type: "mcq",
            difficulty: "hard",
            points: 4,
            question: "What is the probability of getting exactly 3 heads in 5 coin tosses?",
            options: ["0.3125", "0.5", "0.25", "0.125"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 21,
            section: "calculus",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The chain rule is used for composite functions.",
            explanation: "Chain rule: d/dx(f(g(x))) = f'(g(x))g'(x)",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 22,
            section: "algebra",
            type: "multi-choice",
            difficulty: "medium",
            points: 3,
            question: "Which are solutions to x² - 5x + 6 = 0?",
            options: ["2", "3", "-2", "-3"],
            correctAnswer: [0, 1],
            timeEstimate: 3,
        },
        {
            id: 23,
            section: "statistics",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain the difference between correlation and causation.",
            explanation: "Correlation does not imply causation",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 1,
            section: "calculus",
            type: "mcq",
            difficulty: "hard",
            points: 4,
            question: "Find the derivative of f(x) = x³ sin(2x) using the product rule.",
            explanation: "Use the product rule: (uv)' = u'v + uv'",
            options: ["3x² sin(2x) + 2x³ cos(2x)", "3x² sin(2x) + x³ cos(2x)", "x² sin(2x) + 2x³ cos(2x)", "3x² cos(2x) + 2x³ sin(2x)"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 2,
            section: "calculus",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The derivative of a constant function is always zero.",
            explanation: "Constants have zero rate of change",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 3,
            section: "calculus",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "What is the integral of 3x² dx?",
            explanation: "The integral of x^n dx is (x^(n+1))/(n+1) + C",
            options: ["x³ + C", "3x³ + C", "x² + C", "9x + C"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 4,
            section: "algebra",
            type: "true-false",
            difficulty: "medium",
            points: 3,
            question: "The quadratic formula always provides real roots for any quadratic equation.",
            explanation: "The discriminant determines the nature of roots",
            correctAnswer: false,
            timeEstimate: 2,
        },
        {
            id: 5,
            section: "statistics",
            type: "fill-blanks",
            difficulty: "hard",
            points: 4,
            question: "The mean of a dataset is calculated as _____ divided by the number of observations.",
            explanation: "Mean is the sum of all values divided by the count",
            blanks: ["sum of all values"],
            correctAnswer: ["sum of all values"],
            timeEstimate: 3,
        },
        {
            id: 6,
            section: "calculus",
            type: "subjective",
            difficulty: "medium",
            points: 3,
            question: "Explain the significance of the Fundamental Theorem of Calculus.",
            explanation: "Links differentiation and integration",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 7,
            section: "algebra",
            type: "match-following",
            difficulty: "easy",
            points: 2,
            question: "Match the equation with its type.",
            leftItems: ["x² + 2x + 1 = 0", "2x + 3 = 0", "x³ - 4x = 0"],
            rightItems: ["Linear", "Quadratic", "Cubic"],
            correctAnswer: [1, 0, 2],
            timeEstimate: 3,
        },
        {
            id: 8,
            section: "statistics",
            type: "multi-choice",
            difficulty: "medium",
            points: 3,
            question: "Which measures are affected by extreme values in a dataset?",
            options: ["Mean", "Median", "Mode", "Midrange"],
            correctAnswer: [0, 3],
            timeEstimate: 3,
        },
        {
            id: 9,
            section: "calculus",
            type: "subjective-rich",
            difficulty: "hard",
            points: 5,
            question: "Describe the process of finding critical points of a function and their significance.",
            explanation: "Critical points occur where derivative is zero or undefined",
            maxWords: 150,
            timeEstimate: 6,
        },
        {
            id: 10,
            section: "algebra",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "Solve for x: 2x + 5 = 11",
            options: ["3", "4", "5", "6"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 11,
            section: "statistics",
            type: "true-false",
            difficulty: "easy",
            points: 2,
            question: "The median is always one of the values in a dataset.",
            explanation: "Median is the middle value in an ordered dataset",
            correctAnswer: false,
            timeEstimate: 1,
        },
        {
            id: 12,
            section: "calculus",
            type: "fill-blanks",
            difficulty: "medium",
            points: 3,
            question: "The derivative of sin(x) is _____",
            blanks: ["cos(x)"],
            correctAnswer: ["cos(x)"],
            timeEstimate: 2,
        },
        {
            id: 13,
            section: "algebra",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain how to solve a system of linear equations using substitution.",
            explanation: "Solve one equation for one variable and substitute",
            maxWords: 120,
            timeEstimate: 5,
        },
        {
            id: 14,
            section: "statistics",
            type: "match-following",
            difficulty: "medium",
            points: 3,
            question: "Match the statistical term with its definition.",
            leftItems: ["Mean", "Median", "Mode"],
            rightItems: ["Average", "Middle value", "Most frequent"],
            correctAnswer: [0, 1, 2],
            timeEstimate: 3,
        },
        {
            id: 15,
            section: "calculus",
            type: "multi-choice",
            difficulty: "hard",
            points: 4,
            question: "Which functions are continuous everywhere?",
            options: ["Polynomial", "Rational", "Exponential", "Trigonometric"],
            correctAnswer: [0, 2, 3],
            timeEstimate: 4,
        },
        {
            id: 16,
            section: "algebra",
            type: "mcq",
            difficulty: "medium",
            points: 3,
            question: "What is the vertex of the parabola y = x² - 4x + 3?",
            options: ["(2, -1)", "(2, 1)", "(-2, 1)", "(1, 2)"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 17,
            section: "statistics",
            type: "true-false",
            difficulty: "easy",
            points: 2,
            question: "A histogram is used to represent categorical data.",
            explanation: "Histograms represent numerical data",
            correctAnswer: false,
            timeEstimate: 1,
        },
        {
            id: 18,
            section: "calculus",
            type: "subjective-rich",
            difficulty: "medium",
            points: 4,
            question: "Explain the concept of limits in calculus with examples.",
            explanation: "Limits describe the behavior of functions as inputs approach a value",
            maxWords: 150,
            timeEstimate: 6,
        },
        {
            id: 19,
            section: "algebra",
            type: "fill-blanks",
            difficulty: "easy",
            points: 2,
            question: "The slope of a line is given by _____",
            blanks: ["(y₂-y₁)/(x₂-x₁)"],
            correctAnswer: ["(y₂-y₁)/(x₂-x₁)"],
            timeEstimate: 2,
        },
        {
            id: 20,
            section: "statistics",
            type: "mcq",
            difficulty: "hard",
            points: 4,
            question: "What is the probability of getting exactly 3 heads in 5 coin tosses?",
            options: ["0.3125", "0.5", "0.25", "0.125"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 21,
            section: "calculus",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The chain rule is used for composite functions.",
            explanation: "Chain rule: d/dx(f(g(x))) = f'(g(x))g'(x)",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 22,
            section: "algebra",
            type: "multi-choice",
            difficulty: "medium",
            points: 3,
            question: "Which are solutions to x² - 5x + 6 = 0?",
            options: ["2", "3", "-2", "-3"],
            correctAnswer: [0, 1],
            timeEstimate: 3,
        },
        {
            id: 23,
            section: "statistics",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain the difference between correlation and causation.",
            explanation: "Correlation does not imply causation",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 24,
            section: "calculus",
            type: "match-following",
            difficulty: "easy",
            points: 2,
            question: "Match the function with its derivative.",
            leftItems: ["cos(x)", "e^x", "ln(x)"],
            rightItems: ["-sin(x)", "e^x", "1/x"],
            correctAnswer: [0, 1, 2],
            timeEstimate: 3,
        },
        {
            id: 25,
            section: "algebra",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "Simplify: (2x²)³",
            options: ["8x^6", "6x^6", "8x^5", "6x^5"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 26,
            section: "statistics",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The standard deviation measures data dispersion around the mean.",
            explanation: "Standard deviation quantifies spread",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 27,
            section: "calculus",
            type: "fill-blanks",
            difficulty: "hard",
            points: 4,
            question: "The second derivative test uses _____ to determine concavity.",
            blanks: ["f''(x)"],
            correctAnswer: ["f''(x)"],
            timeEstimate: 3,
        },
        {
            id: 28,
            section: "algebra",
            type: "subjective-rich",
            difficulty: "medium",
            points: 3,
            question: "Describe the process of factoring a quadratic trinomial.",
            explanation: "Find factors of the product of leading coefficient and constant",
            maxWords: 120,
            timeEstimate: 5,
        },
        {
            id: 29,
            section: "statistics",
            type: "multi-choice",
            difficulty: "easy",
            points: 2,
            question: "Which are measures of central tendency?",
            options: ["Mean", "Median", "Mode", "Variance"],
            correctAnswer: [0, 1, 2],
            timeEstimate: 2,
        },
        {
            id: 30,
            section: "calculus",
            type: "mcq",
            difficulty: "medium",
            points: 3,
            question: "What is the integral of 1/x dx?",
            options: ["ln|x| + C", "1/x² + C", "x + C", "-1/x + C"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 31,
            section: "algebra",
            type: "true-false",
            difficulty: "easy",
            points: 2,
            question: "The expression (a + b)² equals a² + b².",
            explanation: "Correct expansion is a² + 2ab + b²",
            correctAnswer: false,
            timeEstimate: 1,
        },
        {
            id: 32,
            section: "statistics",
            type: "fill-blanks",
            difficulty: "medium",
            points: 3,
            question: "The formula for sample variance is _____",
            blanks: ["Σ(x - x̄)²/(n-1)"],
            correctAnswer: ["Σ(x - x̄)²/(n-1)"],
            timeEstimate: 3,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 34,
            section: "algebra",
            type: "match-following",
            difficulty: "medium",
            points: 3,
            question: "Match the expression with its simplified form.",
            leftItems: ["x² - 4", "x² + 4", "x² - 2x + 1"],
            rightItems: ["(x-2)(x+2)", "(x-1)²", "x² + 4"],
        },
        {
            id: 1,
            section: "calculus",
            type: "mcq",
            difficulty: "hard",
            points: 4,
            question: "Find the derivative of f(x) = x³ sin(2x) using the product rule.",
            explanation: "Use the product rule: (uv)' = u'v + uv'",
            options: ["3x² sin(2x) + 2x³ cos(2x)", "3x² sin(2x) + x³ cos(2x)", "x² sin(2x) + 2x³ cos(2x)", "3x² cos(2x) + 2x³ sin(2x)"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 2,
            section: "calculus",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The derivative of a constant function is always zero.",
            explanation: "Constants have zero rate of change",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 3,
            section: "calculus",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "What is the integral of 3x² dx?",
            explanation: "The integral of x^n dx is (x^(n+1))/(n+1) + C",
            options: ["x³ + C", "3x³ + C", "x² + C", "9x + C"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 4,
            section: "algebra",
            type: "true-false",
            difficulty: "medium",
            points: 3,
            question: "The quadratic formula always provides real roots for any quadratic equation.",
            explanation: "The discriminant determines the nature of roots",
            correctAnswer: false,
            timeEstimate: 2,
        },
        {
            id: 5,
            section: "statistics",
            type: "fill-blanks",
            difficulty: "hard",
            points: 4,
            question: "The mean of a dataset is calculated as _____ divided by the number of observations.",
            explanation: "Mean is the sum of all values divided by the count",
            blanks: ["sum of all values"],
            correctAnswer: ["sum of all values"],
            timeEstimate: 3,
        },
        {
            id: 6,
            section: "calculus",
            type: "subjective",
            difficulty: "medium",
            points: 3,
            question: "Explain the significance of the Fundamental Theorem of Calculus.",
            explanation: "Links differentiation and integration",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 7,
            section: "algebra",
            type: "match-following",
            difficulty: "easy",
            points: 2,
            question: "Match the equation with its type.",
            leftItems: ["x² + 2x + 1 = 0", "2x + 3 = 0", "x³ - 4x = 0"],
            rightItems: ["Linear", "Quadratic", "Cubic"],
            correctAnswer: [1, 0, 2],
            timeEstimate: 3,
        },
        {
            id: 8,
            section: "statistics",
            type: "multi-choice",
            difficulty: "medium",
            points: 3,
            question: "Which measures are affected by extreme values in a dataset?",
            options: ["Mean", "Median", "Mode", "Midrange"],
            correctAnswer: [0, 3],
            timeEstimate: 3,
        },
        {
            id: 9,
            section: "calculus",
            type: "subjective-rich",
            difficulty: "hard",
            points: 5,
            question: "Describe the process of finding critical points of a function and their significance.",
            explanation: "Critical points occur where derivative is zero or undefined",
            maxWords: 150,
            timeEstimate: 6,
        },
        {
            id: 10,
            section: "algebra",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "Solve for x: 2x + 5 = 11",
            options: ["3", "4", "5", "6"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 1,
            section: "calculus",
            type: "mcq",
            difficulty: "hard",
            points: 4,
            question: "Find the derivative of f(x) = x³ sin(2x) using the product rule.",
            explanation: "Use the product rule: (uv)' = u'v + uv'",
            options: ["3x² sin(2x) + 2x³ cos(2x)", "3x² sin(2x) + x³ cos(2x)", "x² sin(2x) + 2x³ cos(2x)", "3x² cos(2x) + 2x³ sin(2x)"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 2,
            section: "calculus",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The derivative of a constant function is always zero.",
            explanation: "Constants have zero rate of change",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 3,
            section: "calculus",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "What is the integral of 3x² dx?",
            explanation: "The integral of x^n dx is (x^(n+1))/(n+1) + C",
            options: ["x³ + C", "3x³ + C", "x² + C", "9x + C"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 4,
            section: "algebra",
            type: "true-false",
            difficulty: "medium",
            points: 3,
            question: "The quadratic formula always provides real roots for any quadratic equation.",
            explanation: "The discriminant determines the nature of roots",
            correctAnswer: false,
            timeEstimate: 2,
        },
        {
            id: 5,
            section: "statistics",
            type: "fill-blanks",
            difficulty: "hard",
            points: 4,
            question: "The mean of a dataset is calculated as _____ divided by the number of observations.",
            explanation: "Mean is the sum of all values divided by the count",
            blanks: ["sum of all values"],
            correctAnswer: ["sum of all values"],
            timeEstimate: 3,
        },
        {
            id: 6,
            section: "calculus",
            type: "subjective",
            difficulty: "medium",
            points: 3,
            question: "Explain the significance of the Fundamental Theorem of Calculus.",
            explanation: "Links differentiation and integration",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 7,
            section: "algebra",
            type: "match-following",
            difficulty: "easy",
            points: 2,
            question: "Match the equation with its type.",
            leftItems: ["x² + 2x + 1 = 0", "2x + 3 = 0", "x³ - 4x = 0"],
            rightItems: ["Linear", "Quadratic", "Cubic"],
            correctAnswer: [1, 0, 2],
            timeEstimate: 3,
        },
        {
            id: 8,
            section: "statistics",
            type: "multi-choice",
            difficulty: "medium",
            points: 3,
            question: "Which measures are affected by extreme values in a dataset?",
            options: ["Mean", "Median", "Mode", "Midrange"],
            correctAnswer: [0, 3],
            timeEstimate: 3,
        },
        {
            id: 9,
            section: "calculus",
            type: "subjective-rich",
            difficulty: "hard",
            points: 5,
            question: "Describe the process of finding critical points of a function and their significance.",
            explanation: "Critical points occur where derivative is zero or undefined",
            maxWords: 150,
            timeEstimate: 6,
        },
        {
            id: 10,
            section: "algebra",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "Solve for x: 2x + 5 = 11",
            options: ["3", "4", "5", "6"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 11,
            section: "statistics",
            type: "true-false",
            difficulty: "easy",
            points: 2,
            question: "The median is always one of the values in a dataset.",
            explanation: "Median is the middle value in an ordered dataset",
            correctAnswer: false,
            timeEstimate: 1,
        },
        {
            id: 12,
            section: "calculus",
            type: "fill-blanks",
            difficulty: "medium",
            points: 3,
            question: "The derivative of sin(x) is _____",
            blanks: ["cos(x)"],
            correctAnswer: ["cos(x)"],
            timeEstimate: 2,
        },
        {
            id: 13,
            section: "algebra",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain how to solve a system of linear equations using substitution.",
            explanation: "Solve one equation for one variable and substitute",
            maxWords: 120,
            timeEstimate: 5,
        },
        {
            id: 14,
            section: "statistics",
            type: "match-following",
            difficulty: "medium",
            points: 3,
            question: "Match the statistical term with its definition.",
            leftItems: ["Mean", "Median", "Mode"],
            rightItems: ["Average", "Middle value", "Most frequent"],
            correctAnswer: [0, 1, 2],
            timeEstimate: 3,
        },
        {
            id: 15,
            section: "calculus",
            type: "multi-choice",
            difficulty: "hard",
            points: 4,
            question: "Which functions are continuous everywhere?",
            options: ["Polynomial", "Rational", "Exponential", "Trigonometric"],
            correctAnswer: [0, 2, 3],
            timeEstimate: 4,
        },
        {
            id: 16,
            section: "algebra",
            type: "mcq",
            difficulty: "medium",
            points: 3,
            question: "What is the vertex of the parabola y = x² - 4x + 3?",
            options: ["(2, -1)", "(2, 1)", "(-2, 1)", "(1, 2)"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 17,
            section: "statistics",
            type: "true-false",
            difficulty: "easy",
            points: 2,
            question: "A histogram is used to represent categorical data.",
            explanation: "Histograms represent numerical data",
            correctAnswer: false,
            timeEstimate: 1,
        },
        {
            id: 18,
            section: "calculus",
            type: "subjective-rich",
            difficulty: "medium",
            points: 4,
            question: "Explain the concept of limits in calculus with examples.",
            explanation: "Limits describe the behavior of functions as inputs approach a value",
            maxWords: 150,
            timeEstimate: 6,
        },
        {
            id: 19,
            section: "algebra",
            type: "fill-blanks",
            difficulty: "easy",
            points: 2,
            question: "The slope of a line is given by _____",
            blanks: ["(y₂-y₁)/(x₂-x₁)"],
            correctAnswer: ["(y₂-y₁)/(x₂-x₁)"],
            timeEstimate: 2,
        },
        {
            id: 20,
            section: "statistics",
            type: "mcq",
            difficulty: "hard",
            points: 4,
            question: "What is the probability of getting exactly 3 heads in 5 coin tosses?",
            options: ["0.3125", "0.5", "0.25", "0.125"],
            correctAnswer: 0,
            timeEstimate: 3,
        },
        {
            id: 21,
            section: "calculus",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The chain rule is used for composite functions.",
            explanation: "Chain rule: d/dx(f(g(x))) = f'(g(x))g'(x)",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 22,
            section: "algebra",
            type: "multi-choice",
            difficulty: "medium",
            points: 3,
            question: "Which are solutions to x² - 5x + 6 = 0?",
            options: ["2", "3", "-2", "-3"],
            correctAnswer: [0, 1],
            timeEstimate: 3,
        },
        {
            id: 23,
            section: "statistics",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain the difference between correlation and causation.",
            explanation: "Correlation does not imply causation",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 24,
            section: "calculus",
            type: "match-following",
            difficulty: "easy",
            points: 2,
            question: "Match the function with its derivative.",
            leftItems: ["cos(x)", "e^x", "ln(x)"],
            rightItems: ["-sin(x)", "e^x", "1/x"],
            correctAnswer: [0, 1, 2],
            timeEstimate: 3,
        },
        {
            id: 25,
            section: "algebra",
            type: "mcq",
            difficulty: "easy",
            points: 2,
            question: "Simplify: (2x²)³",
            options: ["8x^6", "6x^6", "8x^5", "6x^5"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 26,
            section: "statistics",
            type: "true-false",
            difficulty: "medium",
            points: 2,
            question: "The standard deviation measures data dispersion around the mean.",
            explanation: "Standard deviation quantifies spread",
            correctAnswer: true,
            timeEstimate: 1,
        },
        {
            id: 27,
            section: "calculus",
            type: "fill-blanks",
            difficulty: "hard",
            points: 4,
            question: "The second derivative test uses _____ to determine concavity.",
            blanks: ["f''(x)"],
            correctAnswer: ["f''(x)"],
            timeEstimate: 3,
        },
        {
            id: 28,
            section: "algebra",
            type: "subjective-rich",
            difficulty: "medium",
            points: 3,
            question: "Describe the process of factoring a quadratic trinomial.",
            explanation: "Find factors of the product of leading coefficient and constant",
            maxWords: 120,
            timeEstimate: 5,
        },
        {
            id: 29,
            section: "statistics",
            type: "multi-choice",
            difficulty: "easy",
            points: 2,
            question: "Which are measures of central tendency?",
            options: ["Mean", "Median", "Mode", "Variance"],
            correctAnswer: [0, 1, 2],
            timeEstimate: 2,
        },
        {
            id: 30,
            section: "calculus",
            type: "mcq",
            difficulty: "medium",
            points: 3,
            question: "What is the integral of 1/x dx?",
            options: ["ln|x| + C", "1/x² + C", "x + C", "-1/x + C"],
            correctAnswer: 0,
            timeEstimate: 2,
        },
        {
            id: 31,
            section: "algebra",
            type: "true-false",
            difficulty: "easy",
            points: 2,
            question: "The expression (a + b)² equals a² + b².",
            explanation: "Correct expansion is a² + 2ab + b²",
            correctAnswer: false,
            timeEstimate: 1,
        },
        {
            id: 32,
            section: "statistics",
            type: "fill-blanks",
            difficulty: "medium",
            points: 3,
            question: "The formula for sample variance is _____",
            blanks: ["Σ(x - x̄)²/(n-1)"],
            correctAnswer: ["Σ(x - x̄)²/(n-1)"],
            timeEstimate: 3,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
        {
            id: 33,
            section: "calculus",
            type: "subjective",
            difficulty: "hard",
            points: 4,
            question: "Explain L'Hôpital's Rule and its application.",
            explanation: "Used for limits of indeterminate forms",
            maxWords: 100,
            timeEstimate: 5,
        },
    ],
};

/**
 * ExamInterface Component
 *
 * Main exam interface component that handles:
 * - Exam navigation and state management
 * - Proctoring features (webcam, screen recording, tab switching)
 * - Auto-save functionality
 * - Timer management
 * - Question answering and marking
 * - Fullscreen mode
 *
 * Features:
 * - Real-time proctoring with violation tracking
 * - Auto-save every few seconds
 * - Comprehensive navigation options
 * - Multiple question types support
 * - Responsive design
 * - Error handling and recovery
 */
export default function ExamInterface() {
    const params = useParams();
    const router = useRouter();

    // Core exam state
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentSection, setCurrentSection] = useState("calculus");
    const [answers, setAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState(new Set());
    const [confidence, setConfidence] = useState({});

    // Timer and exam control state
    const [timeLeft, setTimeLeft] = useState(mockExam.duration * 60);
    const [examStarted, setExamStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Widget visibility state
    const [showQuestionPaper, setShowQuestionPaper] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showScratchpad, setShowScratchpad] = useState(false);

    // Proctoring state
    const [webcamActive, setWebcamActive] = useState(false);
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [violations, setViolations] = useState([]);
    const [faceDetected, setFaceDetected] = useState(true);
    const [screenRecording, setScreenRecording] = useState(false);

    // Refs for media handling
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    /**
     * Tab Switch Detection Effect
     * Monitors when user switches tabs and tracks violations
     */
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (examStarted && document.hidden) {
                setTabSwitchCount((prev) => {
                    const newCount = prev + 1;
                    setViolations((prevViolations) => [...prevViolations, `Tab switch detected at ${new Date().toLocaleTimeString()} (${newCount}/${mockExam.proctoring.tabSwitchLimit})`]);

                    // Auto-submit if limit exceeded
                    if (newCount >= mockExam.proctoring.tabSwitchLimit) {
                        alert("Maximum tab switches exceeded. Exam will be auto-submitted.");
                        handleSubmitExam();
                    }
                    return newCount;
                });
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [examStarted]);

    /**
     * Screen Recording Effect
     * Starts screen recording when exam begins (if enabled)
     */
    useEffect(() => {
        const startScreenRecording = async () => {
            if (examStarted && mockExam.proctoring.screenRecording) {
                try {
                    const stream = await navigator.mediaDevices.getDisplayMedia({
                        video: true,
                        audio: false,
                    });
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorderRef.current = mediaRecorder;
                    mediaRecorder.start();
                    setScreenRecording(true);

                    // Handle stream end
                    stream.getVideoTracks()[0].addEventListener("ended", () => {
                        setViolations((prev) => [...prev, "Screen sharing stopped - potential violation"]);
                    });
                } catch (error) {
                    console.error("Screen recording failed:", error);
                    setViolations((prev) => [...prev, "Screen recording permission denied"]);
                }
            }
        };

        if (examStarted) {
            startScreenRecording();
        }

        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
        };
    }, [examStarted]);

    /**
     * Fullscreen Management Effect
     * Handles entering/exiting fullscreen mode
     */
    useEffect(() => {
        const enterFullscreen = async () => {
            try {
                3000;
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                    setIsFullscreen(true);
                }
            } catch (error) {
                console.log("Fullscreen not supported");
            }
        };

        const exitFullscreen = async () => {
            try {
                if (document.fullscreenElement && document.exitFullscreen) {
                    await document.exitFullscreen();
                    setIsFullscreen(false);
                }
            } catch (error) {
                console.log("Exit fullscreen failed");
            }
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement && examStarted) {
                setViolations((prev) => [...prev, "Fullscreen mode exited - potential violation"]);
            }
        };

        if (examStarted && !isFullscreen) {
            enterFullscreen();
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            if (document.fullscreenElement) {
                exitFullscreen();
            }
        };
    }, [examStarted, isFullscreen]);

    /**
     * Auto-save Effect
     * Automatically saves exam data to localStorage
     */
    useEffect(() => {
        const saveData = () => {
            try {
                const examData = {
                    answers,
                    markedForReview: [...markedForReview],
                    currentQuestion,
                    currentSection,
                    timeLeft,
                    confidence,
                    violations,
                    tabSwitchCount,
                    lastSaved: new Date().toISOString(),
                };
                localStorage.setItem(`exam_${params.id}_data`, JSON.stringify(examData));
            } catch (error) {
                console.error("Failed to save exam data:", error);
            }
        };

        if (examStarted && Object.keys(answers).length > 0) {
            saveData();
        }
    }, [answers, markedForReview, currentQuestion, currentSection, timeLeft, confidence, violations, tabSwitchCount, examStarted, params.id]);

    /**
     * Load Saved Data Effect
     * Restores exam state from localStorage on component mount
     */
    useEffect(() => {
        try {
            const savedData = localStorage.getItem(`exam_${params.id}_data`);
            if (savedData) {
                const data = JSON.parse(savedData);
                setAnswers(data.answers || {});
                setMarkedForReview(new Set(data.markedForReview || []));
                setCurrentQuestion(data.currentQuestion || 0);
                setCurrentSection(data.currentSection || "calculus");
                setTimeLeft(data.timeLeft || mockExam.duration * 60);
                setConfidence(data.confidence || {});
                setViolations(data.violations || []);
                setTabSwitchCount(data.tabSwitchCount || 0);
            }
        } catch (error) {
            console.error("Failed to load saved exam data:", error);
        }
    }, [params.id]);

    /**
     * Timer Effect
     * Manages the exam countdown timer
     */
    useEffect(() => {
        if (!examStarted || isPaused || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [examStarted, isPaused, timeLeft]);

    /**
     * Handles answer changes for questions
     * @param questionId - ID of the question being answered
     * @param answer - The answer value
     */
    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    /**
     * Handles confidence level changes
     * @param questionId - ID of the question
     * @param level - Confidence level (1-4)
     */
    const handleConfidenceChange = (questionId, level) => {
        setConfidence((prev) => ({
            ...prev,
            [questionId]: level,
        }));
    };

    /**
     * Toggles mark for review status of a question
     * @param questionId - ID of the question to mark/unmark
     */
    const handleMarkForReview = (questionId) => {
        setMarkedForReview((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };

    /**
     * Handles exam submission
     * Saves results and navigates to results page
     */
    const handleSubmitExam = () => {
        try {
            const examResults = {
                examId: params.id,
                answers,
                confidence,
                markedForReview: [...markedForReview],
                submittedAt: new Date().toISOString(),
                timeSpent: mockExam.duration * 60 - timeLeft,
                violations,
                tabSwitchCount,
                proctoring: {
                    webcamActive,
                    screenRecording,
                    faceDetected,
                },
            };

            localStorage.setItem(`exam_${params.id}_results`, JSON.stringify(examResults));

            // Stop recording
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }

            router.push(`/exam/${params.id}/results`);
        } catch (error) {
            console.error("Failed to submit exam:", error);
            alert("Failed to submit exam. Please try again.");
        }
    };

    /**
     * Gets the status of a question for navigation display
     * @param index - Question index
     * @returns Status string
     */
    const getQuestionStatus = (index) => {
        const questionId = mockExam.questions[index].id;
        if (answers[questionId] !== undefined) return "answered";
        if (markedForReview.has(questionId)) return "marked";
        if (index === currentQuestion) return "current";
        return "not-visited";
    };

    /**
     * Navigates to a specific section
     * @param sectionId - ID of the section to navigate to
     */
    const navigateToSection = (sectionId) => {
        setCurrentSection(sectionId);
        const firstQuestionIndex = mockExam.questions.findIndex((q) => q.section === sectionId);
        setCurrentQuestion(firstQuestionIndex);
    };

    /**
     * Navigates to the next question
     */
    const nextQuestion = () => {
        if (currentQuestion < mockExam.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            const nextQ = mockExam.questions[currentQuestion + 1];
            if (nextQ.section !== currentSection) {
                setCurrentSection(nextQ.section);
            }
        }
    };

    /**
     * Navigates to the previous question
     */
    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            const prevQ = mockExam.questions[currentQuestion - 1];
            if (prevQ.section !== currentSection) {
                setCurrentSection(prevQ.section);
            }
        }
    };
    useEffect(() => {
        handleStartExam?.();
    }, []);
    // Calculate statistics
    const currentQ = mockExam.questions[currentQuestion];
    const answeredCount = Object.keys(answers).length;
    const markedCount = markedForReview.size;
    const totalPoints = mockExam.questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = mockExam.questions.filter((q) => answers[q.id] !== undefined).reduce((sum, q) => sum + q.points, 0);
    const handleStartExam = () => {
        setExamStarted(true);
        setShowInstructions(false);
        setTimeLeft(mockExam.duration * 60); // Reset timer to full duration
        setCurrentSection(mockExam.sections[0].id); // Start with first section
        setCurrentQuestion(0); // Start with first question
    };
    // Show instructions dialog before exam starts
    if (showInstructions && !examStarted) {
        return <ExamDetails onStartExam={handleStartExam} examData={sampleExamData} />;
    }

    return (
        <ErrorBoundary>
            <div className="bg-gray-100 dark:bg-gray-950 h-screen   exam-interface-container">
                {/* Webcam Monitor */}

                {/* Floating Widgets */}
                {showCalculator && <CalculatorWidget onClose={() => setShowCalculator(false)} />}
                {showScratchpad && <ScratchpadWidget onClose={() => setShowScratchpad(false)} />}
                {showQuestionPaper && (
                    <QuestionPaperWidget
                        questions={mockExam.questions}
                        sections={mockExam.sections}
                        answers={answers}
                        markedForReview={markedForReview}
                        onQuestionSelect={(index) => {
                            setCurrentQuestion(index);
                            setShowQuestionPaper(false);
                        }}
                        onClose={() => setShowQuestionPaper(false)}
                    />
                )}

                {/* Header with Sections */}
                <ExamHeader
                    exam={mockExam}
                    currentSection={currentSection}
                    currentQuestion={currentQuestion}
                    answeredCount={answeredCount}
                    markedCount={markedCount}
                    earnedPoints={earnedPoints}
                    totalPoints={totalPoints}
                    onSectionChange={navigateToSection}
                    showCalculator={showCalculator}
                    showScratchpad={showScratchpad}
                    showQuestionPaper={showQuestionPaper}
                    onToggleCalculator={() => setShowCalculator(!showCalculator)}
                    onToggleScratchpad={() => setShowScratchpad(!showScratchpad)}
                    onToggleQuestionPaper={() => setShowQuestionPaper(!showQuestionPaper)}
                    timeLeft={timeLeft}
                    setShowInstructions={setShowInstructions}
                />

                {/* Main Content */}
                <div className="mx-auto px-4 py-4 bg-gray-100 dark:bg-gray-950 exam-interface-body h-[calc(100%_-_10.2rem)]">
                    <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 h-full">
                        {/* Question Area - Takes more space */}
                        <div className="lg:col-span-6 space-y-4">
                            {/* Question Card */}
                            <div className="h-[calc(100%_-_5.5rem)]">
                                <QuestionCard
                                    question={currentQ}
                                    questionNumber={currentQuestion + 1}
                                    totalQuestions={mockExam.totalQuestions}
                                    answer={answers[currentQ.id]}
                                    confidence={confidence[currentQ.id]}
                                    onAnswerChange={(answer) => handleAnswerChange(currentQ.id, answer)}
                                    onConfidenceChange={(level) => handleConfidenceChange(currentQ.id, level)}
                                    isMarkedForReview={markedForReview.has(currentQ.id)}
                                    onMarkForReview={() => handleMarkForReview(currentQ.id)}
                                    section={mockExam.sections.find((s) => s.id === currentQ.section)}
                                />
                            </div>

                            {/* Navigation Controls */}
                            <div className=" flex mt-auto justify-between items-center bg-white dark:bg-gray-800/80  rounded-md p-4">
                                {/* Previous Button */}
                                <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-transparent">
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </Button>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    {/* Save & Next Button */}
                                    <Button
                                        onClick={() => {
                                            // Auto-save is already handled, just move to next
                                            nextQuestion();
                                        }}
                                        disabled={currentQuestion === mockExam.totalQuestions - 1}
                                        variant="outline"
                                        className="flex items-center gap-2 px-4 py-3 rounded-md font-medium bg-transparent border-blue-300 text-blue-600 hover:bg-blue-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save & Next
                                    </Button>

                                    {/* Mark for Review & Next Button */}
                                    <Button
                                        onClick={() => {
                                            handleMarkForReview(currentQ.id);
                                            if (currentQuestion < mockExam.totalQuestions - 1) {
                                                nextQuestion();
                                            }
                                        }}
                                        variant="outline"
                                        className="flex items-center gap-2 px-4 py-3 rounded-md font-medium bg-transparent border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                                    >
                                        <Bookmark className="w-4 h-4" />
                                        Mark For Review & Next
                                    </Button>

                                    {/* Submit or Next Button */}
                                    {currentQuestion === mockExam.totalQuestions - 1 ? (
                                        <Button
                                            onClick={() => setShowSubmitDialog(true)}
                                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center gap-2 px-6 py-3 rounded-md font-medium shadow-lg"
                                        >
                                            <Send className="w-5 h-5" />
                                            Submit Exam
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={nextQuestion}
                                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white flex items-center gap-2 px-6 py-3 rounded-md font-medium shadow-lg"
                                        >
                                            Next
                                            <ChevronRight className="w-5 h-5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar with Navigation and Proctoring */}
                        <div className="lg:col-span-2 space-y-6">
                            <QuestionNavigation
                                questions={mockExam.questions}
                                sections={mockExam.sections}
                                currentQuestion={currentQuestion}
                                currentSection={currentSection}
                                onQuestionSelect={setCurrentQuestion}
                                getQuestionStatus={getQuestionStatus}
                                answers={answers}
                                markedForReview={markedForReview}
                                isWebcamRequired={mockExam.proctoring.webcamRequired}
                            />
                            {examStarted && mockExam.proctoring.webcamRequired && (
                                <WebcamMonitor onFaceDetected={setFaceDetected} photoInterval={mockExam.proctoring.photoInterval} violations={violations} setViolations={setViolations} />
                            )}
                            <ProctoringSidebar
                                violations={violations}
                                tabSwitchCount={tabSwitchCount}
                                maxTabSwitches={mockExam.proctoring.tabSwitchLimit}
                                faceDetected={faceDetected}
                                screenRecording={screenRecording}
                                webcamActive={webcamActive}
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Confirmation Dialog */}
                <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                    <DialogContent className="max-w-md rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3 text-xl">
                                <Send className="w-6 h-6 text-green-500" />
                                Submit Exam
                            </DialogTitle>
                            <DialogDescription className="text-base">Are you sure you want to submit your exam? This action cannot be undone.</DialogDescription>
                        </DialogHeader>
                        <div className="py-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-green-600">{answeredCount}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Answered</div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-yellow-600">{markedCount}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Marked</div>
                                </div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <div className="text-xl font-bold text-blue-600">
                                    Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                                </div>
                            </div>
                            {violations.length > 0 && (
                                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                                    <div className="text-sm font-medium text-red-600">{violations.length} violation(s) recorded</div>
                                </div>
                            )}
                        </div>
                        <DialogFooter className="gap-3">
                            <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="rounded-xl">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmitExam} className="bg-green-600 hover:bg-green-700 rounded-xl">
                                Submit Exam
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* {
                    <Dialog open={showInstructions} onOpenChange={() => setShowInstructions((prev) => !prev)}>
                        <ExamDetails examData={sampleExamData} />
                    </Dialog>
                } */}
            </div>
        </ErrorBoundary>
    );
}
