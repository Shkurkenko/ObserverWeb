import 'preact/debug'

import { Route } from 'wouter'
import { render } from 'preact'
import { LocationProvider } from 'preact-iso'
import { FastAlertsProvider } from './Context/FastAlertsContext.js'
import { ReoScan } from './Views/Pages/ReoScan'
import { ThemeTester } from './Views/Pages/ThemeTester'
import { SideNavigation } from './Components/Sidebar/SideNavigation/index.js'
import { ThemeProvider } from './Context/ThemeContext.js'
import { TypographyTester } from './Views/Pages/TypographyTester/index.js'
import { LayoutsExample } from '../Examples/Components/Layouts.example.js'

import TasksProvider from './Context/TasksContext.js'
import SidebarProvider from './Context/SidebarContext.js'
import AlertsProvider from './Context/AlertsContext.js'
import ScanViewProvider from './Context/ReoScanViewContext.js'

import './style.sass'

export function App() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <SidebarProvider>
          <FastAlertsProvider>
            <AlertsProvider>
              <ScanViewProvider>
                <LocationProvider>
                  {/* <Header /> */}
                  <main className='app-container h-screen w-screen flex'>
                    <SideNavigation />
                    <Route path='/'>
                      <ReoScan />
                      {/* <FastAlerts /> */}
                    </Route>
                    <Route path='/theme-tester' component={ThemeTester} />
                    <Route path='/typography-tester' component={TypographyTester} />
                    <Route path='/layout-tester' component={LayoutsExample}></Route>
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
