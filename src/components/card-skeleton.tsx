import * as React from "react"

import { cn } from "../lib/utils"

interface CardSkeletonProps extends
    React.HTMLAttributes<HTMLDivElement> {
}

const CardSkeleton = React.forwardRef<HTMLDivElement, CardSkeletonProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={cn(" flex flex-col w-full gap-5", className)}{...props}>
            <div className="skeleton h-60 w-full bg-slate-200"></div>
            <div className="skeleton h-4 w-28 bg-slate-200"></div>
            <div className="skeleton h-4 w-full bg-slate-200"></div>
        </div>
    ))

CardSkeleton.displayName = "CardSkeleton"

export default CardSkeleton