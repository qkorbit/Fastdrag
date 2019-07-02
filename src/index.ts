import EventEmit from "./event"
import { AE, ISetting } from "./type"
import { copyProp, PADDING } from "./util"

const Mouse = {
  x: 0,
  y: 0,
}

let isDrag = false
let aid = null // requestAnimationFrame id

window.addEventListener("mousemove", (e) => {
  // save mouse(x, y)
  Mouse.x = e.clientX
  Mouse.y = e.clientY
})

document.addEventListener("dragover", (e) => e.preventDefault())
document.addEventListener("drop", (e) => e.preventDefault())

const defaultOption = {
  el: document.body,
  friction: 3,
  rotateRange: 60,
  scale: 1, // The scale factor of Container
}

class Fastdrag extends EventEmit {
  /**
   * The convenient way to create the instance.
   *
   * @param els List of HTMLElement.
   * @param options The setting.
   * @returns List of Instances
   *
   * ```javascript
   * let instanceList = Fastdrag.to(document.getElementsByClassName('dragdrag'))
   * ```
   */
  public static to(els: AE, options = {}) {
    return (els.constructor == Array ? [els] : [els]).map(
      (el: HTMLElement) => new Fastdrag({ el, ...options }),
    )
  }
  // record mouse increment
  private mx = 0
  private my = 0
  // increment
  private mdx = 0
  private mdy = 0
  // record Translate(x, y, d) increment
  private rx = 0
  private ry = 0
  private rd = 0

  private op = { ...defaultOption }
  /**
   * Create the instance
   *
   * @param options The setting.
   *
   * ```javascript
   * let instance = new Fastdrag({
   *     el: document.getElementById('demo')
   * })
   * ```
   */
  constructor(params: ISetting) {
    super()

    this.op = {
      ...this.op,
      ...params,
    }

    this.init()
  }
  /**
   * Modify the setting
   *
   * @param options Everything can be changed except 'el'.
   *
   * ```javascript
   * instance.config({
   *     friction: 5
   * })
   *
   * ```
   */
  public config(options = {}) {
    copyProp(options, this.op)
  }
  /**
   * Destroy the instance
   *
   * ```javascript
   * instance.destroy()
   * ```
   */
  public destroy() {
    const { el } = this.op

    el.removeEventListener("dragstart", this.startFN)
    el.removeEventListener("drag", this.moveFN)
    el.removeEventListener("dragend", this.endFN)
    el.removeAttribute("draggable")
  }
  private init() {
    const { el } = this.op

    if (!el.getAttribute("draggable")) {
      el.setAttribute("draggable", "true")
    }

    el.addEventListener("dragstart", this.startFN.bind(this))
    el.addEventListener("drag", this.moveFN.bind(this))
    el.addEventListener("dragend", this.endFN.bind(this))
  }
  private startFN(e) {
    isDrag = true

    this.update(e)
    this.save()
    this.emit("start")
    this.tick()

    e.dataTransfer.setDragImage(PADDING, 0, 0)
  }
  private moveFN(e) {
    this.update(e)

    e.target.style.pointerEvents = "none"
  }
  private endFN(e) {
    isDrag = false

    this.update(e)

    e.target.style.pointerEvents = "auto"
  }
  private update(e) {
    Mouse.x = e.clientX
    Mouse.y = e.clientY
    this.payload = e
  }
  private save() {
    this.mx = Mouse.x / this.op.scale - this.mdx
    this.my = Mouse.y / this.op.scale - this.mdy
  }
  private record(x, y, d) {
    this.rx = x
    this.ry = y
    this.rd = d
  }
  private moveTo(x, y, d) {
    this.op.el.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${d}deg)`
    this.record(x, y, d)
  }
  private tick() {
    this.emit("move")

    this.mdx = Mouse.x / this.op.scale - this.mx
    this.mdy = Mouse.y / this.op.scale - this.my

    const { rx, ry, rd, mdx, mdy } = this
    const { friction: F, rotateRange: R } = this.op
    const { offsetWidth: W, offsetHeight: H } = this.op.el
    // increment
    const cx = mdx - rx
    const cy = mdy - ry

    const px = rx + cx / F
    const py = ry + cy / F

    if (!isDrag && Math.pow(cx, 2) + Math.pow(cy, 2) < 0.05) {
      window.cancelAnimationFrame(aid)

      aid = null

      this.moveTo(px, py, 0)
      this.save()
      this.emit("end")

      return
    }
    // dd <- (cx, cy)
    let dd =
      (Math.tan(
        cx /
          (Math.abs(-cy) +
            Math.sqrt(Math.pow(H, 2) + Math.pow(W, 2)) * 2 +
            100 +
            Math.abs(cx)),
      ) /
        Math.PI) *
      180
    // rotate range
    if (dd > R) {
      dd = R
    } else if (dd < -R) {
      dd = -R
    }

    const pd = rd + (dd - rd) / F

    this.moveTo(px, py, pd)

    aid = window.requestAnimationFrame(this.tick.bind(this))
  }
}

export default Fastdrag
