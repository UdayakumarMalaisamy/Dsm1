// src/components/ui/calendar.tsx
"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import "react-day-picker/dist/style.css"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-3 bg-white rounded-lg", className)}>
        <DayPicker {...props} />
      </div>
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar }
