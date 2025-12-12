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
          ? 'font-semibold border-[#36B37E] text-[#36B37E] border-b-2'
          : 'text-gray-500 border-transparent'
      } text-lg py-4 px-1 inline-flex items-center gap-x-2 whitespace-nowrap 
                             hover:text-[#36B37E] focus:outline-hidden focus:text-[#36B37E] 
                             disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 
                             dark:hover:text-[#36B37E]`}
      aria-controls={`tabs-with-underline-${tabData.tabIndex + 1}`}
      onClick={(e) => handleClick(e, tabData)}
    >
      {tabData.label}
    </button>
  )
}
