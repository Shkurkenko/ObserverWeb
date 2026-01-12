import { useCallback, useState, useEffect } from 'preact/hooks'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { TableProvider } from '../../../Components/Table/Context/TableContext'
import { TabButtonGroup } from '../../../Components/Tabs/TabButtonGroup'
import { ReoView } from '../../Pages/ReoScan'
import { ReoTop } from '../ReoTop'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { TableSearch } from '../../../Components/Table/TableSearch'
import { TableBody } from '../../../Components/Table/TableBody'
import { TableHeader } from '../../../Components/Table/TableHeader'
import { TableHelper } from '../../../Components/Table/TableHelper'
import { ContainerLayouts } from '../../../Components/Layouts/Box'
import { cn } from '../../../Utils/Helpers'

import './style.sass'

interface IReoContentViewProps {
  header: string
  model: ReoView
}

export function ReoContentView({ header, model }: IReoContentViewProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const currentTab = model.tabsModel[activeIndex]
  const currentColumns = ObserverConfig.ReoColumnModelsConfig[currentTab.data.metaInfo.scanType]
  const currentRows = currentTab.data.rows
  const currentData = currentTab.data

  const handleTabClick = useCallback((e: MouseEvent, tab: ITab<ReoSpace.IReoTable>) => {
    e.preventDefault()
    setActiveIndex(tab.tabIndex)
  }, [])

  useEffect(() => {
    if (model.show) {
      const timer = setTimeout(() => setIsVisible(true), 50)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [model.show])

  return (
    <ContainerLayouts.FullWidth
      hidden={{
        sm: !model.show,
        md: !model.show,
        lg: !model.show,
        xl: !model.show, // ← Добавил xl
        '2xl': !model.show,
      }}
      className={cn(
        'reo-content',
        model.show ? 'reo-content-view-visible' : 'reo-content-view-hide',
        isVisible ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-300',
      )}
    >
      {/* Простой контейнер для контента */}
      <div className='space-y-6 p-6'>
        <ReoTop data={{ scanName: header }} />

        {/* Табы */}
        <div className='border-b border-gray-200'>
          <TabButtonGroup
            currentIndex={activeIndex}
            model={model.tabsModel.map((tab, index) => ({
              ...tab,
              tabIndex: index,
              count: tab.data.rows?.length || 0,
            }))}
            handleClick={handleTabClick}
            direction='horizontal'
            spacing='lg'
            align='start'
            variant='underline'
            size='md'
          />
        </div>

        {/* Таблица */}
        <div className='table-area'>
          <TableProvider columnsModel={currentColumns} data={currentData}>
            <TableSearch />
            <TableHelper />
            <TableHeader headerColumns={currentColumns} />
            <TableBody rows={currentRows} />
          </TableProvider>
        </div>
      </div>
    </ContainerLayouts.FullWidth>
  )
}
