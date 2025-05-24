"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import GlobalUtils from "@/lib/utils"

export function CourseFormSection({ id, title, icon, description, children, className, isActive, sectionRef }) {
  return (
    <div id={id} ref={sectionRef} className={GlobalUtils.cn("mb-8", className)}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card
          className={GlobalUtils.cn(
            "overflow-hidden bg-white border-gray-100 dark:border-gray-800 dark:bg-gray-900 shadow-sm transition-all duration-300",
          )}
        >
          <CardHeader
            className={GlobalUtils.cn(
              "pb-3 pt-4 bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-900",
              "border-b border-blue-100 dark:border-blue-900/20",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                {icon}
              </div>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                {description && <CardDescription className="mt-0 text-[0.8rem]">{description}</CardDescription>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
