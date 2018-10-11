import subscribe from 'callbag-subscribe'
import morphdom from 'morphdom'

class Callbag extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.unsubscribe = subscribe(node => {
      if (this.shadow.children.length === 0)
        this.shadow.appendChild(node)
      else
        morphdom(this.shadow.children[0], node)
    })(this.source)
  }

  disconnectedCallback() {
    if (this.unsubscribe)
      this.unsubscribe()

    window.requestAnimationFrame(() => {
      while (this.shadow.firstChild)
        this.shadow.removeChild(this.shadow.firstChild)
    })
  }

  source(cb) {
    this.source = cb
  }
}

if (!customElements.get('x-callbag'))
  customElements.define('x-callbag', Callbag)

export default Callbag
