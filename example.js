import { pipe, map, forEach, interval } from 'callbag-basics'
import subscribe from 'callbag-subscribe'

const clock = document.createElement('x-callbag')
clock.source(
  pipe(
    interval(1000),
    map(() => {
      const container = document.createElement('div')

      const title = document.createElement('strong')
      title.innerText = 'The time is:'

      const time = document.createElement('span')
      time.innerText = new Date().toString()

      const fragment = document.createDocumentFragment()
      fragment.appendChild(title)
      fragment.appendChild(document.createElement('br'))
      fragment.appendChild(time)
      container.appendChild(fragment)

      return container
    })
  )
)

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(clock)

  // Once the clock gets removed from the DOM, it unsubscribes
  setTimeout(() => document.body.removeChild(clock), 5000)

  // If the clock gets attached again, it will subscribe to the stream again
  setTimeout(() => document.body.appendChild(clock), 8000)
})
