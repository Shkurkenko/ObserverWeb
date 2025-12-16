import { ITab } from '../../../Shared/Interfaces/Main.interface'

import './style.sass'

export interface ITabButton<T> {
  isActive: boolean
  tabData: ITab<T>
  handleClick: Function
}

export function TabButton<T>({ tabData, isActive, handleClick }: ITabButton<T>) {
  return (
    <button
      type='button'
      key={tabData.id}
      className={`${
        isActive
          ? 'font-semibold border-primary text-primary border-b-2'
          : 'text-gray-500 border-transparent'
      } text-lg py-4 px-1 inline-flex items-center gap-x-2 whitespace-nowrap 
                             hover:text-[#36B37E] focus:outline-hidden 
                             disabled:opacity-50 disabled:pointer-events-none`}
      aria-controls={`tabs-with-underline-${tabData.tabIndex + 1}`}
      onClick={(e) => handleClick(e, tabData)}
    >
      {tabData.label}
    </button>
  )
}
