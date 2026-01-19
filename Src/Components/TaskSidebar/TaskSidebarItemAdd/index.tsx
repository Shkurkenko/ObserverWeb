// src/Components/AddTask/AddTask.tsx
import { useState, useCallback } from 'preact/hooks'
import { useModal } from '../../Modal/hooks/UseModal'
import { useTasks } from '../Hooks/UseTasks'
import { Modal } from '../../Modal'
import { Button } from '../../Button'
import { Icon, Text } from '../../Typography'
import { Divider } from '../../Typography'

import './style.sass'

const SCAN_TYPES = [
  {
    id: 'gsm',
    name: 'GSM',
    description: 'Сканирование GSM сетей 2G',
    icon: '📶',
    color: '#4CAF50',
  },
  {
    id: 'lte',
    name: 'LTE (4G)',
    description: 'Сканирование LTE/4G сетей',
    icon: '🚀',
    color: '#2196F3',
  },
  {
    id: 'wifi',
    name: 'WiFi',
    description: 'Сканирование WiFi сетей',
    icon: '📡',
    color: '#FF9800',
  },
  {
    id: 'bluetooth',
    name: 'Bluetooth',
    description: 'Сканирование Bluetooth устройств',
    icon: '🔵',
    color: '#3F51B5',
  },
  {
    id: '3g',
    name: '3G',
    description: 'Сканирование UMTS/3G сетей',
    icon: '📞',
    color: '#9C27B0',
  },
  {
    id: '5g',
    name: '5G',
    description: 'Сканирование 5G NR сетей',
    icon: '⚡',
    color: '#00BCD4',
  },
]

