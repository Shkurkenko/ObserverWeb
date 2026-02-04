import type { Meta, StoryObj } from '@storybook/preact'
import { Flex } from '../../../Components/Layouts/Flex'
import { Box } from '../../../Components/Layouts/Box'

const meta: Meta<typeof Flex> = {
  title: 'Components/Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    direction: { control: 'select', options: ['row', 'col', 'row-reverse', 'col-reverse'] },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
    },
    align: { control: 'select', options: ['start', 'center', 'end', 'baseline', 'stretch'] },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    wrap: { control: 'select', options: [false, true, 'wrap', 'nowrap', 'wrap-reverse'] },
    inline: { control: 'boolean' },
  },
  args: { children: 'Flex content', direction: 'row' },
}
export default meta
type Story = StoryObj<typeof Flex>

const Item = ({ num }: { num: number }) => (
  <Box className='p-4 bg-blue-100 border border-blue-300 rounded-lg'>Item {num}</Box>
)

export const Default: Story = {
  render: (args) => (
    <Flex {...args}>
      <Item num={1} />
      <Item num={2} />
      <Item num={3} />
    </Flex>
  ),
}

export const Row: Story = {
  args: { direction: 'row' },
  render: (args) => (
    <Flex {...args} className='p-4 bg-gray-100 rounded-lg'>
      <Item num={1} />
      <Item num={2} />
      <Item num={3} />
    </Flex>
  ),
}

export const Column: Story = {
  args: { direction: 'col' },
  render: (args) => (
    <Flex {...args} className='p-4 bg-gray-100 rounded-lg'>
      <Item num={1} />
      <Item num={2} />
      <Item num={3} />
    </Flex>
  ),
}

export const JustifyCenter: Story = {
  args: { justify: 'center' },
  render: (args) => (
    <Flex {...args} className='p-4 bg-gray-100 rounded-lg w-full'>
      <Item num={1} />
      <Item num={2} />
      <Item num={3} />
    </Flex>
  ),
}

export const JustifyBetween: Story = {
  args: { justify: 'between' },
  render: (args) => (
    <Flex {...args} className='p-4 bg-gray-100 rounded-lg w-full'>
      <Item num={1} />
      <Item num={2} />
      <Item num={3} />
    </Flex>
  ),
}

export const AlignCenter: Story = {
  args: { align: 'center' },
  render: (args) => (
    <Flex {...args} className='p-4 bg-gray-100 rounded-lg h-32'>
      <Item num={1} />
      <Box className='p-6 bg-blue-200'>Tall</Box>
      <Item num={3} />
    </Flex>
  ),
}

export const GapVariants: Story = {
  render: () => (
    <div className='space-y-6'>
      <Flex gap='xs' className='p-4 bg-gray-50'>
        <Item num={1} />
        <Item num={2} />
        <Item num={3} />
      </Flex>
      <Flex gap='sm' className='p-4 bg-gray-50'>
        <Item num={1} />
        <Item num={2} />
        <Item num={3} />
      </Flex>
      <Flex gap='md' className='p-4 bg-gray-50'>
        <Item num={1} />
        <Item num={2} />
        <Item num={3} />
      </Flex>
      <Flex gap='lg' className='p-4 bg-gray-50'>
        <Item num={1} />
        <Item num={2} />
        <Item num={3} />
      </Flex>
      <Flex gap='xl' className='p-4 bg-gray-50'>
        <Item num={1} />
        <Item num={2} />
        <Item num={3} />
      </Flex>
    </div>
  ),
}

export const Wrap: Story = {
  args: { wrap: true },
  render: (args) => (
    <Flex {...args} className='p-4 bg-gray-100 rounded-lg w-64'>
      {Array.from({ length: 8 }).map((_, i) => (
        <Item key={i} num={i + 1} />
      ))}
    </Flex>
  ),
}

export const InlineFlex: Story = {
  args: { inline: true },
  render: (args: any) => (
    <div>
      Text before{' '}
      <Flex {...args} className='bg-gray-100 p-2'>
        <Item num={1} />
        <Item num={2} />
      </Flex>{' '}
      Text after
    </div>
  ),
}

export const ReverseRow: Story = {
  args: { direction: 'row-reverse' },
  render: (args) => (
    <Flex {...args} className='p-4 bg-gray-100 rounded-lg'>
      <Item num={1} />
      <Item num={2} />
      <Item num={3} />
    </Flex>
  ),
}

export const ReverseColumn: Story = {
  args: { direction: 'col-reverse' },
  render: (args) => (
    <Flex {...args} className='p-4 bg-gray-100 rounded-lg h-48'>
      <Item num={1} />
      <Item num={2} />
      <Item num={3} />
    </Flex>
  ),
}
