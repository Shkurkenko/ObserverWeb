import { ComponentChildren } from 'preact'

import './style.sass'

export interface TabView {
  children: ComponentChildren
  currentIndex: number
}

export const TabView = ({ children, currentIndex }: TabView) => {
  return (
    <div className='table-tabview w-full tab-view'>
      <div
        id='tabs-with-underline-1'
        role='tabpanel'
        aria-labelledby={`tabs-with-underline-item-${currentIndex}`}
        className='w-full h-full'
      >
        {children}
      </div>
    </div>
  )
}
