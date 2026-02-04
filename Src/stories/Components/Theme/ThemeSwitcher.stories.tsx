import { ThemeSwitcher } from '../../../Components/Theme/ThemeSwitcher'

export default {
  title: 'Test/Theme Switching',
  parameters: {
    layout: 'fullscreen',
  },
}

export const ThemeSwitcherDemo = () => (
  <div className='p-8'>
    <ThemeSwitcher />
    <div className='mt-20 p-8 bg-surface-container rounded-2xl'>
      <h1 className='text-3xl font-bold mb-4 text-on-surface'>Theme Testing Area</h1>
      <p className='text-on-surface-variant mb-6'>
        Use the theme switcher in the top-right corner to test different themes and variants.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='p-6 bg-primary rounded-xl'>
          <h3 className='text-xl font-bold text-on-primary'>Primary Color</h3>
          <p className='text-on-primary/90'>Should change with theme</p>
        </div>

        <div className='p-6 bg-secondary rounded-xl'>
          <h3 className='text-xl font-bold text-on-secondary'>Secondary Color</h3>
          <p className='text-on-secondary/90'>Should change with theme</p>
        </div>

        <div className='p-6 bg-tertiary rounded-xl'>
          <h3 className='text-xl font-bold text-on-tertiary'>Tertiary Color</h3>
          <p className='text-on-tertiary/90'>Should change with theme</p>
        </div>
      </div>
    </div>
  </div>
)
