import './button.css'

export interface ButtonProps {
  /**
   * Primary style button
   * @default false
   */
  primary?: boolean

  /**
   * Custom background color
   */
  backgroundColor?: string

  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Button text
   */
  label: string

  /**
   * Click handler
   */
  onClick?: () => void

  /**
   * Disabled state
   */
  disabled?: boolean
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  backgroundColor,
  size = 'medium',
  label,
  onClick,
  disabled = false,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary'

  return (
    <button
      type='button'
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor ? { backgroundColor } : undefined}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
}
