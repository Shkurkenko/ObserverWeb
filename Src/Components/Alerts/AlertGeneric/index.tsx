import { ComponentChildren } from 'preact'

interface IAlertGenericProps {
  id: string
  color: string
  icon: ComponentChildren
  header: string
  message: string
  dismissAlert: Function | null
}

export function AlertGeneric({
  id,
  color,
  icon,
  header,
  message,
  dismissAlert,
}: IAlertGenericProps) {
  const handleClose = (e: Event) => {
    e.preventDefault()
    if (dismissAlert) dismissAlert(id)
  }

  return (
    <div className='alert-item pr-6' style={{ borderLeft: `0.25rem solid ${color}` }}>
      <div className='notification-icon'>{icon}</div>
      <div className='notification-content'>
        <h4 style={{ color }}>{header}</h4>
        <p>
          {message}{' '}
          sjdklfa;jsadlk;jfklsadjsdjfklsdjfksdfdskjflksdsjdfkjsdklfjsdlkjfklsdjfklsdjfksdjfksdjfksdjfklsdjfk
        </p>
      </div>
      <div className='close-notification' onClick={handleClose}>
        <svg
          class='w-5 h-5 text-[#a6adb5]'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M6 18 17.94 6M18 18 6.06 6'
          />
        </svg>
      </div>
    </div>
  )
}
