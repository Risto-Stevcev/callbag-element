import subscribe from 'callbag-subscribe'
import morphdom from 'morphdom'

class Callbag extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.unsubscribe = subscribe(node => {
      if (this.children.length === 0)
        this.appendChild(node)
      else
        morphdom(this.children[0], node)
    })(this.source)
  }

  disconnectedCallback() {
    if (this.unsubscribe)
      this.unsubscribe()

    window.requestAnimationFrame(() => {
      while (this.firstChild)
        this.removeChild(this.firstChild)
    })
  }

  source(cb) {
    this.source = cb
  }
}

if (!customElements.get('x-callbag'))
  customElements.define('x-callbag', Callbag)

export default Callbag
