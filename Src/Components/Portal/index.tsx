import { ComponentChildren } from 'preact'
import { createPortal } from 'preact/compat'

interface PortalProps {
  children: ComponentChildren
}

export function Portal({ children }: PortalProps) {
  const portalRoot = document.getElementById('portal-root')

  if (!portalRoot) {
    const div = document.createElement('div')
    div.id = 'portal-root'
    document.body.appendChild(div)
    return createPortal(children, div)
  }

  return createPortal(children, portalRoot)
}
