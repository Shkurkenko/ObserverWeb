import type { Meta, StoryObj } from '@storybook/preact'
import { Container } from '../../../Components/Layouts/Container'
import { Flex } from '../../../Components/Layouts/Flex'
import { Heading } from '../../../Components/Typography'
import { Divider } from '../../../Components/Typography'

const meta: Meta<typeof Container> = {
  title: 'Components/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full', 'fluid'] },
    padding: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    centered: { control: 'boolean' },
    fullHeight: { control: 'boolean' },
  },
  args: {
    size: 'fluid',
    className: 'bg-surface-container',
    children: <Heading level={2}>Default Container</Heading>,
  },
}
export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: 'sm',
    className: 'bg-surface-container',
    children: <Heading level={2}>Small container (max-width: 640px)</Heading>,
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    className: 'bg-surface-container',
    children: <Heading level={2}>Medium container (max-width: 768px)</Heading>,
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    className: 'bg-surface-container',
    children: <Heading level={2}>Large container (max-width: 1024px)</Heading>,
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    className: 'bg-surface-container',
    children: <Heading level={2}>Extra large container (max-width: 1280px)</Heading>,
  },
}

export const Full: Story = {
  args: {
    size: 'full',
    className: 'bg-surface-container',
    children: <Heading level={2}>Full width container</Heading>,
  },
}

export const Fluid: Story = {
  args: {
    size: 'fluid',
    className: 'bg-surface-container',
    children: <Heading level={2}>Fluid container (max-width: 1536px)</Heading>,
  },
}

export const PaddingVariants: Story = {
  render: () => (
    <Container
      size='lg'
      padding='lg'
      centered={true}
      fullHeight={true}
      className='bg-surface-container-high'
    >
      <Heading level={2}>Padding variants</Heading>
      <Divider className='mt-6 mb-6' />
      <Flex direction='col' gap='lg' className='w-full h-full'>
        <Container size='md' padding='xs' className='bg-surface-container'>
          <Heading level={4}>XS padding</Heading>
        </Container>
        <Container size='md' padding='sm' className='bg-surface-container'>
          <Heading level={4}>SM padding</Heading>
        </Container>
        <Container size='md' padding='md' className='bg-surface-container'>
          <Heading level={4}>MD padding</Heading>
        </Container>
        <Container size='md' padding='lg' className='bg-surface-container'>
          <Heading level={4}>LG padding</Heading>
        </Container>
        <Container size='md' padding='xl' className='bg-surface-container'>
          <Heading level={4}>XL padding</Heading>
        </Container>
      </Flex>
    </Container>
  ),
}

export const CustomPadding: Story = {
  args: {
    padding: { x: 'px-8', y: 'py-12' },
    className: 'bg-surface-container text-on-surface-variant',
    children: <Heading level={2}>Custom page example</Heading>,
  },
}

export const FullHeight: Story = {
  args: {
    fullHeight: true,
    className: 'bg-surface-container text-on-surface-vairant',
    children: <Heading level={2}>Full height container</Heading>,
  },
}

export const NotCentered: Story = {
  args: {
    centered: false,
    className: 'bg-surface-container',
    children: <Heading level={2}>Not centered container</Heading>,
  },
}
