export default class Timer {
  constructor(cb: () => void, delay: number) {
    this.callback = cb
    this.remaining = delay

    this.resume()
  }

  private timerId!: ReturnType<typeof setTimeout>
  private start!: number
  private remaining: number
  private callback: () => void

  public pause() {
    clearTimeout(this.timerId)
    this.remaining -= Date.now() - this.start
  }

  resume() {
    this.start = Date.now()
    clearTimeout(this.timerId)
    this.timerId = setTimeout(this.callback, this.remaining)
  }

  clear() {
    clearTimeout(this.timerId)
  }
}
