import type { Meta, StoryObj } from '@storybook/preact'
import { Card } from '../../../Components/Layouts/Card'
import { Button } from '../../../Components/Button'
import { Text } from '../../../Components/Typography'

const meta: Meta<typeof Card> = {
  title: 'Components/Layout/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    variant: { control: 'select', options: ['default', 'elevated', 'filled', 'outlined'] },
    accent: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'error', 'none'] },
    compact: { control: 'boolean' },
    outlined: { control: 'boolean' },
  },
  args: {
    title: 'Card Title',
    children: 'Card content goes here',
  },
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Elevated Card',
    children: 'This card has elevation and hover effects',
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    title: 'Filled Card',
    children: 'This card has a filled background',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    title: 'Outlined Card',
    children: 'This card has an outline border',
  },
}

export const WithSubtitle: Story = {
  args: {
    title: 'Card with Subtitle',
    subtitle: 'Additional descriptive text',
    children: 'Main content area',
  },
}

export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    subtitle: 'Actions are displayed in the header',
    actions: (
      <>
        <Button size='sm' variant='outline'>
          Edit
        </Button>
        <Button size='sm'>Save</Button>
      </>
    ),
    children: 'Content with action buttons in header',
  },
}

export const WithHeaderSlot: Story = {
  args: {
    header: (
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='font-bold text-lg'>Custom Header</h3>
          <p className='text-sm text-gray-600'>Custom header content</p>
        </div>
        <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>Badge</span>
      </div>
    ),
    children: 'Card with custom header slot',
  },
}

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: 'Main content goes here',
    footer: (
      <div className='flex justify-between items-center'>
        <span className='text-sm text-gray-500'>Last updated: Today</span>
        <button className='text-blue-600 hover:text-blue-800 text-sm'>View Details →</button>
      </div>
    ),
  },
}

export const Compact: Story = {
  args: {
    compact: true,
    title: 'Compact Card',
    subtitle: 'Less padding for dense layouts',
    children: 'This card has reduced padding',
  },
}

export const AccentPrimary: Story = {
  args: {
    accent: 'primary',
    title: 'Primary Accent Card',
    children: 'Card with primary color accent at the top',
  },
}

export const AccentSecondary: Story = {
  args: {
    accent: 'secondary',
    title: 'Secondary Accent Card',
    children: 'Card with secondary color accent',
  },
}

export const AccentError: Story = {
  args: {
    accent: 'error',
    title: 'Error Accent Card',
    children: 'Card with error color accent for warnings',
  },
}

export const InteractiveCard: Story = {
  args: {
    variant: 'elevated',
    title: 'Interactive Card',
    children: 'Hover over this card to see elevation and transform effects',
    className: 'cursor-pointer',
  },
}

export const ComplexContent: Story = {
  render: () => (
    <Card
      title='User Profile'
      subtitle='Complete profile information'
      variant='elevated'
      className='max-w-md'
    >
      <div className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
            <span className='text-2xl font-bold text-blue-600'>JD</span>
          </div>
          <div>
            <h4 className='font-bold text-lg'>John Doe</h4>
            <p className='text-gray-600'>Software Developer</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Text variant='body2' color='secondary'>
              Email
            </Text>
            <Text>john.doe@example.com</Text>
          </div>
          <div>
            <Text variant='body2' color='secondary'>
              Phone
            </Text>
            <Text>+1 (555) 123-4567</Text>
          </div>
        </div>

        <div>
          <Text variant='body2' color='secondary'>
            Bio
          </Text>
          <Text>Passionate developer with 5+ years of experience in frontend technologies.</Text>
        </div>
      </div>
    </Card>
  ),
}

export const CardGrid: Story = {
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      <Card
        title='Basic Plan'
        subtitle='For individuals'
        variant='outlined'
        footer={
          <button className='w-full py-2 bg-gray-100 hover:bg-gray-200 rounded'>Select Plan</button>
        }
      >
        <div className='text-center py-4'>
          <div className='text-3xl font-bold mb-2'>
            $9<span className='text-lg text-gray-500'>/month</span>
          </div>
          <ul className='text-left space-y-2'>
            <li>✓ 1 User</li>
            <li>✓ 5 Projects</li>
            <li>✓ Basic Support</li>
          </ul>
        </div>
      </Card>

      <Card
        title='Pro Plan'
        subtitle='For teams'
        variant='elevated'
        accent='primary'
        footer={
          <button className='w-full py-2 bg-blue-500 text-white hover:bg-blue-600 rounded'>
            Select Plan
          </button>
        }
      >
        <div className='text-center py-4'>
          <div className='text-3xl font-bold mb-2'>
            $29<span className='text-lg text-gray-500'>/month</span>
          </div>
          <ul className='text-left space-y-2'>
            <li>✓ 10 Users</li>
            <li>✓ Unlimited Projects</li>
            <li>✓ Priority Support</li>
            <li>✓ Advanced Analytics</li>
          </ul>
        </div>
      </Card>

      <Card
        title='Enterprise'
        subtitle='For organizations'
        variant='filled'
        footer={
          <button className='w-full py-2 bg-gray-800 text-white hover:bg-black rounded'>
            Contact Sales
          </button>
        }
      >
        <div className='text-center py-4'>
          <div className='text-3xl font-bold mb-2'>Custom</div>
          <ul className='text-left space-y-2'>
            <li>✓ Unlimited Users</li>
            <li>✓ Custom Solutions</li>
            <li>✓ 24/7 Support</li>
            <li>✓ SLA Guarantee</li>
            <li>✓ Dedicated Manager</li>
          </ul>
        </div>
      </Card>
    </div>
  ),
}
