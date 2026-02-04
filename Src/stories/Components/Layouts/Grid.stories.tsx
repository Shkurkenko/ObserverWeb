import type { Meta, StoryObj } from '@storybook/preact'
import { Grid } from '../../../Components/Layouts/Grid'
import { Box } from '../../../Components/Layouts/Box'

const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    columns: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    sm: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    md: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    lg: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    xl: { control: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
  },
  args: { columns: 3 },
}
export default meta
type Story = StoryObj<typeof Grid>

const GridItem = ({ num }: { num: number }) => (
  <Box className='p-6 bg-blue-100 border border-blue-300 rounded-lg text-center'>Item {num}</Box>
)

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }).map((_, i) => (
        <GridItem key={i} num={i + 1} />
      ))}
    </Grid>
  ),
}

export const Columns1: Story = {
  args: { columns: 1 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 3 }).map((_, i) => (
        <GridItem key={i} num={i + 1} />
      ))}
    </Grid>
  ),
}

export const Columns2: Story = {
  args: { columns: 2 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 4 }).map((_, i) => (
        <GridItem key={i} num={i + 1} />
      ))}
    </Grid>
  ),
}

export const Columns3: Story = {
  args: { columns: 3 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }).map((_, i) => (
        <GridItem key={i} num={i + 1} />
      ))}
    </Grid>
  ),
}

export const Columns4: Story = {
  args: { columns: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }).map((_, i) => (
        <GridItem key={i} num={i + 1} />
      ))}
    </Grid>
  ),
}

export const Responsive: Story = {
  args: {
    columns: 1,
    sm: 2,
    md: 3,
    lg: 4,
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 12 }).map((_, i) => (
        <GridItem key={i} num={i + 1} />
      ))}
    </Grid>
  ),
}

export const GapVariants: Story = {
  render: () => (
    <div className='space-y-6'>
      <Grid columns={3} gap='xs'>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridItem key={i} num={i + 1} />
        ))}
      </Grid>
      <Grid columns={3} gap='sm'>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridItem key={i} num={i + 1} />
        ))}
      </Grid>
      <Grid columns={3} gap='md'>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridItem key={i} num={i + 1} />
        ))}
      </Grid>
      <Grid columns={3} gap='lg'>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridItem key={i} num={i + 1} />
        ))}
      </Grid>
      <Grid columns={3} gap='xl'>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridItem key={i} num={i + 1} />
        ))}
      </Grid>
    </div>
  ),
}

export const AutoGrid: Story = {
  render: () => (
    <Grid columns={12} gap='md' className='w-full'>
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={i}
          className={`p-4 bg-blue-100 rounded-lg text-center col-span-${Math.floor(Math.random() * 4) + 1}`}
        >
          Span {Math.floor(Math.random() * 4) + 1}
        </Box>
      ))}
    </Grid>
  ),
}

export const ComplexLayout: Story = {
  render: () => (
    <Grid columns={12} gap='md' className='w-full'>
      <Box className='col-span-12 p-6 bg-blue-100 rounded-lg text-center'>Header (col-span-12)</Box>
      <Box className='col-span-3 p-6 bg-green-100 rounded-lg text-center'>Sidebar (col-span-3)</Box>
      <Box className='col-span-6 p-6 bg-yellow-100 rounded-lg text-center'>Main (col-span-6)</Box>
      <Box className='col-span-3 p-6 bg-purple-100 rounded-lg text-center'>Aside (col-span-3)</Box>
      <Box className='col-span-12 p-6 bg-red-100 rounded-lg text-center'>Footer (col-span-12)</Box>
    </Grid>
  ),
}
