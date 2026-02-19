import { createContext, ComponentChildren } from 'preact'
import { useCallback, useState, useEffect, useMemo } from 'preact/hooks'
import { MockGenHelpers } from '../Utils/MockGen'
import { ScanClient } from '../Services/TcpReoClient/ScanClient'
import { IParsedScanMessage } from '../Services/TcpReoClient'
import { serviceConfig } from '../config'
import {
  ReoScanStatusType,
  ReoScanVariantType,
  ReoScanTask,
  ReoScanVariant,
  ReoScanStatus,
} from '../Shared/Interfaces/Reo.interface'

export interface ITasksContext {
  // Задачи
  tasks: ReoScanTask[]
  runningTasks: ReoScanTask[]
  availableScanTypes: ReoScanVariantType[]
  reservedScanTypes: ReoScanVariantType[]

  // Данные и статус устройства
  scanData: IParsedScanMessage[]
  isConnected: boolean
  deviceStatus: 'disconnected' | 'connecting' | 'connected' | 'error'

  // UI состояние
  error: string | null
  isLoading: boolean

  // Методы задач
  setTasks: (tasks: []) => void
  addTask: (task: ReoScanTask) => boolean
  deleteTask: (id: string) => void
  setTaskStatus: (id: string, status: ReoScanStatusType) => void
  startTask: (id: string) => Promise<boolean>
  stopTask: (id: string) => Promise<boolean>
  markAsWait: (id: string) => void
  markAsFail: (id: string) => void
  generateDemoTasks: (count?: number) => void
  clearAllTasks: () => void
  clearError: () => void

  // Методы устройства
  connectToDevice: () => Promise<boolean>
  disconnectFromDevice: () => void
  clearScanData: () => void
  getDeviceConnectionInfo: () => { host: string; port: number; isConnected: boolean }
}

export const TasksContext = createContext<ITasksContext | null>(null)

