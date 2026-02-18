import { type StylableProps } from '../../Shared/Common.types'
import { Heading } from '../../Typography'

export interface AlertHeaderProps extends StylableProps {
  children: string
  color?: string
}

export const AlertHeader = ({ children, color, className = '' }: AlertHeaderProps) => {
  return (
    <Heading level={4} className={className} style={{ color }}>
      {children}
    </Heading>
  )
}
