import { useEffect } from 'preact/hooks'
import { initializeDefaultTheme } from '../Utils/Helpers'

export function UseInitTheme() {
  useEffect(() => {
    initializeDefaultTheme()
  }, [])
}
