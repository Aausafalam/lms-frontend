/**
 * Sample exam data for form preview and development
 * @description Static data used for testing and preview functionality
 */
export const sampleExamData = {
    id: "cmd5ct4qm0003jnl0am17ca7w",
    name: "jorden bates",
    examCode: "12erfwsd",
    description: "Praesentium hic occa",
    startDate: "1997-09-15T00:00:00.000Z",
    startTime: "08:35",
    endTime: "12:48",
    examType: "practice",
    durationInMinutes: 69,
    isPublished: false,
    version: "1.0.1",
    languageOptions: ["english"],
    tags: ["important"],
    examPattern: {
        sections: [
            {
                name: "Igor Burt",
                isCompulsory: true,
                questionGroups: [],
                questionsCount: 10,
                shuffleQuestions: true,
                questionsToAttempt: 10,
            },
        ],
        uiConfig: {
            theme: "default",
            fontSize: "medium",
            showTimer: true,
            accessibleMode: false,
            languageSelector: true,
        },
        attemptRules: {
            allowBackNavigation: true,
            maxSectionsToAttempt: 9,
            minSectionsToAttempt: 6,
            allowSectionNavigation: true,
            allowQuestionNavigation: true,
        },
        resultsSettings: {
            passingPercentage: 23,
            showCorrectAnswers: false,
            enableResultsDownload: true,
        },
        shuffleSections: false,
        securitySettings: {
            enableAIProctoring: false,
            enableBrowserLockdown: false,
        },
        shuffleQuestions: true,
        globalMarkingPolicy: {
            defaultCorrectMark: 1,
            defaultNegativeMark: 0.33,
        },
        notificationSettings: {
            notifyAdmins: false,
            emailBodyTemplate: "",
            notifyInstructors: true,
            reminderIntervals: [24, 1],
            sendExamReminders: true,
            customEmailTemplate: false,
            emailSubjectTemplate: "",
            enableSMSNotifications: false,
            sendStartNotifications: true,
            enablePushNotifications: true,
            sendResultNotifications: true,
            enableEmailNotifications: true,
            sendSubmissionConfirmation: true,
        },
        accessControlSettings: {
            maxAttempts: 99,
            enableAccessCode: false,
        },
    },
    createdAt: "2025-07-16T02:40:25.918Z",
    updatedAt: "2025-07-17T02:21:16.886Z",
    instituteId: "573b8992-ec24-4c6c-a331-40781927e6e2",
    courseId: "542882f9-5421-416f-b2ef-478ff0d54c7e",
};
