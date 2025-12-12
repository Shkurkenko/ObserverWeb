import './style.sass'

interface IColumnDateProps {
  dateString: string
}

export const ColumnDate = ({ dateString }: IColumnDateProps) => {
  return (
    <div className='w-full h-full column-date'>{new Date(dateString).toLocaleDateString()}</div>
  )
}
