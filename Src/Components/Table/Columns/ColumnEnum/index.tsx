import './style.sass'

interface IColumnEnumProps {
  index: number
}

export const ColumnEnum = ({ index }: IColumnEnumProps) => {
  return <div className='w-full h-full column-enum'>{index + 1}</div>
}
