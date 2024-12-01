import { SearchIcon } from "lucide-react"
import * as React from "react"

import { Input } from "./input"
import { cn } from "@/lib/utils"

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <Input type="text" className="pl-10" {...props} ref={ref} />
        <div className="absolute inset-y-0 left-0 flex items-center px-2 text-muted-foreground">
          <SearchIcon className="size-5" />
        </div>
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
