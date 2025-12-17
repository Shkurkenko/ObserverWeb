import { useCallback, useState } from 'preact/hooks'
import { Table } from '../../../Components/Table'
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

import './style.sass'

interface IReoContentViewProps {
  header: string
  model: ReoView
}

export function ReoContentView({ header, model }: IReoContentViewProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState(model.tabsModel[activeIndex].id)
  const [reoColumnsModelConfig, setReoColumnsModelConfig] = useState<IReoColumnsModelsConfig>(
    ObserverConfig.ReoColumnModelsConfig,
  )

  const handleRenderEmpty = useCallback((): JSX.Element => {
    return <ObserverTableEmpty />
  }, [])

  const handleTabClick = useCallback((e: Event, tab: ITab<ReoSpace.IReoTable>) => {
    e.preventDefault()
    setActiveTab(tab.id)
    setActiveIndex(tab.tabIndex)
  }, [])

  const getCurrentColumnsModel = useCallback((): TableSpace.IColumn[] => {
    return reoColumnsModelConfig[model.tabsModel[activeIndex].data.metaInfo.scanType]
  }, [reoColumnsModelConfig, model])

  const getCurrentTableModel = useCallback((): TableSpace.ITableData<ReoSpace.IReoTable> => {
    return model.tabsModel[activeIndex].data
  }, [model])

  return (
    <div className={`reo-content w-full ${model.show ? '' : 'reo-content-view-hide'}`}>
      <ReoTop data={{ scanName: header }} />
      <TabButtonGroup
        currentIndex={activeIndex}
        model={model.tabsModel}
        handleClick={handleTabClick}
      />
      <TabView currentIndex={activeIndex}>
        <TableProvider
          columnsModel={getCurrentColumnsModel()}
          data={getCurrentTableModel()}
          renderEmpty={handleRenderEmpty}
        >
          <Table />
        </TableProvider>
      </TabView>
    </div>
  )
}
