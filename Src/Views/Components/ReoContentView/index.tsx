import { useCallback, useState, useEffect } from 'preact/hooks'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { TableProvider } from '../../../Components/Table/Context/TableContext'
import { ObserverTableEmpty } from '../../../Components/Table/ObserverTableEmptyState'
import { TabButtonGroup } from '../../../Components/Tabs/TabButtonGroup'
import { IReoColumnsModelsConfig } from '../../../Shared/Interfaces/Main.interface'
import { ReoView } from '../../Pages/ReoScan'
import { ReoTop } from '../ReoTop'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ObserverConfig } from '../../../../Config/ObserverConfig'
import { TableSearch } from '../../../Components/Table/TableSearch'
import { TableBody } from '../../../Components/Table/TableBody'
import { TableHeader } from '../../../Components/Table/TableHeader'
import { TableHelper } from '../../../Components/Table/TableHelper'
import { Container, ContainerLayouts } from '../../../Components/Layouts/Container'
import { Section } from '../../../Components/Layouts/Section/Section'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { cn } from '../../../Utils/Helpers'

import './style.sass'

interface IReoContentViewProps {
  header: string
  model: ReoView
}

const getTabIcon = (scanType: string) => {
  const iconMap: Record<string, preact.ComponentChildren> = {
    full: '📋',
    quick: '⚡',
    detailed: '🔍',
    archive: '📁',
    favorites: '⭐',
  }
  return iconMap[scanType] || '📄'
}