export const TasksProvider = ({ children }: { children: ComponentChildren }) => {
  // Состояния задач
  const [tasks, setTasks] = useState<ReoScanTask[]>([])
  const [runningTasks, setRunningTasks] = useState<ReoScanTask[]>([])
  const [availableScanTypes, setAvailableScanTypes] = useState<ReoScanVariantType[]>([])
  const [reservedScanTypes, setReservedScanTypes] = useState<ReoScanVariantType[]>([])

  // Состояния устройства и данных
  const [scanData, setScanData] = useState<IParsedScanMessage[]>([])
  const [deviceStatus, setDeviceStatus] = useState<
    'disconnected' | 'connecting' | 'connected' | 'error'
  >('disconnected')
  const [scanClient, setScanClient] = useState<ScanClient | null>(null)

  // UI состояния
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Все доступные типы сканирования
  const allScanTypes = useMemo(() => {
    const values = Object.values(ReoScanVariant)
    return values.filter((value) => typeof value === 'string') as ReoScanVariantType[]
  }, [])

  // 1. Инициализация ScanClient
  useEffect(() => {
    console.log('📡 Initializing ScanClient with config:', serviceConfig.device)

    const client = new ScanClient({
      host: serviceConfig.device.host,
      port: serviceConfig.device.port,
      autoReconnect: serviceConfig.app.autoReconnect,
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
    })

    // Подписка на события клиента
    client.on('connected', () => {
      console.log('✅ Connected to device')
      setDeviceStatus('connected')
      setError(null)
    })

    client.on('disconnected', () => {
      console.log('❌ Disconnected from device')
      setDeviceStatus('disconnected')
    })

    client.on('error', (err) => {
      console.error('Device error:', err)
      setDeviceStatus('error')
      setError(`Device error: ${err.message}`)
    })

    client.on('data', (message: IParsedScanMessage) => {
      // Сохраняем данные с ограничением количества
      setScanData((prev) => {
        const newData = [...prev, message]
        return newData.slice(-serviceConfig.app.maxScanData)
      })
    })

    setScanClient(client)

    // Автоподключение если настроено
    if (serviceConfig.app.autoReconnect) {
      client.connect().catch((err) => {
        console.log('Auto-connect failed:', err.message)
      })
    }

    return () => {
      client.disconnect()
    }
  }, [])

  // 2. Обновление состояний задач
  useEffect(() => {
    const running = tasks.filter((task) => task.status === ReoScanStatus.Running)
    setRunningTasks(running)

    // Собираем занятые типы сканирования
    const reserved: ReoScanVariantType[] = []
    running.forEach((task) => {
      task.types?.forEach((type) => {
        if (!reserved.includes(type)) {
          reserved.push(type)
        }
      })
    })
    setReservedScanTypes(reserved)

    // Вычисляем доступные типы
    const available = allScanTypes.filter((type) => !reserved.includes(type))
    setAvailableScanTypes(available)
  }, [tasks, allScanTypes])

  // 3. Генерация демо-задач при монтировании
  useEffect(() => {
    generateDemoTasks(3)
  }, [])

  // 4. Методы устройства
  const connectToDevice = useCallback(async (): Promise<boolean> => {
    if (!scanClient) {
      setError('Scan client not initialized')
      return false
    }

    if (deviceStatus === 'connected') {
      return true
    }

    setIsLoading(true)
    setDeviceStatus('connecting')
    setError(null)

    try {
      await scanClient.connect()
      return true
    } catch (err) {
      setError(`Connection failed: ${err}`)
      setDeviceStatus('error')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [scanClient, deviceStatus])

  const disconnectFromDevice = useCallback(() => {
    if (scanClient) {
      scanClient.disconnect()
      setDeviceStatus('disconnected')
    }
  }, [scanClient])

  const getDeviceConnectionInfo = useCallback(() => {
    return {
      host: serviceConfig.device.host,
      port: serviceConfig.device.port,
      isConnected: deviceStatus === 'connected',
    }
  }, [deviceStatus])

  const clearScanData = useCallback(() => {
    setScanData([])
  }, [])

  // 5. Методы задач
  const generateDemoTasks = useCallback((count: number = 3) => {
    const demoTasks = MockGenHelpers.generateMockScanTasks(count)
    setTasks(demoTasks)
  }, [])

  const addTask = useCallback(
    (task: ReoScanTask): boolean => {
      const conflictTypes = task.types?.filter((type) => reservedScanTypes.includes(type)) || []

      if (conflictTypes.length > 0) {
        const conflictTasksData = tasks.filter((t) =>
          t.types?.some(
            (type) => conflictTypes.includes(type) && t.status === ReoScanStatus.Running,
          ),
        )

        if (conflictTasksData.length > 0) {
          const conflictNames = conflictTasksData.map((t) => t.name).join(', ')
          setError(
            `Cannot add task. Scan types "${conflictTypes.join(', ')} ` +
              `already used by tasks: ${conflictNames}.`,
          )
          return false
        }
      }

      setTasks((prev) => [
        ...prev,
        {
          ...task,
          id: task.id || `task-${Date.now()}`,
          status: ReoScanStatus.Pending,
          createdAt: task.createdAt || new Date().toISOString(),
        },
      ])
      setError(null)

      return true
    },
    [tasks, reservedScanTypes],
  )

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    setError(null)
  }, [])

  const setTaskStatus = useCallback((id: string, status: ReoScanStatusType) => {
    setTasks((prev) => prev.map((task) => (id === task.id ? { ...task, status } : task)))
  }, [])

  const startTask = useCallback(
    async (id: string): Promise<boolean> => {
      const taskToStart = tasks.find((task) => task.id === id)

      if (!taskToStart) {
        setError(`Task not found`)
        return false
      }

      if (taskToStart?.status === ReoScanStatus.Running) {
        setError(`Task "${taskToStart.name}" already running`)
        return false
      }

      if (taskToStart.status === ReoScanStatus.Finished) {
        setError(`Task "${taskToStart.name}" already finished`)
        return false
      }

      // Проверяем подключение к устройству
      if (!scanClient?.getIsConnected()) {
        setError(`Not connected to device. Please connect first.`)
        return false
      }

      // Проверяем доступность типов сканирования
      const taskTypes = taskToStart.types || []
      const unavailableTypes = taskTypes.filter((type) => !availableScanTypes.includes(type))

      if (unavailableTypes.length > 0) {
        const blockingTasks = runningTasks.filter((runningTask) =>
          runningTask.types?.some((type) => unavailableTypes.includes(type)),
        )

        if (blockingTasks.length > 0) {
          const blockingNames = blockingTasks.map((t) => t.name).join(', ')
          setError(`Cannot start "${taskToStart.name}". ` + `Conflict with tasks: ${blockingNames}`)
          return false
        }
      }

      try {
        // Отправляем команду на устройство
        await scanClient.startScanning(taskTypes)

        // Обновляем статус задачи
        setTaskStatus(id, ReoScanStatus.Running)
        setError(null)
        return true
      } catch (err) {
        setError(`Failed to start scan on device: ${err}`)
        return false
      }
    },
    [tasks, runningTasks, availableScanTypes, scanClient, setTaskStatus],
  )

  const stopTask = useCallback(
    async (id: string): Promise<boolean> => {
      const taskToStop = tasks.find((task) => task.id === id)

      if (!taskToStop) {
        setError(`Task not found`)
        return false
      }

      if (taskToStop.status !== ReoScanStatus.Running) {
        setError(`Task "${taskToStop.name}" not running`)
        return false
      }

      try {
        // Останавливаем только типы этой задачи
        const otherRunningTasks = runningTasks.filter((t) => t.id !== id)
        const typesStillNeeded = otherRunningTasks.flatMap((t) => t.types || [])
        const typesToStop = (taskToStop.types || []).filter(
          (type) => !typesStillNeeded.includes(type),
        )

        if (typesToStop.length > 0 && scanClient) {
          await scanClient.stopScanning(typesToStop)
        }

        setTaskStatus(id, ReoScanStatus.Finished)
        setError(null)
        return true
      } catch (err) {
        setError(`Failed to stop scan on device: ${err}`)
        return false
      }
    },
    [tasks, runningTasks, scanClient, setTaskStatus],
  )

  const markAsWait = useCallback(
    (id: string) => {
      setTaskStatus(id, ReoScanStatus.Pending)
      setError(null)
    },
    [setTaskStatus],
  )

  const markAsFail = useCallback(
    (id: string) => {
      setTaskStatus(id, ReoScanStatus.Failed)
      setError(null)
    },
    [setTaskStatus],
  )

  const clearAllTasks = useCallback(() => {
    setTasks([])
    // Останавливаем все сканирования на устройстве
    if (scanClient) {
      scanClient.stopScanning().catch(console.error)
    }
    setError(null)
  }, [scanClient])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // 6. Собираем контекстное значение
  const contextValue = useMemo(
    () => ({
      tasks,
      runningTasks,
      availableScanTypes,
      reservedScanTypes,
      scanData,
      isConnected: deviceStatus === 'connected',
      deviceStatus,
      error,
      isLoading,
      setTasks,
      addTask,
      deleteTask,
      setTaskStatus,
      startTask,
      stopTask,
      markAsWait,
      markAsFail,
      generateDemoTasks,
      clearAllTasks,
      clearError,
      connectToDevice,
      disconnectFromDevice,
      clearScanData,
      getDeviceConnectionInfo,
    }),
    [
      tasks,
      runningTasks,
      availableScanTypes,
      reservedScanTypes,
      scanData,
      deviceStatus,
      error,
      isLoading,
      setTasks,
      addTask,
      deleteTask,
      setTaskStatus,
      startTask,
      stopTask,
      markAsWait,
      markAsFail,
      generateDemoTasks,
      clearAllTasks,
      clearError,
      connectToDevice,
      disconnectFromDevice,
      clearScanData,
      getDeviceConnectionInfo,
    ],
  )

  return <TasksContext.Provider value={contextValue}>{children}</TasksContext.Provider>
}
