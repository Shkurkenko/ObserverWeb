import { useContext } from 'preact/hooks'
import { SidebarContext } from '../../../Context/SidebarContext'

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  const {
    show,
    // currentId,
    // prevId,
    // setPrevId,
    // setCurrentId,
    toggleSidebar,
    setShow,
    showSidebar,
    hideSidebar,
  } = context

  return {
    show,
    // currentId,
    // prevId,
    // setPrevId,
    // setCurrentId,
    toggleSidebar,
    setShow,
    showSidebar,
    hideSidebar,
  }
}
