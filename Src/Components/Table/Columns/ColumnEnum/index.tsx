import './style.sass'

interface IColumnEnumProps {
  index: number
}

export const ColumnEnum = ({ index }: IColumnEnumProps) => {
  return <div className='w-full h-full flex items-center column-enum'>{index + 1}</div>
}
