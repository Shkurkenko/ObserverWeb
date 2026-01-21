import { EventEmitter } from 'events'
import { IRawScanMessage, IParsedScanMessage } from '.'
import { ScanReoDataParser } from './ReoParser'
import { ReoSpace } from '../../Shared/Interfaces/Reo.interface'
import { THEMES_REGISTRY_OUTPUT_FILE_PATH } from '../../../Config/Global.config'

export interface IScanClientConfig {
  host: string

  port: number

  autoReconnect?: boolean

  reconnectInterval?: number

  maxReconnectAttempts?: number
}

export class ScanClient extends EventEmitter {
  private socket: WebSocket | null = null

  private isConnected = false

  private reconnectAttemts = 0

  private reconnectTimer: NodeJS.Timeout | null = null

  private activeScanTypes: ReoSpace.IScanTypes[] = []

  constructor(private config: IScanClientConfig) {
    super()
    this.config = {
      autoReconnect: true,
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      ...config,
    }
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve()
        return
      }

      try {
        const url = `ws://${this.config.host}:${this.config.port}`
        this.socket = new WebSocket(url)

        this.socket.onopen = () => {
          console.log('✅ Connected to scan device')
          this.isConnected = true
          this.reconnectAttemts = 0
          this.emit('connected')
          resolve()
        }

        this.socket.onmessage = (event) => {
          try {
            const rawMessage: IRawScanMessage = JSON.parse(event.data)
            this.emit('rawData', rawMessage)

            try {
              const parsedMessage = ScanReoDataParser.parseMessage(rawMessage)
              this.emit('data', parsedMessage)
            } catch (parseError) {
              console.error('Parse error: ', parseError)
            }
          } catch (error) {
            console.error('Invalid JSON: ', event.data)
          }
        }

        this.socket.onerror = (event) => {
          const error = new Error(`WebSocket error: ${event.type}`)
          this.emit('error', error)
          reject(error)
        }

        this.socket.onclose = (event) => {
          console.log('❌ Disconnected from device')
          this.isConnected = false
          this.socket = null
          this.emit('disconnected')

          if (this.config.autoReconnect) {
            this.scheduleReconnect()
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  public async startScanning(types: ReoSpace.IScanTypes[]): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to device')
    }

    const newTypes = types.filter((type) => !this.activeScanTypes.includes(type))
    if (newTypes.length === 0) return

    await this.sendCommand('start', { types: newTypes })
    this.activeScanTypes = [...this.activeScanTypes, ...newTypes]
  }

  public async stopScanning(types?: ReoSpace.IScanTypes[]): Promise<void> {
    if (!this.isConnected) return

    const typesToStop = types || this.activeScanTypes
    if (typesToStop.length === 0) return

    await this.sendCommand('stop', { types: typesToStop })

    if (types) {
      this.activeScanTypes = this.activeScanTypes.filter((type) => !types.includes(type))
    } else {
      this.activeScanTypes = []
    }
  }

  private async sendCommand(command: string, data?: any): Promise<void> {
    if (!this.socket) throw new Error('Not connected')

    const message = { command, ...data }
    this.socket.send(JSON.stringify(message))
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttemts >= (this.config.maxReconnectAttempts || 10)) {
      console.error('Max reconection attemts reached')
      return
    }

    this.reconnectAttemts++
    const delay = this.config.reconnectInterval || 5000

    this.reconnectTimer = setTimeout(() => {
      this.connect().catch(() => this.scheduleReconnect)
    }, delay)
  }

  public disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    if (this.socket) {
      this.socket.close()
      this.socket = null
    }

    this.isConnected = false
  }

  public getIsConnected(): boolean {
    return this.isConnected
  }

  public getActiveScanTypes(): ReoSpace.IScanTypes[] {
    return [...this.activeScanTypes]
  }
}
