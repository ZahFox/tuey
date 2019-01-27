import { Events } from './events'
import { Log } from './log'
import { UI } from './ui'

import { EventType, KeyPressedEvent } from './common'

const { info }: Log.Logger = Log.init()

const eventBus: Events.EventBus = new Events.EventBus()

const eventHandler = Events.EventsHandler<KeyPressedEvent>(EventType.KEY_PRESSED, (event: KeyPressedEvent) => {
  info(`Key Pressed: ${event.key}`)
})

eventBus.register([eventHandler])
eventBus.publish({ type: EventType.KEY_PRESSED, key: 'C' })

UI.init({ log: info })