export function ReoContentView({ header, model }: IReoContentViewProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [tabsModel, setTabsModel] = useState(() =>
    model.tabsModel.map((tab, index) => ({
      ...tab,
      tabIndex: index,
      // Adding counters if we have data
      count: tab.data.rows?.length || 0,
      // Adding icons based on scan type
      icon: getTabIcon(tab.data.metaInfo.scanType),
      // Indicator for new data
      hasNewData: tab.data.hasNewData || false,
    })),
  )

  const currentTab = tabsModel[activeIndex]
  const currentColumns = ObserverConfig.ReoColumnModelsConfig[currentTab.data.metaInfo.scanType]
  const currentRows = currentTab.data.rows
  const currentData = currentTab.data

  const handleTabClick = useCallback((e: MouseEvent, tab: ITab<ReoSpace.IReoTable>) => {
    e.preventDefault()
    setActiveIndex(tab.tabIndex)

    // Сбрасываем индикатор новых данных при клике
    if (tab.hasNewData) {
      setTabsModel((prev) => prev.map((t) => (t.id === tab.id ? { ...t, hasNewData: false } : t)))
    }
  }, [])

  useEffect(() => {
    if (model.show) {
      const timer = setTimeout(() => setIsVisible(true), 50)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [model.show])

  // Update counters on rerender
  useEffect(() => {
    setTabsModel((prev) =>
      prev.map((tab, index) => ({
        ...tab,
        count: model.tabsModel[index]?.data.rows?.length || 0,
      })),
    )
  }, [model.tabsModel])

  return (
    <Container
      as='section'
      size='full'
      align='stretch'
      background='white'
      rounded='xl'
      shadow='lg'
      paddingY='xl'
      hidden={{
        sm: !model.show,
        md: !model.show,
        lg: !model.show,
        '2xl': !model.show,
      }}
      className={cn(
        'reo-content transition-all duration-300',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        !model.show && 'hidden',
      )}
    >
      <ContainerLayouts.Content className='space-y-8'>
        {/* Header Section */}
        <Section as='header' paddingY='none' background='transparent' className='space-y-6'>
          <ReoTop data={{ scanName: header }} />
        </Section>

        {/* Tabs Navigation */}
        <Section
          as='nav'
          paddingY='none'
          background='transparent'
          className='border-b border-gray-200 dark:border-gray-700'
        >
          <TabButtonGroup
            currentIndex={activeIndex}
            model={tabsModel}
            handleClick={handleTabClick}
            direction='horizontal'
            spacing='lg'
            align='start'
            variant='underline'
            size='lg'
            showCounts={true}
            fullWidthTabs={false}
            paddingX='none'
            paddingY='sm'
            background='transparent'
            rounded='none'
            className='overflow-x-auto scrollbar-hide'
          />
        </Section>

        {/* Main Content - Table */}
        <Section as='main' density='comfortable' background='transparent' className='table-area'>
          <Container
            as='div'
            size='full'
            align='stretch'
            background='white'
            rounded='lg'
            border='thin'
            borderColor='gray'
            shadow='md'
            className='overflow-hidden'
          >
            <TableProvider columnsModel={currentColumns} data={currentData}>
              {/* Table Controls */}
              <div className='p-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700'>
                <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
                  <div className='flex-1 min-w-0'>
                    <TableSearch />
                  </div>
                  <div className='shrink-0'>
                    <TableHelper />
                  </div>
                </div>
              </div>

              {/* Table Content */}
              <div className='min-h-100 flex flex-col'>
                {currentRows.length > 0 ? (
                  <>
                    <div className='overflow-x-auto flex-1'>
                      <TableHeader headerColumns={currentColumns} />
                      <TableBody rows={currentRows} />
                    </div>

                    {/* Table Footer (опционально) */}
                    <div className='p-4 bg-gray-50/30 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-700'>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Показано {currentRows.length} объектов
                      </div>
                    </div>
                  </>
                ) : (
                  <div className='flex-1 flex items-center justify-center p-12'>
                    {ObserverTableEmpty && typeof ObserverTableEmpty === 'function' ? (
                      <ObserverTableEmpty />
                    ) : (
                      <div className='text-center space-y-4'>
                        <div className='text-4xl text-gray-300 dark:text-gray-600'>📊</div>
                        <div className='text-lg font-medium text-gray-400 dark:text-gray-500'>
                          Нет данных для отображения
                        </div>
                        <div className='text-sm text-gray-500 dark:text-gray-400 max-w-md'>
                          В выбранной категории объекты недвижимости не найдены
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TableProvider>
          </Container>
        </Section>

        {currentRows.length > 0 && (
          <Section as='footer' paddingY='sm' background='gray' rounded='lg' className='mt-6'>
            <div className='flex flex-wrap gap-4 items-center text-sm'>
              {/* Всего объектов */}
              <div className='flex items-center gap-2'>
                <span className='w-3 h-3 bg-blue-500 rounded-full'></span>
                <span className='text-gray-600 dark:text-gray-400'>
                  Всего: <span className='font-semibold'>{currentRows.length}</span>
                </span>
              </div>

              {/* Нормальные */}
              <div className='flex items-center gap-2'>
                <span className='w-3 h-3 bg-green-500 rounded-full'></span>
                <span className='text-gray-600 dark:text-gray-400'>
                  Нормальных:{' '}
                  <span className='font-semibold'>
                    {
                      currentRows.filter((row) => row.status === TableSpace.IRowStatus.Normal)
                        .length
                    }
                  </span>
                </span>
              </div>

              {/* Выделенные */}
              <div className='flex items-center gap-2'>
                <span className='w-3 h-3 bg-yellow-500 rounded-full'></span>
                <span className='text-gray-600 dark:text-gray-400'>
                  Выделенных:{' '}
                  <span className='font-semibold'>
                    {
                      currentRows.filter((row) => row.status === TableSpace.IRowStatus.Highlighted)
                        .length
                    }
                  </span>
                </span>
              </div>

              {/* Отключенные */}
              <div className='flex items-center gap-2'>
                <span className='w-3 h-3 bg-red-500 rounded-full'></span>
                <span className='text-gray-600 dark:text-gray-400'>
                  Отключенных:{' '}
                  <span className='font-semibold'>
                    {
                      currentRows.filter((row) => row.status === TableSpace.IRowStatus.Disabled)
                        .length
                    }
                  </span>
                </span>
              </div>

              {/* Дата обновления
              {currentTab.data.metaInfo.lastUpdate && (
                <div className='flex items-center gap-2 ml-auto'>
                  <span className='text-gray-500 dark:text-gray-400 text-xs'>
                    Обновлено: {new Date(currentTab.data.metaInfo.lastUpdate).toLocaleDateString()}
                  </span>
                </div>
              )} */}
            </div>
          </Section>
        )}
      </ContainerLayouts.Content>
    </Container>
  )
}
