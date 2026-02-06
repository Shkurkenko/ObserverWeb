import { useState } from 'preact/hooks'
import { ComponentChildren } from 'preact'
import { Box } from '../../Layouts/Box'
import { Flex } from '../../Layouts/Flex'
import { Icon, Text } from '../../Typography'
import { CSSProperties } from 'preact'
import { Button } from '../../Button'
import { cn } from '../../../Utils/Helpers'

export interface IAccordionItemData {
  id: string | number

  title: string

  content: ComponentChildren

  disabled?: boolean

  icon?: ComponentChildren
}

export interface IAccordionToggleEvent {
  id: number | string

  isOpen: boolean

  item: IAccordionItemData

  event?: MouseEvent | KeyboardEvent
}

export interface IAccordionProps {
  items: IAccordionItemData[]

  allowMultiple?: boolean

  defaultOpen?: (string | number)[]

  className?: string

  style?: CSSProperties

  onToggle?: (event: IAccordionToggleEvent) => void

  onOpen?: (id: string | number) => void

  onClose?: (id: string | number) => void
}

export interface IAccordionItemProps {
  item: IAccordionItemData

  isExpanded: boolean

  onToggle: (id: string | number, event?: MouseEvent | KeyboardEvent) => void

  className?: string

  style?: CSSProperties
}

export const AccordionItem = ({ item, isExpanded, onToggle, className }: IAccordionItemProps) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    if (!item.disabled) onToggle(item.id, e)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !item.disabled) {
      e.preventDefault()
      onToggle(item.id, e)
    }
  }

  return (
    <Box
      className={cn(
        `bg-surface-container overflow-hidden transition-all duration-300`,
        item.disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {/* 
        Accordion title 
      */}
      <Flex justify='start' align='start' className='cursor-pointer w-full h-full'>
        <Button
          variant='text'
          type='button'
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          disabled={item.disabled}
          className={cn(
            'w-full h-full p-6',
            'cursor-pointer rounded-none justify-between',
            `${isExpanded && 'bg-surface-container-high'}`,
          )}
          aria-expanded={isExpanded}
          aira-controls={`accordion-content-${item.id}`}
          aria-disabled={item.disabled}
        >
          <Flex justify='between' align='center'>
            {item.icon && <Icon>{item.icon}</Icon>}
            <Text variant='body1' bold className='text-left'>
              {item.title}
            </Text>
          </Flex>
          <Icon
            className={cn(
              'transform transition-transform duration-300',
              `${isExpanded ? 'rotate-90' : 'rotate-0'}`,
            )}
          >
            <svg
              class='w-4 h-4 text-on-background ml-5'
              aria-hidden='true'
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
                d='m9 5 7 7-7 7'
              />
            </svg>
          </Icon>
        </Button>
      </Flex>

      {/* Accordion item Content */}
      <Box
        id={`accordion-content-${item.id}`}
        className={cn(
          `px-6 overflow-hidden transition-all duration-300 bg-surface-container-low`,
          `${isExpanded ? 'max-h-250 opacity-100 pb-6' : 'max-h-0 opacity-0'}`,
        )}
        aria-hidden={!isExpanded}
      >
        {item.content}
      </Box>
    </Box>
  )
}

export const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  style,
  onToggle,
  onOpen,
  onClose,
}: IAccordionProps) => {
  const [openItems, setOpenItems] = useState<(string | number)[]>(defaultOpen)

  const handleItemToggle = (id: string | number, event?: MouseEvent | KeyboardEvent) => {
    const item = items.find((i) => i.id === id)
    if (!item || item.disabled) return

    const wasOpen = openItems.includes(id)
    const willBeOpen = !wasOpen

    setOpenItems((prev) => {
      if (allowMultiple) {
        return wasOpen ? prev.filter((itemId) => itemId !== id) : [...prev, id]
      } else {
        return wasOpen ? [] : [id]
      }
    })

    const toggleEvent: IAccordionToggleEvent = {
      id,
      isOpen: willBeOpen,
      item,
      event,
    }

    onToggle?.(toggleEvent)
    if (willBeOpen) {
      onOpen?.(id)
    } else {
      onClose?.(id)
    }
  }

  return (
    <Flex direction='col' gap='lg' align='center' justify='center' className='w-full'>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          isExpanded={openItems.includes(item.id)}
          item={item}
          onToggle={handleItemToggle}
        />
      ))}
    </Flex>
  )
}
