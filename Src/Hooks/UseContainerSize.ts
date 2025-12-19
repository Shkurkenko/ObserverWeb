import { useEffect, useState, useRef } from 'preact/hooks'

export function useContainerSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ width: Number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) return

    const update = () => {
      const rect = ref.current!.getBoundingClientRect()
      setSize({ width: Math.floor(rect.width), height: Math.floor(rect.height) })
    }

    const ro = new ResizeObserver(update)
    ro.observe(ref.current)
    update()

    return () => ro.disconnect()
  }, [])

  return { ref, size }
}
