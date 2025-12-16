export interface IButton {
  text?: string
  isDisabled?: boolean
  additionalClasses?: string
  iconElement?: JSX.Element
  onClicked: () => void
}

export function Button({
  text,
  isDisabled,
  onClicked,
  iconElement,
  additionalClasses = '',
}: IButton) {
  return (
    <button
      type='button'
      class={
        `table-helper-action-button 
        cursor-pointer
        px-5 py-2.5 text-sm 
        font-medium 
        text-on-primary 
        inline-flex items-center 
        bg-primary hover:bg-secondary focus:ring-4 focus:outline-none 
        rounded-lg text-center` +
        ' ' +
        additionalClasses
      }
      disabled={isDisabled}
      onClick={() => {
        onClicked()
      }}
    >
      {iconElement}
      {text ? text : ''}
    </button>
  )
}
