import { ThemeSwitcher } from '../../../Components/Theme/ThemeSwitcher'

import './style.sass'

export function ThemeTester() {
  return (
    <div class='home flex-col items-center w-full'>
      <div class='min-h-screen bg-background text-on-background p-8'>
        <ThemeSwitcher />

        <div class='max-w-2xl mx-auto mt-20'>
          <h1 class='text-5xl font-bold text-on-background mb-6'>Forensic UI — Material</h1>

          <div class='space-y-4'>
            <button class='bg-primary text-on-primary mr-5 px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition'>
              Primary Button
            </button>

            <button class='bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full text-lg font-medium'>
              Secondary Container
            </button>

            <div class='bg-surface-container p-6 rounded-3xl'>
              <p class='text-on-surface-variant'>
                Этот текст на surface-container с on-surface-variant
              </p>
              <p class='text-outline'>А это outline — отлично видно границы</p>
            </div>

            <div class='bg-error-container text-on-error-container p-6 rounded-3xl'>
              Error container — для уведомлений
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
