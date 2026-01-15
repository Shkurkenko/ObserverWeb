import { Container } from '../../../Components/Layouts/Container'

import './style.sass'

export interface IReoTopData {
  scanName: string
}

interface IReoTopProps {
  data: IReoTopData
}

export function ReoTop({ data }: IReoTopProps) {
  return (
    <Container className='reo-content-top' padding='lg'>
      <h1 className='reo-content-header'>{`Результаты сканирования`}</h1>
      <h4 className='reo-content-scan-name'>{data.scanName}</h4>
    </Container>
  )
}
