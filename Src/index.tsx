import 'preact/debug'

import { Route } from 'wouter'
import { render } from 'preact'
import { LocationProvider, Router } from 'preact-iso'

import TasksProvider from './Context/TasksContext.js'
import SidebarProvider from './Context/SidebarContext.js'
import AlertsProvider from './Context/AlertsContext.js'
import ScanViewProvider from './Context/ReoScanViewContext.js'
import { FastAlertsProvider } from './Context/FastAlertsContext.js'
import { ReoScan } from './Views/Pages/ReoScan'
import { ThemeTester } from './Views/Pages/ThemeTester'
import { SideNavigation } from './Components/Sidebar/SideNavigation/index.js'
import { FastAlerts } from './Components/FastAlerts/index.js'
import { NotFound } from './Views/_404.js'
import { ThemeProvider, useTheme } from './Context/ThemeContext.js'

import './style.sass'

export function App() {
  // const [setThemeVariant, theme, variant] = useTheme()

  return (
    <ThemeProvider>
      <TasksProvider>
        <SidebarProvider>
          <FastAlertsProvider>
            <AlertsProvider>
              <ScanViewProvider>
                <LocationProvider>
                  {/* <Header /> */}
                  <main className='app-container w-full flex'>
                    <SideNavigation />
                    <Route path='/'>
                      <ReoScan />
                      {/* <FastAlerts /> */}
                    </Route>
                    <Route path='/theme-tester' component={ThemeTester} />
                    {/* <Route component={NotFound} /> */}
                  </main>
                </LocationProvider>
              </ScanViewProvider>
            </AlertsProvider>
          </FastAlertsProvider>
        </SidebarProvider>
      </TasksProvider>
    </ThemeProvider>
  )
}

render(<App />, document.getElementById('app') as HTMLDivElement)
