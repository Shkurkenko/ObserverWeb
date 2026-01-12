import { Container } from '../../../Components/Layouts/Box'

import './style.sass'

interface ReoTopData {
  scanName: string
}

interface ReoTopProps {
  data: ReoTopData
}

export function ReoTop({ data }: ReoTopProps) {
  return (
    <Container align='left' className='reo-content-top' paddingX='lg' paddingY='lg'>
      <h1 className='reo-content-header'>{`Результаты сканирования`}</h1>
      <h4 className='reo-content-scan-name'>{data.scanName}</h4>
    </Container>
  )
}
