/**
 * Sample question data for testing and development
 */
export const sampleQuestionData = {
    type: "MCQ",
    text: "What is the capital of France?",
    image: "",
    options: [
        { id: "a", text: "London", isCorrect: false },
        { id: "b", text: "Berlin", isCorrect: false },
        { id: "c", text: "Paris", isCorrect: true },
        { id: "d", text: "Madrid", isCorrect: false },
    ],
    answer: { correctOption: "c" },
    tags: ["geography", "europe", "capitals"],
    difficulty: "easy",
    language: "en",
    explanation: "Paris is the capital and largest city of France.",
    category: "Geography",
    subject: "Social Studies",
    isPublic: false,
    status: "ACTIVE",
};

export const sampleTrueFalseQuestion = {
    type: "TRUE_FALSE",
    text: "The Earth is flat.",
    image: "",
    answer: { value: false },
    tags: ["science", "earth", "geography"],
    difficulty: "easy",
    language: "en",
    explanation: "The Earth is a sphere, not flat. This has been scientifically proven through various methods including satellite imagery and space exploration.",
    category: "Science",
    subject: "Earth Science",
    isPublic: true,
    status: "ACTIVE",
};

export const sampleFillBlanksQuestion = {
    type: "FILL_BLANKS",
    text: "The chemical symbol for water is ______.",
    image: "",
    answer: { text: "H2O", caseSensitive: false },
    tags: ["chemistry", "molecules", "water"],
    difficulty: "easy",
    language: "en",
    explanation: "Water is composed of two hydrogen atoms and one oxygen atom, hence the chemical formula H2O.",
    category: "Chemistry",
    subject: "Basic Chemistry",
    isPublic: true,
    status: "ACTIVE",
};

export const sampleNumericQuestion = {
    questionId: "q_004",
    type: "NUMERIC",
    text: "What is the value of π (pi) rounded to 2 decimal places?",
    image: "",
    answer: { value: 3.14, tolerance: 0.01 },
    tags: ["mathematics", "geometry", "constants"],
    difficulty: "medium",
    language: "en",

    explanation: "π (pi) is approximately 3.14159..., which rounds to 3.14 when rounded to 2 decimal places.",
    category: "Mathematics",
    subject: "Geometry",
    topic: "Mathematical Constants",
    isPublic: true,
    status: "ACTIVE",
};

export const sampleEssayQuestion = {
    type: "ESSAY",
    text: "Explain the importance of renewable energy sources in combating climate change. Provide at least three specific examples.",
    image: "",
    answer: {
        sampleAnswer:
            "Renewable energy sources are crucial in combating climate change because they produce little to no greenhouse gas emissions during operation. Examples include: 1) Solar power - converts sunlight directly into electricity without emissions, 2) Wind power - uses wind turbines to generate clean electricity, 3) Hydroelectric power - uses flowing water to generate electricity with minimal environmental impact. These sources help reduce our dependence on fossil fuels and decrease carbon emissions.",
        maxWords: 300,
    },
    tags: ["environment", "energy", "climate-change"],
    difficulty: "hard",
    language: "en",

    explanation: "This question tests understanding of environmental science and the ability to provide specific examples with explanations.",
    category: "Environmental Science",
    subject: "Environmental Studies",
    topic: "Renewable Energy",
    isPublic: false,
    status: "ACTIVE",
};
