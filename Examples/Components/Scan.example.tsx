// src/pages/SimpleScannerTest.tsx
import { useTasks } from '../../Src/Components/TaskSidebar/Hooks/UseTasks'
import { ReoSpace } from '../../Src/Shared/Interfaces/Reo.interface'

export const SimpleScannerTest = () => {
  const {
    // Состояния
    tasks,
    runningTasks,
    availableScanTypes,
    reservedScanTypes,
    scanData,
    isConnected,
    deviceStatus,
    error,
    isLoading,

    // Методы
    addTask,
    deleteTask,
    startTask,
    stopTask,
    connectToDevice,
    disconnectFromDevice,
    clearScanData,
    clearAllTasks,
    clearError,
  } = useTasks()

  // Простая функция для создания задачи
  const handleCreateTask = () => {
    const name = `Scan ${tasks.length + 1}`
    const types: ReoSpace.IScanTypes[] = [ReoSpace.IScanTypes.Gsm, ReoSpace.IScanTypes.Lte].filter(
      (type) => availableScanTypes.includes(type),
    )

    if (types.length === 0) {
      alert('Нет доступных типов сканирования!')
      return
    }

    const task: ReoSpace.IScanTask = {
      id: `task-${Date.now()}`,
      name,
      types,
      status: ReoSpace.IScanStatusTypes.Pending,
      createdAt: new Date().toISOString(),
      currentScanCycle: 0,
      duration: 300,
    }

    const success = addTask(task)
    if (!success) {
      alert('Не удалось добавить задачу!')
    }
  }

  // Функция для создания задачи с конкретным типом
  const createTaskWithType = (type: ReoSpace.IScanTypes) => {
    const name = `${type} Scan`
    const task: ReoSpace.IScanTask = {
      id: `task-${Date.now()}-${type}`,
      name,
      types: [type],
      status: ReoSpace.IScanStatusTypes.Pending,
      createdAt: new Date().toISOString(),
      currentScanCycle: 0,
      duration: 180,
    }

    addTask(task)
  }

  // Функция для старта всех задач
  const handleStartAllTasks = async () => {
    const pendingTasks = tasks.filter((t) => t.status === ReoSpace.IScanStatusTypes.Pending)
    for (const task of pendingTasks) {
      await startTask(task.id)
    }
  }

  // Функция для остановки всех задач
  const handleStopAllTasks = async () => {
    for (const task of runningTasks) {
      await stopTask(task.id)
    }
  }

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-8'>📡 Простой тест сканера</h1>

      {/* Статус устройства */}
      <div className='mb-8 p-4 rounded-lg border bg-gray-50'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h2 className='text-xl font-semibold'>Статус устройства</h2>
            <p className='text-gray-600'>Подключение к сканирующему устройству</p>
          </div>
          <div className='flex gap-2'>
            {!isConnected ? (
              <button
                onClick={() => connectToDevice()}
                disabled={isLoading}
                className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50'
              >
                {isLoading ? 'Подключение...' : 'Подключиться'}
              </button>
            ) : (
              <button
                onClick={disconnectFromDevice}
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
              >
                Отключиться
              </button>
            )}
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='p-3 bg-white rounded border'>
            <div className='text-sm text-gray-500'>Статус</div>
            <div
              className={`text-lg font-semibold ${isConnected ? 'text-green-600' : 'text-red-600'}`}
            >
              {deviceStatus === 'connected' ? '✅ Подключено' : '❌ Отключено'}
            </div>
          </div>

          <div className='p-3 bg-white rounded border'>
            <div className='text-sm text-gray-500'>Доступные типы</div>
            <div className='text-lg font-semibold'>{availableScanTypes.length}</div>
          </div>

          <div className='p-3 bg-white rounded border'>
            <div className='text-sm text-gray-500'>Запущено задач</div>
            <div className='text-lg font-semibold'>{runningTasks.length}</div>
          </div>

          <div className='p-3 bg-white rounded border'>
            <div className='text-sm text-gray-500'>Получено данных</div>
            <div className='text-lg font-semibold'>{scanData.length}</div>
          </div>
        </div>

        {/* Ошибка */}
        {error && (
          <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded'>
            <div className='flex justify-between items-center'>
              <span className='text-red-700'>{error}</span>
              <button onClick={clearError} className='text-red-600 hover:text-red-800'>
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Панель управления */}
      <div className='mb-8 p-4 rounded-lg border bg-gray-50'>
        <h2 className='text-xl font-semibold mb-4'>🎛 Панель управления</h2>
        <div className='flex flex-wrap gap-2 mb-4'>
          <button
            onClick={handleCreateTask}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            + Добавить задачу
          </button>

          <button
            onClick={handleStartAllTasks}
            disabled={runningTasks.length > 0 || !isConnected}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50'
          >
            ▶ Запустить все
          </button>

          <button
            onClick={handleStopAllTasks}
            disabled={runningTasks.length === 0}
            className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50'
          >
            ⏹ Остановить все
          </button>

          <button
            onClick={clearAllTasks}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
          >
            🗑 Очистить все
          </button>

          <button
            onClick={clearScanData}
            className='px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600'
          >
            🧹 Очистить данные
          </button>
        </div>

        {/* Быстрое создание задач */}
        <div className='mt-4'>
          <p className='text-sm text-gray-600 mb-2'>Быстрое создание:</p>
          <div className='flex flex-wrap gap-2'>
            {availableScanTypes.map((type) => (
              <button
                key={type}
                onClick={() => createTaskWithType(type)}
                className='px-3 py-1 bg-white border rounded hover:bg-gray-50'
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Список задач */}
      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>📋 Задачи ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <div className='p-8 text-center border-2 border-dashed rounded-lg'>
            <p className='text-gray-500'>Нет задач. Создайте первую!</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {tasks.map((task) => (
              <div
                key={task.id}
                className='p-4 border rounded-lg bg-white hover:shadow-md transition-shadow'
              >
                <div className='flex justify-between items-start mb-3'>
                  <div>
                    <h3 className='font-semibold text-lg'>{task.name}</h3>
                    <div className='flex gap-2 mt-1'>
                      {task.types?.map((type) => (
                        <span
                          key={type}
                          className={`px-2 py-1 text-xs rounded ${
                            reservedScanTypes.includes(type)
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {type}
                          {reservedScanTypes.includes(type) && ' 🔥'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.status === ReoSpace.IScanStatusTypes.Running
                          ? 'bg-green-100 text-green-800'
                          : task.status === ReoSpace.IScanStatusTypes.Pending
                            ? 'bg-yellow-100 text-yellow-800'
                            : task.status === ReoSpace.IScanStatusTypes.Finished
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {task.status}
                    </span>

                    <div className='flex gap-1'>
                      {task.status === ReoSpace.IScanStatusTypes.Pending && (
                        <button
                          onClick={() => startTask(task.id)}
                          disabled={!isConnected}
                          className='px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50'
                        >
                          Старт
                        </button>
                      )}

                      {task.status === ReoSpace.IScanStatusTypes.Running && (
                        <button
                          onClick={() => stopTask(task.id)}
                          className='px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600'
                        >
                          Стоп
                        </button>
                      )}

                      <button
                        onClick={() => deleteTask(task.id)}
                        className='px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600'
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>

                <div className='text-sm text-gray-500'>
                  Создано: {new Date(task.createdAt).toLocaleTimeString()} | Длительность:{' '}
                  {task.duration} сек | Цикл: {task.currentScanCycle}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Полученные данные */}
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>📊 Полученные данные ({scanData.length})</h2>
          {scanData.length > 0 && (
            <button onClick={clearScanData} className='text-sm text-gray-500 hover:text-gray-700'>
              Очистить
            </button>
          )}
        </div>

        {scanData.length === 0 ? (
          <div className='p-8 text-center border-2 border-dashed rounded-lg'>
            <p className='text-gray-500'>Нет данных. Запустите сканирование!</p>
          </div>
        ) : (
          <div className='border rounded-lg overflow-hidden'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='p-3 text-left text-sm font-semibold'>Время</th>
                  <th className='p-3 text-left text-sm font-semibold'>Технология</th>
                  <th className='p-3 text-left text-sm font-semibold'>Тип</th>
                  <th className='p-3 text-left text-sm font-semibold'>MCC</th>
                  <th className='p-3 text-left text-sm font-semibold'>MNC</th>
                  <th className='p-3 text-left text-sm font-semibold'>Данные</th>
                </tr>
              </thead>
              <tbody>
                {scanData
                  .slice(-10)
                  .reverse()
                  .map((data, index) => (
                    <tr key={index} className='border-t hover:bg-gray-50'>
                      <td className='p-3 text-sm'>
                        {new Date(data.timestamp).toLocaleTimeString()}
                      </td>
                      <td className='p-3'>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            data.data.technology === 'GSM'
                              ? 'bg-blue-100 text-blue-800'
                              : data.data.technology === 'LTE'
                                ? 'bg-green-100 text-green-800'
                                : data.data.technology === 'WIFI'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {data.data.technology}
                        </span>
                      </td>
                      <td className='p-3 text-sm'>
                        {data.rawType.split('::=')[0]?.trim() || data.rawType}
                      </td>
                      <td className='p-3 text-sm'>{data.data.mcc || '-'}</td>
                      <td className='p-3 text-sm'>{data.data.mnc || '-'}</td>
                      <td className='p-3'>
                        <button
                          onClick={() => console.log('Raw data:', data.data)}
                          className='text-sm text-blue-600 hover:text-blue-800'
                        >
                          Показать
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {scanData.length > 10 && (
              <div className='p-3 text-center bg-gray-50 border-t'>
                <p className='text-sm text-gray-600'>
                  Показаны последние 10 записей из {scanData.length}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Отладочная информация */}
      <div className='mt-8 p-4 border rounded-lg bg-gray-900 text-gray-100'>
        <h3 className='text-lg font-semibold mb-3'>🐛 Отладочная информация</h3>
        <div className='grid grid-cols-2 gap-4 text-sm'>
          <div>
            <p>
              <strong>Статус:</strong> {deviceStatus}
            </p>
            <p>
              <strong>Подключен:</strong> {isConnected ? 'Да' : 'Нет'}
            </p>
            <p>
              <strong>Загрузка:</strong> {isLoading ? 'Да' : 'Нет'}
            </p>
          </div>
          <div>
            <p>
              <strong>Доступные типы:</strong> {availableScanTypes.join(', ') || 'Нет'}
            </p>
            <p>
              <strong>Занятые типы:</strong> {reservedScanTypes.join(', ') || 'Нет'}
            </p>
          </div>
        </div>

        <details className='mt-4'>
          <summary className='cursor-pointer text-blue-300 hover:text-blue-400'>
            Показать сырые данные
          </summary>
          <pre className='mt-2 p-3 bg-gray-800 rounded text-xs overflow-auto'>
            {JSON.stringify(
              {
                tasksCount: tasks.length,
                runningTasksCount: runningTasks.length,
                scanDataCount: scanData.length,
                lastScanData: scanData.slice(-1)[0],
              },
              null,
              2,
            )}
          </pre>
        </details>
      </div>
    </div>
  )
}

export default SimpleScannerTest
