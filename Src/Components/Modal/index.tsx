import { ComponentChildren } from 'preact'
import { useEffect } from 'preact/hooks'
import { Portal } from '../Portal'

import './style.sass'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ComponentChildren
  title?: string
  width?: number | string
  height?: number | string
}

export function Modal({ isOpen, onClose, children, title, width, height }: ModalProps) {
  if (!isOpen) return null

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <Portal>
      <div className='modal-overlay' onClick={handleOverlayClick}>
        <div className='modal'>
          {title && (
            <div className='modal-title'>
              <h1>{title}</h1>
            </div>
          )}
          {children}
        </div>
      </div>
    </Portal>
  )
}
