import { useEffect, useState, useRef } from 'preact/hooks'

export function useContainerSize<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<{ width: Number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updateSize = () => {
      const rect = element.getBoundingClientRect()
      const newWidth = Math.floor(rect.width)
      const newHeight = Math.floor(rect.height)

      setSize((prev) => {
        if (prev.width === newWidth && prev.height === newHeight) {
          return prev
        }
        return { width: newWidth, height: newHeight }
      })
    }

    const raf = requestAnimationFrame(() => {
      updateSize()
    })

    const ro = new ResizeObserver(updateSize)
    ro.observe(element)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return { ref, size, containerWidth: size.width, containerHeight: size.height }
}
