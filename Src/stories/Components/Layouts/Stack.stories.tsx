import type { Meta, StoryObj } from '@storybook/preact'
import { Stack } from '../../../Components/Layouts/Stack'
import { Box } from '../../../Components/Layouts/Box'
import { Grid } from '../../../Components/Layouts/Grid'
import { Divider, Heading } from '../../../Components/Typography'
import { Caption } from '../../../Components/Typography'
import { Button } from '../../../Components/Button'
import { Label } from '../../../Components/Typography'
import { TextInput } from '../../../Components/Form/TextInput'

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    spacing: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
  },
  args: { direction: 'vertical' },
}
export default meta
type Story = StoryObj<typeof Stack>

const StackItem = ({ num }: { num: number }) => (
  <Box className='px-20 py-10 bg-surface-container-high border border-primary text-on-surface-variant rounded-lg'>
    Item {num}
  </Box>
)

export const Default: Story = {
  render: (args) => (
    <>
      <Heading level={2}>Default Stack</Heading>
      <Divider className='mt-6 mb-6' />
      <Stack {...args} spacing='lg'>
        <StackItem num={1} />
        <StackItem num={2} />
        <StackItem num={3} />
      </Stack>
    </>
  ),
}

export const Vertical: Story = {
  args: { direction: 'vertical' },
  render: (args) => (
    <>
      <Heading level={2}>Vertical Stack</Heading>
      <Divider className='mt-6 mb-6' />
      <Stack {...args} className='p-4 bg-surface-container rounded-lg'>
        <StackItem num={1} />
        <StackItem num={2} />
        <StackItem num={3} />
      </Stack>
    </>
  ),
}

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
  render: (args) => (
    <>
      <Heading level={2}>Horizontal Stack</Heading>
      <Divider className='mt-6 mb-6' />
      <Stack {...args} className='p-4 bg-surface-container rounded-lg'>
        <StackItem num={1} />
        <StackItem num={2} />
        <StackItem num={3} />
      </Stack>
    </>
  ),
}

export const SpacingVariants: Story = {
  render: () => (
    <>
      <Heading level={2}>Stack Spacing Variants</Heading>
      <Divider className='mt-6 mb-6' />
      <Grid columns={3} gap='lg'>
        <Stack spacing='xs' className='p-4 bg-surface-container'>
          <Caption variant='large' className='mb-3'>
            Xs
          </Caption>
          <StackItem num={1} />
          <StackItem num={2} />
          <StackItem num={3} />
        </Stack>
        <Stack spacing='sm' className='p-4 bg-surface-container'>
          <Caption variant='large' className='mb-3'>
            Sm
          </Caption>
          <StackItem num={1} />
          <StackItem num={2} />
          <StackItem num={3} />
        </Stack>
        <Stack spacing='md' className='p-4 bg-surface-container'>
          <Caption variant='large' className='mb-3'>
            Md
          </Caption>
          <StackItem num={1} />
          <StackItem num={2} />
          <StackItem num={3} />
        </Stack>
        <Stack spacing='lg' className='p-4 bg-surface-container'>
          <Caption variant='large' className='mb-3'>
            Lg
          </Caption>
          <StackItem num={1} />
          <StackItem num={2} />
          <StackItem num={3} />
        </Stack>
        <Stack spacing='xl' className='p-4 bg-surface-container'>
          <Caption variant='large' className='mb-3'>
            Xl
          </Caption>
          <StackItem num={1} />
          <StackItem num={2} />
          <StackItem num={3} />
        </Stack>
      </Grid>
    </>
  ),
}

export const AlignStart: Story = {
  args: { align: 'start' },
  render: (args) => (
    <>
      <Heading level={2}>Align Start</Heading>
      <Divider className='mt-6 mb-6' />

      <Stack {...args} direction='horizontal' className='p-4 bg-surface-container rounded-lg h-32'>
        <StackItem num={1} />
        <Box className='p-6 bg-surface-container-highest'>Tall</Box>
        <StackItem num={3} />
      </Stack>
    </>
  ),
}

export const AlignCenter: Story = {
  args: { align: 'center' },
  render: (args) => (
    <>
      <Heading level={2}>Align Center</Heading>
      <Divider className='mt-6 mb-6' />

      <Stack {...args} direction='horizontal' className='p-4 bg-surface-container rounded-lg h-32'>
        <StackItem num={1} />
        <Box className='p-6 bg-surface-container-highest'>Tall</Box>
        <StackItem num={3} />
      </Stack>
    </>
  ),
}

export const AlignEnd: Story = {
  args: { align: 'end' },
  render: (args) => (
    <>
      <Heading level={2}>Align End</Heading>
      <Divider className='mt-6 mb-6' />

      <Stack {...args} direction='horizontal' className='p-4 bg-surface-container rounded-lg h-32'>
        <StackItem num={1} />
        <Box className='p-6 bg-surface-container-highest'>Tall</Box>
        <StackItem num={3} />
      </Stack>
    </>
  ),
}

export const AlignStretch: Story = {
  args: { align: 'stretch' },
  render: (args) => (
    <>
      <Heading level={2}>Align Stretch</Heading>
      <Divider className='mt-6 mb-6' />

      <Stack {...args} direction='horizontal' className='p-4 bg-surface-container rounded-lg h-32'>
        <StackItem num={1} />
        <Box className='p-6 bg-surface-container-highest'>Tall</Box>
        <StackItem num={3} />
      </Stack>
    </>
  ),
}

export const FormLayout: Story = {
  render: () => (
    <Stack spacing='md' className='w-80'>
      <Box>
        <Heading level={3}>Form layout</Heading>
      </Box>
      <Divider />
      <Box className='space-y-2'>
        <Label size='lg' htmlFor='email' className='mb-2'>
          Email
        </Label>
        <TextInput name='email' value='' type='email' placeholder='Enter email' required />
      </Box>
      <Box className='space-y-2'>
        <Label size='lg' htmlFor='password' className='mb-2'>
          Email
        </Label>
        <TextInput
          name='password'
          value=''
          type='password'
          placeholder='Enter password'
          required
        ></TextInput>
      </Box>
      <Divider />
      <Button size='lg' variant='primary'>
        Sign In
      </Button>
    </Stack>
  ),
}
