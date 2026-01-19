// src/Context/TasksContext.tsx
import { createContext, ComponentChildren } from 'preact'
import { useCallback, useState, useEffect } from 'preact/hooks'
import { ReoSpace } from '../Shared/Interfaces/Reo.interface'
import { MockGenHelpers } from '../Utils/MockGen'

export interface ITasksContext {
  tasks: ReoSpace.IScanTask[]

  setTasks: (tasks: ReoSpace.IScanTask[]) => void

  addTask: (task: ReoSpace.IScanTask) => void

  deleteTask: (id: string) => void

  setTaskStatus: (id: string, status: ReoSpace.IScanStatusTypes) => void

  startTask: (id: string) => void

  stopTask: (id: string) => void

  waitTask: (id: string) => void

  failTask: (id: string) => void

  generateDemoTasks: (count?: number) => void

  clearAllTasks: () => void
}

export const TasksContext = createContext<ITasksContext | null>(null)

export const TasksProvider = ({ children }: { children: ComponentChildren }) => {
  const [tasks, setTasks] = useState<ReoSpace.IScanTask[]>([])

  // Генерация демо-задач при монтировании
  useEffect(() => {
    generateDemoTasks(5)
  }, [])

  const generateDemoTasks = useCallback((count: number = 5) => {
    const demoTasks = MockGenHelpers.generateMockScanTasks(count)
    setTasks(demoTasks)
  }, [])

  const addTask = useCallback((task: ReoSpace.IScanTask) => {
    setTasks((prev) => [...prev, task])
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const setTaskStatus = useCallback((id: string, status: ReoSpace.IScanStatusTypes) => {
    setTasks((prev) => prev.map((task) => (id === task.id ? { ...task, status } : task)))
  }, [])

  const startTask = useCallback(
    (id: string) => {
      setTaskStatus(id, ReoSpace.IScanStatusTypes.Running)
    },
    [setTaskStatus],
  )

  const stopTask = useCallback(
    (id: string) => {
      setTaskStatus(id, ReoSpace.IScanStatusTypes.Finished)
    },
    [setTaskStatus],
  )

  const waitTask = useCallback(
    (id: string) => {
      setTaskStatus(id, ReoSpace.IScanStatusTypes.Pending)
    },
    [setTaskStatus],
  )

  const failTask = useCallback(
    (id: string) => {
      setTaskStatus(id, ReoSpace.IScanStatusTypes.Failed)
    },
    [setTaskStatus],
  )

  const clearAllTasks = useCallback(() => {
    setTasks([])
  }, [])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        deleteTask,
        setTaskStatus,
        startTask,
        stopTask,
        waitTask,
        failTask,
        generateDemoTasks,
        clearAllTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
