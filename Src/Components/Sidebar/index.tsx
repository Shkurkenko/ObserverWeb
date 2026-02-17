import { useSidebar } from './Hooks/UseSidebar'
import { Box } from '../Layouts/Box'
import { CSSProperties } from 'preact'

import { cn } from '../../Utils/Helpers'

import './style.sass'

interface ISlideSidebarProps {
  children: JSX.Element
  className?: string
  style?: CSSProperties
}

export function SlideSidebar({ children }: ISlideSidebarProps) {
  const { show } = useSidebar()

  return (
    <Box
      className={cn(
        `slide-sidebar-container w-full h-full`,
        `${show ? 'slide-sidebar-container-active' : ''}`,
      )}
    >
      {show && children}
    </Box>
  )
}
