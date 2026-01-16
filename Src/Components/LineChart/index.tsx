// Boilerplates/components/LineChart.tsx
import { FunctionalComponent } from 'preact'
import { useRef, useEffect } from 'preact/hooks'

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    color: 'primary' | 'secondary' | 'tertiary'
  }[]
}

interface LineChartProps {
  data: ChartData
  height?: number
  className?: string
}

const colorMap = {
  primary: {
    line: 'var(--primary)',
    fill: 'var(--primary-container)',
  },
  secondary: {
    line: 'var(--secondary)',
    fill: 'var(--secondary-container)',
  },
  tertiary: {
    line: 'var(--tertiary)',
    fill: 'var(--tertiary-container)',
  },
}

export const LineChart: FunctionalComponent<LineChartProps> = ({
  data,
  height = 200,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Размеры
    const width = containerRef.current.clientWidth
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Масштабирование canvas
    canvas.width = width
    canvas.height = height

    // Очистка
    ctx.clearRect(0, 0, width, height)

    // Находим максимальное значение
    const allValues = data.datasets.flatMap((d) => d.data)
    const maxValue = Math.max(...allValues) * 1.1

    // Функция для преобразования значения в координаты
    const getX = (index: number) => padding + (index * chartWidth) / (data.labels.length - 1)
    const getY = (value: number) => height - padding - (value * chartHeight) / maxValue

    // Сетка
    ctx.strokeStyle = 'var(--outline-variant)'
    ctx.lineWidth = 0.5

    // Горизонтальные линии
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight * i) / gridLines
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Вертикальные линии
    for (let i = 0; i < data.labels.length; i++) {
      const x = getX(i)
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
    }

    // Рисуем каждый датасет
    data.datasets.forEach((dataset, datasetIndex) => {
      const colors = colorMap[dataset.color]

      // Создаем градиент для заливки
      const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
      gradient.addColorStop(0, `${colors.fill}40`)
      gradient.addColorStop(1, `${colors.fill}10`)

      // Начинаем путь
      ctx.beginPath()
      ctx.moveTo(getX(0), getY(dataset.data[0]))

      // Рисуем линию
      for (let i = 1; i < dataset.data.length; i++) {
        const x = getX(i)
        const y = getY(dataset.data[i])

        // Сглаживание кривой
        const prevX = getX(i - 1)
        const prevY = getY(dataset.data[i - 1])

        const cpX1 = prevX + (x - prevX) * 0.3
        const cpY1 = prevY
        const cpX2 = x - (x - prevX) * 0.3
        const cpY2 = y

        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x, y)
      }

      // Закрываем путь для заливки
      ctx.lineTo(getX(dataset.data.length - 1), height - padding)
      ctx.lineTo(getX(0), height - padding)
      ctx.closePath()

      // Заливаем область
      ctx.fillStyle = gradient
      ctx.fill()

      // Рисуем линию поверх
      ctx.beginPath()
      ctx.moveTo(getX(0), getY(dataset.data[0]))

      for (let i = 1; i < dataset.data.length; i++) {
        const x = getX(i)
        const y = getY(dataset.data[i])

        const prevX = getX(i - 1)
        const prevY = getY(dataset.data[i - 1])

        const cpX1 = prevX + (x - prevX) * 0.3
        const cpY1 = prevY
        const cpX2 = x - (x - prevX) * 0.3
        const cpY2 = y

        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x, y)
      }

      // Стиль линии
      ctx.strokeStyle = colors.line
      ctx.lineWidth = 2
      ctx.stroke()

      // Точки данных
      dataset.data.forEach((value, i) => {
        const x = getX(i)
        const y = getY(value)

        // Точка
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = colors.line
        ctx.fill()

        // Обводка
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.strokeStyle = 'var(--surface)'
        ctx.lineWidth = 2
        ctx.stroke()
      })
    })

    // Подписи по оси X
    ctx.fillStyle = 'var(--on-surface-variant)'
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    data.labels.forEach((label, i) => {
      const x = getX(i)
      ctx.fillText(label, x, height - padding + 10)
    })

    // Подписи по оси Y
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue * i) / 5)
      const y = getY(value)
      ctx.fillText(value.toLocaleString(), padding - 8, y)
    }
  }, [data, height])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: `${height}px` }}>
      <canvas ref={canvasRef} className='absolute inset-0' />
    </div>
  )
}
