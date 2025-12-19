import { useCallback, useState, useEffect } from 'preact/hooks'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { TableProvider } from '../../../Components/Table/Context/TableContext'
import { ObserverTableEmpty } from '../../../Components/Table/ObserverTableEmptyState'
import { TabButtonGroup } from '../../../Components/Tabs/TabButtonGroup'
import { IReoColumnsModelsConfig } from '../../../Shared/Interfaces/Main.interface'
import { ReoView } from '../../Pages/ReoScan'
import { TabView } from '../../../Components/Tabs/TabView'
import { ReoTop } from '../ReoTop'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { TableSearch } from '../../../Components/Table/TableSearch'
import { TableBody } from '../../../Components/Table/TableBody'
import { TableHeader } from '../../../Components/Table/TableHeader'
import { TableHelper } from '../../../Components/Table/TableHelper'

import './style.sass'

interface IReoContentViewProps {
  header: string
  model: ReoView
}

export function ReoContentView({ header, model }: IReoContentViewProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reoColumnsModelConfig, setReoColumnsModelConfig] = useState<IReoColumnsModelsConfig>(
    ObserverConfig.ReoColumnModelsConfig,
  )
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const currentTab = model.tabsModel[activeIndex]

  const currentColumns = ObserverConfig.ReoColumnModelsConfig[currentTab.data.metaInfo.scanType]
  const currentRows = currentTab.data.rows
  const currentData = currentTab.data

  const handleTabClick = useCallback((e: Event, tab: ITab<ReoSpace.IReoTable>) => {
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
    <div
      className={`reo-content w-full ${model.show ? 'reo-content-view-visible' : 'reo-content-view-hide'}`}
    >
      <ReoTop data={{ scanName: header }} />

      <div className='observer-tabs w-full'>
        <TabButtonGroup
          currentIndex={activeIndex}
          model={model.tabsModel}
          handleClick={handleTabClick}
        />
      </div>
      <div className='table-area'>
        <TableProvider columnsModel={currentColumns} data={currentData}>
          <TableSearch />
          <TableHelper />
          <TableHeader headerColumns={currentColumns} />
          <TableBody rows={currentRows} />
        </TableProvider>
      </div>
    </div>
  )
}
