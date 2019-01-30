import * as keypress from 'keypress'

import { EventType } from '../common'
import { Events } from './event'

if (keypress.default) {
  keypress.default(process.stdin)
} else {
  keypress(process.stdin)
}

export function bindToInput(eventBus: Events.EventBus) {
  process.stdin.on('keypress', (ch, key) => {
    eventBus.publish({ type: EventType.KEY_PRESSED, key })
  })

  process.stdin.on('mousepress', info => {
    eventBus.publish({ type: EventType.MOUSE_BUTTON_PRESSED, button: info })
  })
}
