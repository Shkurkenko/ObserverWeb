import { Card } from '../../../Components/Layouts/Card'
import { Flex } from '../../../Components/Layouts/Flex'
import { Caption } from '../../../Components/Typography'
import { Text } from '../../../Components/Typography'
import { Stack } from '../../../Components/Layouts/Stack'
import { PillsTabs } from '../../../Components/Tabs/TabGroup'
import { cn } from '../../../Utils/Helpers'

export interface IScanMetrics {
  id: string

  title: string

  value: string | number

  icon: string

  description: string

  color: string
}
export interface IScanMetricsProps {
  metrics: IScanMetrics[]

  className?: string
}

const scanMetricsTabs = [
  {
    id: 'stats',
    label: 'Статистика',
    icon: '📋',
    description: 'Статистика РЭО',
  },
  {
    id: 'charts',
    label: 'Графики',
    icon: '📊',
    description: 'Графики РЭО',
  },
]

export const ScanMetrics = ({ metrics, className = '' }: IScanMetricsProps) => {
  return (
    <Stack className={cn(className)}>
      <PillsTabs
        tabs={scanMetricsTabs}
        activeTabId={0}
        onTabClick={() => console.log('stats button tabs click')}
        size='md'
      />
      <Flex direction='col' justify='between' className='h-162.5'>
        {metrics.map((metric) => (
          <Card
            key={metric.id}
            className='border border-outline-variant/50 bg-surface-container p-4 hover:shadow-md transition-shadow w-full h-full'
          >
            <Flex direction='row' justify='between' align='start' className='w-full'>
              <div>
                <Caption className='text-on-surface-variant mb-1'>{metric.title}</Caption>
                <Text className={`text-2xl font-bold ${metric.color}`}>{metric.value}</Text>
                <Caption className='text-on-surface-variant/70 mt-1'>{metric.description}</Caption>
              </div>
              <div className='bg-primary/10 p-2 rounded-lg'>
                <div className='text-xl'>{metric.icon}</div>
              </div>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Stack>
  )
}
