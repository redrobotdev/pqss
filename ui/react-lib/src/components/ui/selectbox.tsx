import { cn } from "@/lib/utils"

const SelectBoxBase = ({
  onClick,
  className,
  disabled,
  children,
}: {
  onClick?: () => void
  className?: string
  disabled?: boolean
  children: React.ReactNode
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick ? onClick : () => {}}
      className={cn(className && className)}
    >
      {children}
    </button>
  )
}

export const SelectBox = ({
  onClick,
  className,
  disabled,
  selected,
  label,
}: {
  onClick?: () => void
  className?: string
  disabled?: boolean
  selected: boolean
  label: string
}) => {
  return (
    <SelectBoxBase
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg px-12 py-2",
        "border-2 border-primary",
        "hover:border-primary/20 hover:bg-primary/20",
        !selected ? cn("bg-secondary") : cn("bg-primary hover:bg-secondary"),
        className && className
      )}
    >
      <p
        className={
          !selected ? "text-primary" : "text-secondary hover:text-primary"
        }
      >
        {label}
      </p>
    </SelectBoxBase>
  )
}
