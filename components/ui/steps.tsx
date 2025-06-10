import * as React from "react"
import { cn } from "@/lib/utils"

const Steps = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-8", className)} {...props} />
})
Steps.displayName = "Steps"

const StepHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
  },
)
StepHeader.displayName = "StepHeader"

const StepTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return <h3 ref={ref} className={cn("font-medium leading-none", className)} {...props} />
  },
)
StepTitle.displayName = "StepTitle"

const StepDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  },
)
StepDescription.displayName = "StepDescription"

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  isCompleted?: boolean
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(({ className, isActive, isCompleted, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative pl-8", className)} {...props}>
      <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
      </div>
      <div className="absolute left-3 top-8 h-[calc(100%-24px)] w-px bg-gray-300 dark:bg-gray-600" />
    </div>
  )
})
Step.displayName = "Step"

Steps.Step = Step
Steps.Header = StepHeader
Steps.Title = StepTitle
Steps.Description = StepDescription

export { Steps }

