import 'preact/debug'

import { Route } from 'wouter'
import { render } from 'preact'
import { LocationProvider } from 'preact-iso'
import { ThemeProvider } from '@Context/ThemeContext'
import { TasksProvider } from '@Context/TasksContext'
import { SidebarProvider } from '@Context/SidebarContext'
import { AlertsProvider } from '@Components/Alerts'
import { ScanViewProvider } from '@Context/ReoScanViewContext'
import { ToastChannel } from '@Components/Toasts'
import { SideNavigation } from '@Components/Sidebar/SideNavigation'
import { ReoScan } from './Views/Pages/ReoScan'
import { ThemeTester } from './Views/Pages/ThemeTester'
import { TypographyTester } from './Views/Pages/TypographyTester'
import { TcpScanTester } from './Views/Pages/TcpScanTeseter'
import { UseInitTheme } from '@Hooks/UseInitTheme'

import { invoke } from '@tauri-apps/api/core'

import './style.sass'

export function App() {
  UseInitTheme()

  invoke('greet', { name: 'andrew' }).then((response) => alert(response))

  return (
    <ThemeProvider>
      <TasksProvider>
        <SidebarProvider>
          {/* NEW: Toast provider with positioning */}
          <ToastChannel position='bottom-right' maxToasts={5} portalId='toast-portal'>
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
                      {/* <Route path='/tabs-tester'>
                        <TabsExamplePage />
                      </Route>
                      <Route path='/rf-scan-tester'>
                        <ForensicTester />
                      </Route> */}
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
          </ToastChannel>
        </SidebarProvider>
      </TasksProvider>
    </ThemeProvider>
  )
}

render(<App />, document.getElementById('app') as HTMLDivElement)
