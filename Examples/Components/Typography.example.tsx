import { Text, Heading, Caption, Label, Icon, Divider } from '../../Src/Components/Typography/index'

export const TypographyExample = () => {
  return (
    <div className='p-10 leading-3'>
      <Heading level={1}>Header 1</Heading>
      <Heading level={2}>Header 2</Heading>
      <Heading level={3}>Header 3</Heading>
      <Heading level={4}>Header 4</Heading>
      <Heading level={5}>Header 5</Heading>
      <Heading level={6}>Header 6</Heading>

      <Divider label='Divider' />

      <Text variant='body1' color='primary'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente perferendis quam ducimus
        voluptatem quas quidem temporibus possimus sint incidunt pariatur nobis repudiandae nulla
        eos magnam, harum expedita! Possimus autem vero error a consequatur repellendus architecto
        nulla expedita corporis quos adipisci beatae assumenda odit obcaecati fugiat ratione
        quaerat, maxime officiis blanditiis?
      </Text>

      <Label htmlFor='input' required>
        Email
      </Label>

      <Caption variant='small' color='secondary'>
        Subscribe for input field
      </Caption>

      <Icon size='lg' color='text-blue-500'>
        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M12 16L12 8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
          <path
            d='M9 13L11.913 15.913V15.913C11.961 15.961 12.039 15.961 12.087 15.913V15.913L15 13'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M3 15L3 16L3 19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19L21 16L21 15'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </Icon>
    </div>
  )
}
