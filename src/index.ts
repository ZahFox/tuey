import { Events } from './events'
import { Log } from './log'
import { UI } from './ui'

import {
  EventType,
  NavigationPageChangedEvent,
  ScreenInitializedEvent,
  KeyPressedEvent,
  MouseButtonPressedEvent
} from './common'

async function init() {
  const { info }: Log.Logger = await Log.init()

  const eventBus: Events.EventBus = new Events.EventBus()

  const keyPressedEventHandler = Events.EventsHandler<KeyPressedEvent>(
    EventType.KEY_PRESSED,
    ({ key }: KeyPressedEvent) => {
      info(`${key.name} ${key.ctrl} ${key.meta} ${key.shift} ${key.sequence}`)
    }
  )

  const mouseButtonPressedEventHandler = Events.EventsHandler<MouseButtonPressedEvent>(
    EventType.MOUSE_BUTTON_PRESSED,
    ({ button }: MouseButtonPressedEvent) => {
      info('DERRP')
      info(`${button}`)
    }
  )

  const pageChangedEventHandler = Events.EventsHandler<NavigationPageChangedEvent>(
    EventType.NAVIGATION_PAGE_CHANGED,
    (event: NavigationPageChangedEvent) => {
      info(`UI changed from page: ${event.lastPage} to page: ${event.currentPage}`)
    }
  )

  const screenInitializedEventHandler = Events.EventsHandler<ScreenInitializedEvent>(
    EventType.SCREEN_INITIALIZED,
    (event: ScreenInitializedEvent) => {
      info(`UI screen initialized`)
    }
  )

  eventBus.register([
    keyPressedEventHandler,
    mouseButtonPressedEventHandler,
    pageChangedEventHandler,
    screenInitializedEventHandler
  ])

  await UI.init({ eventBus })
}

init()
