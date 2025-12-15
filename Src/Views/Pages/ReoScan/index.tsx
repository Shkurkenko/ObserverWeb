import { SideNavigation } from '../../../Components/Sidebar/SideNavigation'
import { useTasks } from '../../../Components/TaskSidebar/Hooks/UseTasks'
import { AlertsSpace } from '../../../Shared/Interfaces/Alerts.interface'
import { TableSpace } from '../../../Shared/Interfaces/Table.interface'
import { ReoSpace } from '../../../Shared/Interfaces/Reo.interface'
import { ITab } from '../../../Shared/Interfaces/Main.interface'
import { useCallback, useEffect } from 'preact/hooks'
import { useScanView } from '../../../Hooks/UseScanView'
import { useFastAlerts } from '../../../Components/FastAlerts/Hooks/UseFastAlerts'
import { useAlerts } from '../../../Components/Alerts/Hooks/UseAlerts'
import { ReoContentView } from '../../Components/ReoContentView'

import { MockGenHelpers } from '../../../Utils/MockGen'
import { runWithInterval } from '../../../Utils/Helpers'

import { journalAlertsData } from '../../../../Data/JournalAlerts'

import { v4 as uuidv4 } from 'uuid'

import './style.sass'

export interface ReoView {
  viewId: string
  taskId: string
  show: boolean
  tabsModel: ITab<ReoSpace.IReoTable>[]
}

export const ReoScan = () => {
  const { tasks, addTask } = useTasks()
  const { scanViews, addView } = useScanView()
  const { addAlert } = useAlerts()
  const { addFastNotification } = useFastAlerts()

  const getTabs = useCallback(
    (task: ReoSpace.IScanTask): ITab<ReoSpace.IReoTable>[] => {
      return task.types.map((type: ReoSpace.IScanTypes, index: number) => ({
        tabIndex: index,
        id: `tabs-with-underline-item-${index + 1}`,
        label: type,
        data: {
          metaInfo: {
            scanType: type,
            scanStatus: task.status,
            currentScanCycle: task.currentScanCycle,
          },
          rows: MockGenHelpers.generateMockReoTableData(30, [
            TableSpace.IColumnTypes.Enum,
            TableSpace.IColumnTypes.Operator,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Signal,
            TableSpace.IColumnTypes.Checkbox,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Country,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
            TableSpace.IColumnTypes.Text,
          ]),
        },
      }))
    },
    [tasks],
  )

  const addReoTask = useCallback((task: ReoSpace.IScanTask) => {
    addTask(task)
    addView({
      viewId: uuidv4(),
      taskId: task.id,
      show: scanViews.length === 0,
      tabsModel: getTabs(task),
    })
  }, [])

  const emitTestAlerts = async (data: AlertsSpace.IAlertType[], testDelay: number) => {
    for (let i = 0; i < data.length; i++) {
      setTimeout(() => {
        addAlert(data[i])
        addFastNotification(data[i])
      }, testDelay * i)
    }
  }

  useEffect(() => {
    emitTestAlerts(journalAlertsData, 1000)
  }, [journalAlertsData])

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = MockGenHelpers.generateMockScanTasks(10)

      for (let i = 0; i < tasks.length; i++) {
        addReoTask(tasks[i])
      }

      // if (tasks.length !== 0 && tasks !== null && tasks !== undefined) {
      //   runWithInterval<ReoSpace.IScanTask>(
      //     tasks,
      //     1000,
      //     tasks.length,
      //     (task: ReoSpace.IScanTask) => {
      //       addReoTask(task)
      //     },
      //   )
      // }
    }

    loadTasks()
  }, [])

  return (
    <div className='reo-scan-container w-full flex'>
      {tasks.length !== 0 &&
        scanViews.length !== 0 &&
        scanViews.map(
          (view: ReoView, index: number) =>
            view.show && <ReoContentView header={tasks[index].name} model={view} />,
        )}
    </div>
  )
}
