import { createContext, ComponentChildren } from 'preact'
import { useCallback, useState } from 'preact/hooks'

interface ISidebarContext {
  show: boolean

  setShow: (isShow: boolean) => void

  toggleSidebar: () => void

  showSidebar: () => void

  hideSidebar: () => void
}
interface ISidebarProviderProps {
  children: ComponentChildren
}

export const SidebarContext = createContext<ISidebarContext | null>(null)
export const SidebarProvider = ({ children }: ISidebarProviderProps) => {
  const [show, setShow] = useState(false)

  const toggleSidebar = useCallback(() => {
    setShow((prev: boolean) => !prev)
  }, [])

  const showSidebar = useCallback(() => {
    setShow((prev: boolean) => true)
  }, [])

  const hideSidebar = useCallback(() => {
    setShow((prev: boolean) => false)
  }, [])

  return (
    <SidebarContext.Provider value={{ show, setShow, toggleSidebar, showSidebar, hideSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
