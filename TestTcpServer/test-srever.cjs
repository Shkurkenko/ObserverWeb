const net = require('net')
const { WebSocketServer } = require('ws')

// Конфигурация
const TCP_PORT = 8888
const WS_PORT = 8889
const SCAN_TYPES = ['GSM', 'LTE', 'UMTS', 'WIFI', 'BLUETOOTH']

// Хранение состояния
let activeScans = new Set()
let clientIdCounter = 0

// ========== TCP сервер для эмуляции сканирующего устройства ==========
const tcpServer = net.createServer((socket) => {
  const clientId = ++clientIdCounter
  console.log(
    `📡 TCP Client ${clientId} connected from ${socket.remoteAddress}:${socket.remotePort}`,
  )

  // Отправляем приветственное сообщение
  const welcomeMsg = JSON.stringify({
    type: 'connection',
    status: 'connected',
    timestamp: Date.now(),
    message: 'Scan Device Emulator v1.0',
  })
  socket.write(welcomeMsg + '\n')

  // Таймер для отправки данных
  let dataTimer = null

  // Функция генерации случайных данных сканирования
  function generateScanData(type) {
    const timestamp = Date.now()

    switch (type) {
      case 'GSM':
        return {
          type: 'GSM_BCCH_SCAN',
          timestamp,
          data: {
            MCC: Math.floor(Math.random() * 999),
            MNC: Math.floor(Math.random() * 99),
            cellIdentity: 'BF AE D6 50',
            locationAreaCode: Math.floor(Math.random() * 65535),
            arfcn: Math.floor(Math.random() * 1023),
            bsic: Math.floor(Math.random() * 63),
            rxLev: -Math.floor(Math.random() * 100) - 50,
            c1: Math.floor(Math.random() * 100),
            c2: Math.floor(Math.random() * 100),
          },
        }

      case 'LTE':
        return {
          type: 'LTE_EUTRA_SCAN',
          timestamp,
          data: {
            MCC: Math.floor(Math.random() * 999),
            MNC: Math.floor(Math.random() * 99),
            cellIdentity: '1A2B3C4D',
            trackingAreaCode:
              '0x' +
              Math.floor(Math.random() * 65535)
                .toString(16)
                .toUpperCase(),
            pci: Math.floor(Math.random() * 503),
            earfcn: Math.floor(Math.random() * 65535),
            rsrp: -Math.floor(Math.random() * 120) - 80,
            rsrq: -Math.floor(Math.random() * 20) - 3,
            sinr: Math.floor(Math.random() * 30),
          },
        }

      case 'WIFI':
        const bssid = Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0'),
        ).join(':')

        return {
          type: 'WIFI_SCAN',
          timestamp,
          data: {
            bssid,
            ssid: `WiFi-Network-${Math.floor(Math.random() * 100)}`,
            rssi: -Math.floor(Math.random() * 80) - 20,
            channel: Math.floor(Math.random() * 13) + 1,
            frequency: 2400 + Math.floor(Math.random() * 100),
            security: ['WPA2', 'WPA'][Math.floor(Math.random() * 2)],
            encryption: 'CCMP',
          },
        }

      case 'BLUETOOTH':
        const address = Array.from({ length: 6 }, () =>
          Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0'),
        ).join(':')

        return {
          type: 'BLUETOOTH_SCAN',
          timestamp,
          data: {
            address,
            name: `BT-Device-${Math.floor(Math.random() * 100)}`,
            rssi: -Math.floor(Math.random() * 100) - 50,
            deviceClass: Math.floor(Math.random() * 256),
            connectable: Math.random() > 0.5,
            txPower: -Math.floor(Math.random() * 20),
          },
        }

      default:
        return {
          type: 'UNKNOWN_SCAN',
          timestamp,
          data: { message: 'Unknown scan type' },
        }
    }
  }

  // Функция отправки данных
  function sendScanData() {
    if (activeScans.size === 0) return

    activeScans.forEach((type) => {
      const data = generateScanData(type)
      socket.write(JSON.stringify(data) + '\n')
    })
  }

  // Обработка входящих сообщений
  socket.on('data', (data) => {
    try {
      const message = data.toString().trim()
      const parsed = JSON.parse(message)

      console.log(`📨 TCP ${clientId} received:`, parsed)

      // Обработка команд
      switch (parsed.command) {
        case 'start':
          const types = parsed.types || []
          types.forEach((type) => activeScans.add(type))

          console.log(`▶️  Started scanning: ${types.join(', ')}`)

          // Запускаем отправку данных
          if (!dataTimer && activeScans.size > 0) {
            dataTimer = setInterval(sendScanData, 1000) // Отправляем каждую секунду
          }

          socket.write(
            JSON.stringify({
              status: 'success',
              command: 'start',
              activeTypes: Array.from(activeScans),
              timestamp: Date.now(),
            }) + '\n',
          )
          break

        case 'stop':
          if (parsed.types) {
            parsed.types.forEach((type) => activeScans.delete(type))
          } else {
            activeScans.clear()
          }

          console.log(`⏹️  Stopped scanning: ${parsed.types ? parsed.types.join(', ') : 'ALL'}`)

          // Останавливаем таймер если нет активных сканирований
          if (activeScans.size === 0 && dataTimer) {
            clearInterval(dataTimer)
            dataTimer = null
          }

          socket.write(
            JSON.stringify({
              status: 'success',
              command: 'stop',
              activeTypes: Array.from(activeScans),
              timestamp: Date.now(),
            }) + '\n',
          )
          break

        case 'status':
          socket.write(
            JSON.stringify({
              status: 'success',
              activeScans: Array.from(activeScans),
              connected: true,
              timestamp: Date.now(),
            }) + '\n',
          )
          break

        default:
          socket.write(
            JSON.stringify({
              status: 'error',
              error: 'Unknown command',
              timestamp: Date.now(),
            }) + '\n',
          )
      }
    } catch (error) {
      console.error(`❌ TCP ${clientId} parse error:`, error.message)
      socket.write(
        JSON.stringify({
          status: 'error',
          error: 'Invalid JSON',
          timestamp: Date.now(),
        }) + '\n',
      )
    }
  })

  // Обработка отключения
  socket.on('end', () => {
    console.log(`📡 TCP Client ${clientId} disconnected`)
    if (dataTimer) {
      clearInterval(dataTimer)
      dataTimer = null
    }
    activeScans.clear()
  })

  socket.on('error', (error) => {
    console.error(`❌ TCP ${clientId} error:`, error.message)
  })
})

