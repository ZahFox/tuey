import { Events } from './events'
import { Features } from './features'
import { Log } from './log'
import { UI } from './ui'

import {
  EventType,
  NavigationPageChangedEvent,
  ScreenInitializedEvent,
  KeyPressedEvent,
  MouseButtonPressedEvent,
  ModuleInitializedEvent
} from './common'

async function init() {
  const eventBus: Events.EventBus = new Events.EventBus()
  const log: Log.Logger = await Log.init({})
  await registerEventHandlers(eventBus, log)
  await UI.init({ eventBus })
  await Features.init({ eventBus })
}

async function registerEventHandlers(eventBus: Events.EventBus, { info, warn }: Log.Logger) {
  const moduleInitializedEventHandler = Events.EventsHandler<ModuleInitializedEvent>(
    EventType.MODULE_INITIALIZED,
    (event: ModuleInitializedEvent) => {
      const { name } = event
      info(`The ${name} module was initialized`)
    }
  )

  const keyPressedEventHandler = Events.EventsHandler<KeyPressedEvent>(
    EventType.KEY_PRESSED,
    (event: KeyPressedEvent) => {
      const { key } = event

      if (key) {
        info(`${key.name} {CTRL-${key.ctrl}} {META-${key.meta}} {SHIFT-${key.shift}} {${key.sequence}}`)
      } else {
        warn('A key press was detected with no key data')
      }
    }
  )

  const mouseButtonPressedEventHandler = Events.EventsHandler<MouseButtonPressedEvent>(
    EventType.MOUSE_BUTTON_PRESSED,
    ({ button }: MouseButtonPressedEvent) => {
      info(`Mouse button pressed ${button}`)
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
    moduleInitializedEventHandler,
    mouseButtonPressedEventHandler,
    pageChangedEventHandler,
    screenInitializedEventHandler
  ])
}

init()
