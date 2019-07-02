import { EMPTY, observe } from "./util"

export default class EventEmit {
  public payload: any
  private state: string
  private node = {}
  constructor() {
    observe(this, "state", (state) => this.callback(state, this.payload))
  }
  public on(event: string, fn = EMPTY) {
    this.node[event] ? this.node[event].push(fn) : (this.node[event] = [fn])
  }
  public off(event: string, fn = null) {
    if (!this.node[event]) { return }

    fn ? this.node[event] = this.node[event].filter((f: any) => f != fn) : this.node[event] = null
  }
  public emit(event: string) {
    this.state = event
  }
  private callback(event: string, payload = {}) {
    if (!this.node[event]) { return }

    this.node[event].forEach((fn: any) => fn(payload))
  }
}
