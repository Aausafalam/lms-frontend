/**
 * Sample exam pattern data for testing and development
 * Contains comprehensive exam configuration with all sections
 */
export const sampleExamPatternData = {
    name: "RRB NTPC Stage 1 Examination",
    description:
        "Railway Recruitment Board Non-Technical Popular Categories Stage 1 examination pattern with comprehensive sections covering Mathematics, General Intelligence & Reasoning, and General Awareness.",
    durationInMinutes: 90,
    languageOptions: ["English", "Hindi", "Bengali", "Tamil"],
    shuffleQuestions: true,
    shuffleSections: false,

    // Enhanced global marking policy
    globalMarkingPolicy: {
        defaultCorrectMark: 1,
        defaultNegativeMark: 0.33,
    },

    // Comprehensive sections configuration
    sections: [
        {
            sectionId: "MATH",
            name: "Mathematics",
            isCompulsory: true,
            questionsCount: 30,
            questionsToAttempt: 30,
            shuffleQuestions: true,
            passingMarks: 40,
            questionGroups: [
                {
                    range: [1, 15],
                    marksPerQuestion: 2,
                    negativeMarks: 0.5,
                    questionType: "MCQ",
                },
                {
                    range: [16, 30],
                    marksPerQuestion: 1,
                    negativeMarks: 0.33,
                    questionType: "MCQ",
                },
            ],
            subjectTag: "mathematics",
            sectionTimeLimit: null,
        },
        {
            sectionId: "REASONING",
            name: "General Intelligence and Reasoning",
            isCompulsory: true,
            questionsCount: 30,
            questionsToAttempt: 30,
            shuffleQuestions: true,
            passingMarks: 35,
            questionGroups: [
                {
                    range: [31, 60],
                    marksPerQuestion: 1,
                    negativeMarks: 0.33,
                    questionType: "MCQ",
                },
            ],
            subjectTag: "reasoning",
            sectionTimeLimit: null,
        },
        {
            sectionId: "GK",
            name: "General Awareness",
            isCompulsory: false,
            questionsCount: 20,
            questionsToAttempt: 15,
            shuffleQuestions: false,
            passingMarks: 30,
            questionGroups: [
                {
                    range: [61, 80],
                    marksPerQuestion: 2,
                    negativeMarks: 0.5,
                    questionType: "MCQ",
                },
            ],
            subjectTag: "general_knowledge",
            sectionTimeLimit: 20,
        },
    ],

    // Enhanced attempt rules
    attemptRules: {
        maxSectionsToAttempt: 3,
        minSectionsToAttempt: 2,
        allowSectionNavigation: true,
        allowQuestionNavigation: true,
        allowBackNavigation: true,
        autoSubmitOnTimeEnd: true,
        showUnattemptedCount: true,
    },

    // Enhanced security settings
    securitySettings: {
        enableBrowserLockdown: true,
        disableRightClick: true,
        disableCopyPaste: true,
        preventTabSwitching: true,
        enableAIProctoring: false,
        allowedBrowsers: ["chrome", "firefox", "edge"],
        maxTabSwitches: 3,
        suspiciousActivityThreshold: 5,
        enableFullScreenMode: true,
        disableVirtualKeyboard: false,
    },

    // Access control settings
    accessControlSettings: {
        maxAttempts: 1,
        enableAccessCode: true,
        accessCode: "RRB2025",
        allowedUserGroups: ["railway_candidates", "premium_students"],
    },

    // Results and analytics settings
    resultsSettings: {
        showResultsImmediately: false,
        showCorrectAnswers: true,
        showDetailedAnalysis: true,
        enableResultsDownload: true,
        showRanking: true,
        showPerformanceAnalytics: true,
        enableCertificateGeneration: true,
        passingPercentage: 60,
        showSectionWiseResults: true,
        enableResultsEmail: true,
        resultVisibilityDelay: 24,
        enableComparisonAnalytics: true,
    },

    // Notification settings
    notificationSettings: {
        enableEmailNotifications: true,
        enableSMSNotifications: true,
        enablePushNotifications: true,
        sendExamReminders: true,
        reminderIntervals: [24, 2, 1],
        sendResultNotifications: true,
        sendStartNotifications: true,
        sendSubmissionConfirmation: true,
        customEmailTemplate: true,
        emailSubjectTemplate: "RRB NTPC Exam Reminder - {timeRemaining} remaining",
        emailBodyTemplate:
            "Dear {studentName},\n\nYour RRB NTPC Stage 1 exam is scheduled to start in {timeRemaining}.\n\nExam Details:\n- Date: {examDate}\n- Duration: 90 minutes\n- Sections: 3\n\nBest of luck!\n\nRailway Recruitment Board",
        notifyInstructors: true,
        notifyAdmins: true,
    },

    // UI configuration
    uiConfig: {
        theme: "railway-theme",
        fontSize: "medium",
        showTimer: true,
        languageSelector: true,
        accessibleMode: false,
    },

    // Status and metadata
    status: "PUBLISHED",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    createdBy: "admin@railway.gov.in",
    version: "1.2",
};

/**
 * Sample lesson data for lesson details preview
 */
export const sampleLessonData = {
    name: "Advanced Mathematics for Competitive Exams",
    summary: "Comprehensive mathematics preparation covering algebra, geometry, trigonometry, and calculus for competitive examinations.",
    duration: 120,
    lessonOrder: 5,
    instructors: [
        {
            name: "Dr. Rajesh Kumar",
            image: "/placeholder.svg?height=40&width=40",
            role: "Mathematics Expert",
        },
        {
            name: "Prof. Priya Sharma",
            image: "/placeholder.svg?height=40&width=40",
            role: "Competitive Exam Specialist",
        },
    ],
    tags: ["essential", "mathematics", "competitive", "advanced"],
    status: "published",
    bannerImagePreview: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
};
