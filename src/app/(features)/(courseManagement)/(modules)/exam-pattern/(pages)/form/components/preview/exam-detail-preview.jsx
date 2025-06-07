"use client"

import { useState } from "react"
import {
  Clock,
  Users,
  Layers,
  CheckCircle,
  AlertTriangle,
  Settings,
  Globe,
  Timer,
  Award,
  Target,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExamContentCard } from "./exam-details-content-card"

const devicePresets = {
  mobile: 400,
  tablet: 768,
  desktop: 1024,
}

/**
 * ExamDetailPreview Component
 * Displays a comprehensive preview of the exam pattern
 * Features responsive design with orange theme in hero section
 */
export function ExamDetailPreview({ data, viewportWidth, onDetailsPage }) {
  const [selectedSection, setSelectedSection] = useState(0)

  // Responsive breakpoint detection
  const isMobile = viewportWidth <= devicePresets.mobile
  const isTablet = viewportWidth > devicePresets.mobile && viewportWidth <= devicePresets.tablet
  const isDesktop = viewportWidth > devicePresets.tablet

  // Calculate exam statistics
  const totalQuestions = data.sections?.reduce((total, section) => total + (section.questionsCount || 0), 0) || 0
  const totalMarks =
    data.sections?.reduce((total, section) => {
      return (
        total +
        (section.questionGroups?.reduce((sectionTotal, group) => {
          const questionsInGroup = (group.range?.[1] || 0) - (group.range?.[0] || 0) + 1
          return sectionTotal + questionsInGroup * (group.marksPerQuestion || 0)
        }, 0) || 0)
      )
    }, 0) || 0

  const totalAttemptQuestions =
    data.sections?.reduce((total, section) => total + (section.questionsToAttempt || 0), 0) || 0
  const compulsorySections = data.sections?.filter((section) => section.isCompulsory).length || 0

  return (
    <div className={`w-full ${onDetailsPage ? "max-w-[1225px]" : "max-h-[75vh] overflow-scroll"}`}>
      {/* Enhanced Header Section with Orange Theme */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white p-6 rounded-t-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fillOpacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg animate-bounce"></div>

        <div className="relative z-10 space-y-4">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <CheckCircle className="h-3 w-3 mr-1" />
              {data.status || "Draft"}
            </Badge>
            {data.shuffleQuestions && (
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Settings className="h-3 w-3 mr-1" />
                Shuffled Questions
              </Badge>
            )}
            {data.shuffleSections && (
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Layers className="h-3 w-3 mr-1" />
                Shuffled Sections
              </Badge>
            )}
          </div>

          {/* Title and Description */}
          <div>
            <h1 className={`font-bold text-white leading-tight ${isMobile ? "text-xl" : "text-2xl"}`}>
              {data.name || "Exam Pattern Name"}
            </h1>
            <p className="text-white/90 text-sm mt-1">
              {data.description || "Exam pattern description will appear here"}
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-yellow-300" />
                <div>
                  <p className="text-white/80 text-xs">Duration</p>
                  <p className="text-white font-semibold text-sm">{data.durationInMinutes || 90} min</p>
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
              <div className="flex items-center">
                <Layers className="h-4 w-4 mr-2 text-green-300" />
                <div>
                  <p className="text-white/80 text-xs">Sections</p>
                  <p className="text-white font-semibold text-sm">{data.sections?.length || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-300" />
                <div>
                  <p className="text-white/80 text-xs">Questions</p>
                  <p className="text-white font-semibold text-sm">{totalQuestions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20">
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-purple-300" />
                <div>
                  <p className="text-white/80 text-xs">Total Marks</p>
                  <p className="text-white font-semibold text-sm">{totalMarks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Language Options */}
          {data.languageOptions?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-white/80" />
              <span className="text-white/80 text-sm">Available in:</span>
              <div className="flex flex-wrap gap-1">
                {data.languageOptions.map((lang) => (
                  <Badge key={lang} variant="outline" className="text-white border-white/30 text-xs bg-white/10">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section with Standard Theme */}
      <div className="p-4 bg-gray-100 dark:bg-gray-900">
        <div className={isMobile || isTablet ? "space-y-6" : "grid grid-cols-3 gap-8"}>
          <div className={isMobile || isTablet ? "space-y-6" : "col-span-2 space-y-6"}>
            {/* Exam Overview */}
            <ExamContentCard title="Exam Overview" Icon={Target} headerColor="blue">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total Questions</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{totalQuestions}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-600 dark:text-blue-400">To Attempt</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{totalAttemptQuestions}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Duration</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{data.durationInMinutes} min</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Compulsory Sections</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{compulsorySections}</p>
                </div>
              </div>
            </ExamContentCard>

            {/* Sections */}
            <ExamContentCard title="Exam Sections" Icon={Layers} headerColor="purple">
              <div className="space-y-4">
                {data.sections?.map((section, index) => (
                  <div
                    key={section.sectionId || index}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedSection === index
                        ? "border-purple-300 bg-purple-50 dark:bg-purple-950/20 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow-sm"
                    }`}
                    onClick={() => setSelectedSection(index)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-full mr-3">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {section.name || `Section ${index + 1}`}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {section.sectionId} • {section.subjectTag}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {section.isCompulsory && (
                          <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Compulsory
                          </Badge>
                        )}
                        {section.sectionTimeLimit && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                            <Timer className="h-3 w-3 mr-1" />
                            {section.sectionTimeLimit}m
                          </Badge>
                        )}
                        {section.shuffleQuestions && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                            <Settings className="h-3 w-3 mr-1" />
                            Shuffled
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Questions</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{section.questionsCount}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 text-xs">To Attempt</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{section.questionsToAttempt}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Groups</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">
                          {section.questionGroups?.length || 0}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 text-xs">Passing Marks</p>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{section.passingMarks || "N/A"}</p>
                      </div>
                    </div>

                    {/* Question Groups Details */}
                    {selectedSection === index && section.questionGroups && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Question Groups
                        </h4>
                        <div className="grid gap-3">
                          {section.questionGroups.map((group, groupIndex) => (
                            <div
                              key={groupIndex}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                              <div>
                                <p className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                  Questions {group.range?.[0]} - {group.range?.[1]}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {group.questionType} • {(group.range?.[1] || 0) - (group.range?.[0] || 0) + 1}{" "}
                                  questions
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-2">
                                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                    +{group.marksPerQuestion}
                                  </div>
                                  <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                                    -{group.negativeMarks}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ExamContentCard>

            {/* Global Settings */}
            {data.globalMarkingPolicy && (
              <ExamContentCard title="Global Marking Scheme" headerColor="green" Icon={Award}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-700">
                    <div>
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">Correct Answer</span>
                      <p className="text-xs text-green-600 dark:text-green-400">Default marks</p>
                    </div>
                    <span className="text-green-600 font-bold text-xl">
                      +{data.globalMarkingPolicy.defaultCorrectMark}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-700">
                    <div>
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">Wrong Answer</span>
                      <p className="text-xs text-red-600 dark:text-red-400">Negative marks</p>
                    </div>
                    <span className="text-red-600 font-bold text-xl">
                      -{data.globalMarkingPolicy.defaultNegativeMark}
                    </span>
                  </div>
                </div>
              </ExamContentCard>
            )}
          </div>

          {/* Sidebar */}
          {isDesktop && (
            <div className="space-y-6">
              {/* Call to Action Card */}
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-xl">Ready to Start?</h3>
                    <p className="text-white/90 text-sm">Begin this exam pattern now</p>
                    <Button className="w-full bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 shadow-lg">
                      Start Exam
                    </Button>
                    <div className="text-center text-white/80 text-xs space-y-1">
                      <p>✓ {totalQuestions} Questions</p>
                      <p>✓ {data.durationInMinutes} Minutes</p>
                      <p>✓ {data.sections?.length} Sections</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exam Rules */}
              <Card>
                <CardHeader className="bg-gray-50 dark:bg-gray-800">
                  <CardTitle className="text-sm flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Exam Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  {data.attemptRules?.allowSectionNavigation && (
                    <div className="flex items-center text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">Section navigation allowed</span>
                    </div>
                  )}
                  {data.attemptRules?.allowBackNavigation && (
                    <div className="flex items-center text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">Back navigation allowed</span>
                    </div>
                  )}
                  {data.attemptRules?.allowQuestionNavigation && (
                    <div className="flex items-center text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">Question navigation allowed</span>
                    </div>
                  )}
                  {data.shuffleQuestions && (
                    <div className="flex items-center text-xs">
                      <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">Questions will be shuffled</span>
                    </div>
                  )}
                  {data.shuffleSections && (
                    <div className="flex items-center text-xs">
                      <AlertTriangle className="h-3 w-3 text-yellow-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">Sections will be shuffled</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader className="bg-gray-50 dark:bg-gray-800">
                  <CardTitle className="text-sm flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Avg. per Section:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {data.sections?.length ? Math.round(totalQuestions / data.sections.length) : 0} questions
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Marks per Question:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {totalQuestions ? Math.round((totalMarks / totalQuestions) * 100) / 100 : 0} avg
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Time per Question:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {totalQuestions ? Math.round(((data.durationInMinutes || 90) / totalQuestions) * 100) / 100 : 0}{" "}
                        min
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
