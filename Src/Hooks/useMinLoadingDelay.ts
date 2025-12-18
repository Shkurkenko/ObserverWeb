import { useEffect, useState } from 'preact/hooks'

export function useMinLoadingDelay(isLoading: boolean, delay = 400) {
  const [isReady, setIsReady] = useState(!isLoading)

  useEffect(() => {
    if (isLoading) {
      setIsReady(false)
    } else {
      const t = setTimeout(() => setIsReady(true), delay)
      return () => clearTimeout(t)
    }
  }, [isLoading, delay])

  return isReady
}
