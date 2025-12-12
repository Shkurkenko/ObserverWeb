import 'preact/debug'
import { render } from 'preact'
import { LocationProvider, Router, Route } from 'preact-iso'

import TasksProvider from './Context/TasksContext.js'
import SidebarProvider from './Context/SidebarContext.js'
import AlertsProvider from './Context/AlertsContext.js'
import ScanViewProvider from './Context/ReoScanViewContext.js'
import { FastAlertsProvider } from './Context/FastAlertsContext.js'

import { NotFound } from './Views/_404.js'
import { ReoScan } from './Views/Pages/ReoScan'
import { ThemeTester } from './Views/Pages/ThemeTester'

import './style.sass'

export function App() {
  return (
    <TasksProvider>
      <SidebarProvider>
        <FastAlertsProvider>
          <AlertsProvider>
            <ScanViewProvider>
              <LocationProvider>
                {/* <Header /> */}
                <main className='app-container w-full flex'>
                  <Router>
                    <Route path='/' component={ReoScan} />
                    <Route path='/theme-tester' component={ThemeTester} />
                    <Route default component={NotFound} />
                  </Router>
                </main>
              </LocationProvider>
            </ScanViewProvider>
          </AlertsProvider>
        </FastAlertsProvider>
      </SidebarProvider>
    </TasksProvider>
  )
}

render(<App />, document.getElementById('app') as HTMLDivElement)
