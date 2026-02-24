import { useState } from 'preact/hooks'
import { useTasks } from '../Hooks/UseTasks'
import { useModal } from '@Components/Modal/Hooks/UseModal'
import { Modal } from '@Components/Modal'
import { Button } from '@Components/Button'
import { Icon, Text, Divider } from '../../Typography'
import {
  ReoScanStatus,
  ReoScanTask,
  ReoScanVariant,
  ReoScanVariantType,
} from '@Shared/Interfaces/Reo.interface'

import './style.sass'

const SCAN_TYPES = [
  {
    type: ReoScanVariant.Gsm,
    name: 'GSM',
    description: 'Сканирование GSM сетей 2G',
    icon: '📶',
    color: '#4CAF50',
  },
  {
    type: ReoScanVariant.Lte,
    name: 'LTE (4G)',
    description: 'Сканирование LTE/4G сетей',
    icon: '🚀',
    color: '#2196F3',
  },
  {
    type: ReoScanVariant.Wifi,
    name: 'WiFi',
    description: 'Сканирование WiFi сетей',
    icon: '📡',
    color: '#FF9800',
  },
  {
    type: ReoScanVariant.Bluetooth,
    name: 'Bluetooth',
    description: 'Сканирование Bluetooth устройств',
    icon: '🔵',
    color: '#3F51B5',
  },
  {
    type: ReoScanVariant.Umts,
    name: '3G',
    description: 'Сканирование UMTS/3G сетей',
    icon: '📞',
    color: '#9C27B0',
  },
  {
    type: ReoScanVariant.FiveG,
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
  const [selectedScanTypes, setSelectedScanTypes] = useState<ReoScanVariantType[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleScanType = (typeName: ReoScanVariantType) => {
    setSelectedScanTypes((prev) => {
      if (prev.includes(typeName)) {
        return prev.filter((type) => type !== typeName)
      } else {
        return [...prev, typeName]
      }
    })
  }

  // Выбрать все доступные
  const selectAllAvailable = () => {
    const availableTypes = SCAN_TYPES.map((scanType) => scanType.type)

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

    setIsSubmitting(true)

    try {
      // Создаем задачи для каждого выбранного типа
      selectedScanTypes.forEach((type) => {
        const scanType = SCAN_TYPES.find((st) => st.type === type)

        // Создаем задачу сканирования
        const newTask: ReoScanTask = {
          id: `scan_${Date.now()}_${type}_${Math.random().toString(36).substr(2, 6)}`,
          name: `${scanName} (${scanType?.name})`,
          types: selectedScanTypes,
          status: ReoScanStatus.Pending,
          createdAt: new Date().toISOString(),
          duration: 0,
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
  // const availableTypes = SCAN_TYPES.filter((scanType) => !hasActiveScanOfType(scanType.id))
  const selectedCount = selectedScanTypes.length
  // const availableCount = availableTypes.length

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
                  // disabled={availableCount === 0}
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
                // const isActive = hasActiveScanOfType(scanType.type)
                const isSelected = selectedScanTypes.includes(scanType.type)

                return (
                  <div
                    key={scanType.name}
                    className={`scan-type-card ${isSelected ? 'selected' : ''} ${'active'}`}
                    onClick={() => toggleScanType(scanType.name as ReoScanVariantType)}
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

                    {/* <div className='scan-type-status'>
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
                    </div> */}

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
