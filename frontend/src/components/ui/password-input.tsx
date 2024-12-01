import { EyeIcon, EyeOffIcon } from "lucide-react"
import * as React from "react"

import { Input } from "./input"

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={className}
          {...props}
          ref={ref}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeIcon className="size-5" />
          ) : (
            <EyeOffIcon className="size-5" />
          )}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
