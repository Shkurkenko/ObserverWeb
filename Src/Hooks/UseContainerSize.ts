import { useEffect, useState, useRef } from 'preact/hooks'

export function useContainerSize<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<{ width: Number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const handleResize = (entries: any) => {
      if (!entries || entries.length === 0) {
        return
      }

      const { width, height } = entries[0].contentRect
      setSize({ width: Math.floor(width), height: Math.floor(height) })
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref.current])

  return { ref, size }
}
