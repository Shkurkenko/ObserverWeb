import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { TabButton } from '../TabButton'

import './style.sass'

export interface ITabButtonGroup<T> {
  currentIndex: number
  model: ITab<T>[]
  handleClick: Function
}

export function TabButtonGroup<T>({ currentIndex, model, handleClick }: ITabButtonGroup<T>) {
  return (
    <div className='observer-tabs ml-10 w-full'>
      <nav className='flex gap-x-7' aria-label='Tabs' role='tablist' aria-orientation='horizontal'>
        {model.map((tab: ITab<T>) => (
          <TabButton
            key={tab.id}
            tabData={tab}
            isActive={currentIndex === tab.tabIndex}
            handleClick={handleClick}
          />
        ))}
      </nav>
    </div>
  )
}
