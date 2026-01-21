// src/config.ts
// Самый простой вариант - прямо в коде

export const serviceConfig = {
  // Настройки устройства по умолчанию
  device: {
    host: import.meta.env.REO_SCAN_DEVICE_HOST || 'localhost',
    port: import.meta.env.REO_SCAN_DEVICE_PORT || 8080,
    protocol: import.meta.env.REO_SCAN_DEVICE_PROTOCOL || ('ws' as const), // ws или wss
  },

  // Настройки приложения
  app: {
    maxScanData: parseInt(import.meta.env.VITE_MAX_SCAN_DATA || '1000', 10),
    autoReconnect: true,
    saveToLocalStorage: true,
  },

  // Полный URL для WebSocket
  get wsUrl(): string {
    return `${this.device.protocol}://${this.device.host}:${this.device.port}`
  },
}
