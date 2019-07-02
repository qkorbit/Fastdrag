export const copyProp = (o, t) => Object.keys(o).forEach((e) => (t[e] = o[e]))
export const observe = (obj, prop, fn = EMPTY) => {
  let oldValue
  Object.defineProperty(obj, prop, {
    set(newValue) {
      oldValue = newValue
      fn(newValue)
    },
    get() {
      return oldValue
    },
  })
}

const img = document.createElement("img")
img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

export const PADDING = img
export const EMPTY = (n: any) => n
