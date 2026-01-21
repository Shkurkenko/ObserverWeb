import { useContext } from 'preact/hooks'
import { TasksContext } from '../../../Context/TasksContext'
import { ITasksContext } from '../../../Context/TasksContext'

export const useTasks = (): ITasksContext => {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }

  return {
    // === Состояния задач ===
    tasks: context.tasks,
    runningTasks: context.runningTasks,
    availableScanTypes: context.availableScanTypes,
    reservedScanTypes: context.reservedScanTypes,

    // === Состояния устройства и данных ===
    scanData: context.scanData,
    isConnected: context.isConnected,
    deviceStatus: context.deviceStatus,

    // === UI состояния ===
    error: context.error,
    isLoading: context.isLoading,

    // === Методы задач ===
    setTasks: context.setTasks,
    addTask: context.addTask,
    deleteTask: context.deleteTask,
    setTaskStatus: context.setTaskStatus,
    startTask: context.startTask,
    stopTask: context.stopTask,
    markAsWait: context.markAsWait,
    markAsFail: context.markAsFail,
    generateDemoTasks: context.generateDemoTasks,
    clearAllTasks: context.clearAllTasks,
    clearError: context.clearError,

    // === Методы устройства ===
    connectToDevice: context.connectToDevice,
    disconnectFromDevice: context.disconnectFromDevice,
    clearScanData: context.clearScanData,
    getDeviceConnectionInfo: context.getDeviceConnectionInfo,
  }
}

/**
 * Хук только для управления задачами
 */
export const useTaskManager = () => {
  const {
    tasks,
    runningTasks,
    availableScanTypes,
    reservedScanTypes,
    addTask,
    deleteTask,
    setTaskStatus,
    startTask,
    stopTask,
    markAsWait,
    markAsFail,
    generateDemoTasks,
    clearAllTasks,
  } = useTasks()

  return {
    tasks,
    runningTasks,
    availableScanTypes,
    reservedScanTypes,
    addTask,
    deleteTask,
    setTaskStatus,
    startTask,
    stopTask,
    markAsWait,
    markAsFail,
    generateDemoTasks,
    clearAllTasks,
  }
}

/**
 * Хук только для работы с устройством
 */
export const useDevice = () => {
  const {
    scanData,
    isConnected,
    deviceStatus,
    error,
    isLoading,
    connectToDevice,
    disconnectFromDevice,
    clearScanData,
    getDeviceConnectionInfo,
    clearError,
  } = useTasks()

  return {
    scanData,
    isConnected,
    deviceStatus,
    error,
    isLoading,
    connectToDevice,
    disconnectFromDevice,
    clearScanData,
    getDeviceConnectionInfo,
    clearError,
  }
}

/**
 * Хук только для получения данных сканирования
 */
export const useScanData = () => {
  const { scanData, clearScanData } = useTasks()

  // Фильтрует данные по технологии
  const getDataByTechnology = (technology: string) => {
    return scanData.filter((item) => item.data.technology === technology)
  }

  // Группирует данные по технологии
  const getGroupedData = () => {
    return scanData.reduce(
      (acc, item) => {
        const tech = item.data.technology
        if (!acc[tech]) acc[tech] = []
        acc[tech].push(item)
        return acc
      },
      {} as Record<string, typeof scanData>,
    )
  }

  // Последние N записей
  const getRecentData = (limit = 50) => {
    return scanData.slice(-limit).reverse()
  }

  return {
    scanData,
    getDataByTechnology,
    getGroupedData,
    getRecentData,
    clearScanData,
    totalCount: scanData.length,
  }
}

/**
 * Хук для управления статусами задач
 */
export const useTaskStatus = () => {
  const { tasks, runningTasks, setTaskStatus, startTask, stopTask, markAsWait, markAsFail } =
    useTasks()

  // Старт всех задач в статусе pending
  const startAllPendingTasks = async () => {
    const pendingTasks = tasks.filter((task) => task.status === 'pending')
    const results = await Promise.allSettled(pendingTasks.map((task) => startTask(task.id)))
    return results
  }

  // Стоп всех запущенных задач
  const stopAllRunningTasks = async () => {
    const results = await Promise.allSettled(runningTasks.map((task) => stopTask(task.id)))
    return results
  }

  // Перезапуск задачи
  const restartTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return false

    if (task.status === 'running') {
      await stopTask(id)
    }

    await markAsWait(id)
    return startTask(id)
  }

  return {
    setTaskStatus,
    startTask,
    stopTask,
    markAsWait,
    markAsFail,
    startAllPendingTasks,
    stopAllRunningTasks,
    restartTask,
  }
}
