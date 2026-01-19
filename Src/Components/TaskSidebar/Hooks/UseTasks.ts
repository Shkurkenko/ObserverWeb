import { useContext } from 'preact/hooks'
import { TasksContext } from '../../../Context/TasksContext'

export const useTasks = () => {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }

  const {
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
  } = context

  return {
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
  }
}
