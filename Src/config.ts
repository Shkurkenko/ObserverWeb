export const serviceConfig = {
  device: {
    host: import.meta.env.REO_SCAN_DEVICE_HOST || 'localhost',
    port: import.meta.env.REO_SCAN_DEVICE_PORT || 8888,
    protocol: import.meta.env.REO_SCAN_DEVICE_PROTOCOL || ('ws' as const), // ws или wss
  },

  app: {
    maxScanData: parseInt(import.meta.env.VITE_MAX_SCAN_DATA || '1000', 10),
    autoReconnect: true,
    saveToLocalStorage: true,
  },

  get wsUrl(): string {
    return `${this.device.protocol}://${this.device.host}:${this.device.port}`
  },
}
