import { createContext, ComponentChildren } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import { ReoSpace } from '../Shared/Interfaces/Reo.interface'

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
}

export interface ITaskProviderProps {
  children: ComponentChildren
}

export const TasksContext = createContext<ITasksContext | null>(null)
export const TasksProvider = ({ children }: ITaskProviderProps) => {
  const [tasks, setTasks] = useState<ReoSpace.IScanTask[]>([])

  const addTask = useCallback((task: ReoSpace.IScanTask) => {
    setTasks((prev: ReoSpace.IScanTask[]) => [...prev, task])
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev: ReoSpace.IScanTask[]) =>
      prev.filter((task: ReoSpace.IScanTask) => task.id !== id),
    )
  }, [])

  const setTaskStatus = useCallback((id: string, status: ReoSpace.IScanStatusTypes) => {
    setTasks((prev: ReoSpace.IScanTask[]) =>
      prev.map((task: ReoSpace.IScanTask) => (id === task.id ? { ...task, status } : task)),
    )
  }, [])

  const startTask = useCallback((id: string) => {
    setTaskStatus(id, ReoSpace.IScanStatusTypes.Running)
  }, [])

  const stopTask = useCallback((id: string) => {
    setTaskStatus(id, ReoSpace.IScanStatusTypes.Finished)
  }, [])

  const waitTask = useCallback((id: string) => {
    setTaskStatus(id, ReoSpace.IScanStatusTypes.Pending)
  }, [])

  const failTask = useCallback((id: string) => {
    setTaskStatus(id, ReoSpace.IScanStatusTypes.Failed)
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
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider
