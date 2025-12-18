import { useEffect, useState, useRef } from 'preact/hooks'

export function useContainerSize(minHeightThreshold = 100) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: Number; height: number }>({ width: 0, height: 0 })
  const [isStable, setIsStable] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    let lastHeight = 0
    let stableCount = 0
    let timeoutId: number | null = null

    const ro = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        const newHeight = Math.floor(height)

        setSize({ width: Math.floor(width), height: newHeight })

        if (newHeight > minHeightThreshold) {
          if (Math.abs(newHeight - lastHeight) <= 2) {
            stableCount++
            if (stableCount >= 3) {
              setIsStable(true)
            }
          } else {
            stableCount = 0
          }
          lastHeight = newHeight
        }
      }
    })

    ro.observe(ref.current)

    return () => ro.disconnect()
  }, [minHeightThreshold])

  return { ref, size, isStable }
}
