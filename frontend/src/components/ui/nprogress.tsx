import { useEffect, useState } from "react"
import { useNavigation } from "react-router-dom"

export const NProgress = () => {
  const { state, location } = useNavigation()

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
  }, [location?.pathname])

  useEffect(() => {
    if (state === "loading") {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            return 100
          }
          const newProgress = oldProgress + 10
          return newProgress > 100 ? 100 : newProgress
        })
      }, 300)

      return () => {
        clearInterval(timer)
      }
    }
  }, [state])

  if (state !== "loading") {
    return null
  }

  return (
    <div
      className="fixed left-0 top-0 z-[60] h-[3px] bg-primary transition-all duration-200 ease-in-out"
      style={{ width: `${progress}%` }}
    ></div>
  )
}