export function AddTask() {
  const { addTask, tasks } = useTasks()
  const { isOpen, toggle, close } = useModal()

  const [scanName, setScanName] = useState('')
  const [selectedScanTypes, setSelectedScanTypes] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Проверка активных сканирований
  const hasActiveScanOfType = useCallback(
    (type: string) => {
      return tasks.some((task) => task.status === 'active' && task.type === type)
    },
    [tasks],
  )

  // Переключение выбора типа
  const toggleScanType = (typeId: string) => {
    if (hasActiveScanOfType(typeId)) return

    setSelectedScanTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId)
      } else {
        return [...prev, typeId]
      }
    })
  }

  // Выбрать все доступные
  const selectAllAvailable = () => {
    const availableTypes = SCAN_TYPES.filter((scanType) => !hasActiveScanOfType(scanType.id)).map(
      (scanType) => scanType.id,
    )

    setSelectedScanTypes(availableTypes)
  }

  // Очистить все
  const clearAll = () => {
    setSelectedScanTypes([])
  }

  // Создание сканирований
  const handleCreateScans = async () => {
    if (!scanName.trim() || selectedScanTypes.length === 0) {
      return
    }

    // Проверяем, что выбранные типы не активны
    const hasActiveSelected = selectedScanTypes.some((type) => hasActiveScanOfType(type))
    if (hasActiveSelected) {
      return
    }

    setIsSubmitting(true)

    try {
      // Создаем задачи для каждого выбранного типа
      selectedScanTypes.forEach((typeId) => {
        const scanType = SCAN_TYPES.find((st) => st.id === typeId)

        // Создаем задачу сканирования
        const newTask = {
          id: `scan_${Date.now()}_${typeId}_${Math.random().toString(36).substr(2, 6)}`,
          name: `${scanName} (${scanType?.name})`,
          type: typeId,
          target: 'Радиочастотный спектр',
          status: 'pending' as const,
          progress: 0,
          createdAt: new Date().toISOString(),
          duration: 60,
          priority: 'medium',
          tags: [typeId, 'радио', 'параллельное'],
          estimatedTime: '60 мин',
          results: null,
          lastUpdated: new Date().toISOString(),
          metadata: {
            icon: scanType?.icon,
            color: scanType?.color,
            scanTypeName: scanType?.name,
          },
        }

        // Добавляем в список
        addTask(newTask)
      })

      // Закрываем модалку и сбрасываем форму
      close()
      resetForm()

      // Имитируем запуск сканирований
      setTimeout(() => {
        console.log(`Запущено ${selectedScanTypes.length} сканирований: ${scanName}`)
      }, 500)
    } catch (error) {
      console.error('Ошибка при создании сканирований:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Сброс формы
  const resetForm = () => {
    setScanName('')
    setSelectedScanTypes([])
  }

  // Доступные типы для выбора
  const availableTypes = SCAN_TYPES.filter((scanType) => !hasActiveScanOfType(scanType.id))
  const selectedCount = selectedScanTypes.length
  const availableCount = availableTypes.length

  return (
    <div className='add-task-container'>
      <div className='add-task-button' onClick={() => toggle()}>
        <div className='add-task-icon'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
          >
            <path d='M12 5v14M5 12h14' />
          </svg>
        </div>
        <span className='add-task-label'>Добавить сканирование</span>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          close()
          resetForm()
        }}
        title='Новое сканирование'
      >
        <div className='scan-form'>
          {/* Название сканирования */}
          <div className='form-group'>
            <label className='form-label'>
              <span className='label-text'>Название сканирования</span>
              <span className='label-counter'>{scanName.length}/50</span>
            </label>
            <div className='input-container'>
              <input
                type='text'
                className='form-input'
                placeholder='Введите название для сканирования'
                value={scanName}
                onChange={(e) => setScanName((e.target as HTMLInputElement).value)}
                maxLength={50}
              />
              <div className='input-border'></div>
            </div>
          </div>

          <Divider className='my-4' />

          {/* Выбор типов сканирования */}
          <div className='form-group'>
            <div className='form-header'>
              <label className='form-label'>
                <span className='label-text'>Выберите типы сканирования</span>
                <span className='label-counter mr-5'>{selectedCount} выбрано</span>
              </label>

              <div className='form-actions'>
                <button
                  type='button'
                  onClick={selectAllAvailable}
                  className='action-btn select-all mr-2'
                  disabled={availableCount === 0}
                >
                  Выбрать все
                </button>
                <button
                  type='button'
                  onClick={clearAll}
                  className='action-btn clear-all'
                  disabled={selectedCount === 0}
                >
                  Сбросить
                </button>
              </div>
            </div>

            <div className='scan-types-grid'>
              {SCAN_TYPES.map((scanType) => {
                const isActive = hasActiveScanOfType(scanType.id)
                const isSelected = selectedScanTypes.includes(scanType.id)

                return (
                  <div
                    key={scanType.id}
                    className={`scan-type-card ${isSelected ? 'selected' : ''} ${isActive ? 'active' : ''}`}
                    onClick={isActive ? undefined : () => toggleScanType(scanType.id)}
                  >
                    <div className='scan-type-icon' style={{ color: scanType.color }}>
                      <span className='icon-emoji'>{scanType.icon}</span>
                    </div>

                    <div className='scan-type-content'>
                      <Text as='div' variant='body1' bold className='scan-type-name'>
                        {scanType.name}
                      </Text>
                      <Text
                        as='div'
                        variant='body2'
                        color='secondary'
                        className='scan-type-description'
                      >
                        {scanType.description}
                      </Text>
                    </div>

                    <div className='scan-type-status'>
                      {isActive ? (
                        <div className='status-badge active'>
                          <Icon size='xs'>⏳</Icon>
                          <span>Активно</span>
                        </div>
                      ) : isSelected ? (
                        <div className='status-badge selected'>
                          <Icon size='xs'>✓</Icon>
                          <span>Выбрано</span>
                        </div>
                      ) : (
                        <div className='status-badge available'>
                          <span>Доступно</span>
                        </div>
                      )}
                    </div>

                    {isSelected && <div className='selection-indicator'></div>}
                  </div>
                )
              })}
            </div>
          </div>

          <Divider className='my-4' />

          {/* Кнопка создания */}
          <div className='form-footer'>
            <Button
              variant='primary'
              onClick={handleCreateScans}
              disabled={isSubmitting || selectedCount === 0 || !scanName.trim()}
              className='submit-button'
              fullWidth
            >
              {isSubmitting ? (
                <>
                  <div className='spinner'></div>
                  Запуск...
                </>
              ) : (
                <>
                  <Icon size='sm' className='mr-2'>
                    🚀
                  </Icon>
                  Запустить сканирование{selectedCount > 1 ? ` (${selectedCount})` : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