// ========== WebSocket сервер для удобства тестирования ==========
const wss = new WebSocketServer({ port: WS_PORT })

wss.on('connection', (ws) => {
  console.log('🔌 WebSocket client connected')

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message)
      console.log('📨 WebSocket received:', parsed)

      // Прокси команды на TCP сервер
      const tcpClient = new net.Socket()

      tcpClient.connect(TCP_PORT, 'localhost', () => {
        tcpClient.write(JSON.stringify(parsed) + '\n')

        tcpClient.on('data', (data) => {
          ws.send(data.toString().trim())
        })

        tcpClient.on('end', () => {
          tcpClient.destroy()
        })
      })
    } catch (error) {
      console.error('WebSocket error:', error)
      ws.send(JSON.stringify({ error: 'Invalid message' }))
    }
  })

  ws.on('close', () => {
    console.log('🔌 WebSocket client disconnected')
  })
})

// ========== Запуск серверов ==========
tcpServer.listen(TCP_PORT, () => {
  console.log(`🚀 TCP Server listening on port ${TCP_PORT}`)
  console.log('Available commands:')
  console.log('  {"command": "start", "types": ["GSM", "LTE", "WIFI"]}')
  console.log('  {"command": "stop", "types": ["GSM"]}')
  console.log('  {"command": "stop"} // stop all')
  console.log('  {"command": "status"}')
})

console.log(`🌐 WebSocket Server listening on ws://localhost:${WS_PORT}`)

// ========== Утилита для ручного тестирования через telnet ==========
console.log('\n💡 Для ручного тестирования:')
console.log(`  telnet localhost ${TCP_PORT}`)
console.log(`  или`)
console.log(`  websocat ws://localhost:${WS_PORT}`)
