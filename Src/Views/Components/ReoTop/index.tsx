import './style.sass'

interface ReoTopData {
  scanName: string
}

interface ReoTopProps {
  data: ReoTopData
}

export function ReoTop({ data }: ReoTopProps) {
  return (
    <div className='reo-content-top'>
      <div className='reo-header-info'>
        <h1 className='reo-content-header'>{`Результаты сканирования`}</h1>
        <h4 className='reo-content-scan-name'>{data.scanName}</h4>
      </div>
    </div>
  )
}
