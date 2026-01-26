import { Grid } from '../../../Components/Layouts/Grid'
import { Card } from '../../../Components/Layouts/Card'
import { Flex } from '../../../Components/Layouts/Flex'
import { Caption } from '../../../Components/Typography'
import { Text } from '../../../Components/Typography'

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
}

export const ScanMetrics = ({ metrics }: IScanMetricsProps) => {
  return (
    <Grid columns={2} lg={4} gap='lg' className='mb-6'>
      {metrics.map((metric) => (
        <Card
          key={metric.id}
          className='border border-outline-variant/50 bg-surface-container p-4 hover:shadow-md transition-shadow'
        >
          <Flex justify='between' align='start'>
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
    </Grid>
  )
}
