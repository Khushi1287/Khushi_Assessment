import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(
  undefined
)

const useTooltip = () => {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("Tooltip components must be used within TooltipProvider")
  }
  return context
}

interface TooltipProviderProps {
  children: React.ReactNode
}

const TooltipProvider = ({ children }: TooltipProviderProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div
        className="relative inline-block"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

interface TooltipProps {
  children: React.ReactNode
}

const Tooltip = ({ children }: TooltipProps) => {
  return <>{children}</>
}

interface TooltipTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

const TooltipTrigger = React.forwardRef<
  HTMLElement,
  TooltipTriggerProps & React.HTMLAttributes<HTMLElement>
>(({ asChild, children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      ...props,
    } as any)
  }
  return (
    <span ref={ref as any} {...props}>
      {children}
    </span>
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps {
  children: React.ReactNode
  className?: string
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open } = useTooltip()

    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

