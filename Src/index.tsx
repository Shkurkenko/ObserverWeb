import 'preact/debug'

import { Route } from 'wouter'
import { render } from 'preact'
import { LocationProvider } from 'preact-iso'

// Context Providers
import { ThemeProvider } from './Context/ThemeContext'
import { TasksProvider } from './Context/TasksContext'
import { SidebarProvider } from './Context/SidebarContext'
import { FastAlertsProvider } from './Context/FastAlertsContext'
import { AlertsProvider } from './Context/AlertsContext'
import { ScanViewProvider } from './Context/ReoScanViewContext'

// Components
import { SideNavigation } from './Components/Sidebar/SideNavigation'

// Pages
import { ReoScan } from './Views/Pages/ReoScan'
import { ThemeTester } from './Views/Pages/ThemeTester'
import { TypographyTester } from './Views/Pages/TypographyTester'
import { TabsExamplePage } from './Views/Pages/TabsExamplePage'
import { ForensicTester } from './Views/Pages/ForensicTester'
import { TcpScanTester } from './Views/Pages/TcpScanTeseter'
import { UseInitTheme } from './Hooks/UseInitTheme'

import { invoke } from '@tauri-apps/api'

import './style.sass'

export function App() {
  UseInitTheme()

  invoke('greet', { name: 'andrew' }).then((response) => alert(response))

  return (
    <ThemeProvider>
      <TasksProvider>
        <SidebarProvider>
          <FastAlertsProvider>
            <AlertsProvider>
              <ScanViewProvider>
                <LocationProvider>
                  <main className='app-container h-screen w-screen flex'>
                    <SideNavigation />
                    <div className='flex-1 overflow-auto'>
                      <Route path='/'>
                        <ReoScan />
                      </Route>
                      <Route path='/theme-tester'>
                        <ThemeTester />
                      </Route>
                      <Route path='/typography-tester'>
                        <TypographyTester />
                      </Route>
                      <Route path='/tabs-tester'>
                        <TabsExamplePage />
                      </Route>
                      <Route path='/rf-scan-tester'>
                        <ForensicTester />
                      </Route>
                      <Route path='/tcp-scan-tester'>
                        <TcpScanTester />
                      </Route>
                      {/* <Route path='/rf-scanner'>
                        <RfScannerFinal />
                      </Route> */}
                    </div>
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
